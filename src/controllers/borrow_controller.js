const Borrow = require("../models/borrow_model");
const Book = require("../models/book_model");

exports.borrowBook = async (req, res) => {
    console.log("POST /borrows/book accessed");
    try {
        const { bookId, borrowerId } = req.body;
        
        if (!bookId || !borrowerId) {
            return res.status(400).json({ message: 'Book ID and Borrower ID are required' });
        }

        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        if (book.stock <= 0) {
            return res.status(400).json({ message: 'Book is out of stock' });
        }

        // Kurangi stok buku
        book.stock -= 1;
        await book.save();

        // Buat data peminjaman baru
        const borrow = new Borrow({
            book: bookId,
            borrower: borrowerId,
            borrowDate: new Date(),
            status: 'active'
        });

        await borrow.save();

        res.status(201).json({ message: 'Buku berhasil dipinjam', data: borrow });
    } catch (error) {
        console.error("Error in borrowBook:", error);
        res.status(500).json({ message: 'Gagal meminjam buku', error });
    }
};

exports.getActiveBorrows = async (req, res) => {
    try {
        const borrows = await Borrow.find({ status: 'active' }).populate('book borrower');
        res.status(200).json(borrows);
    } catch (error) {
        console.error("Error in getActiveBorrows:", error);
        res.status(500).json({ message: 'Gagal mendapatkan daftar peminjaman', error });
    }
};

exports.returnBook = async (req, res) => {
    console.log("POST /borrow/book/return accessed");
    const { borrowId } = req.body;

    if (!borrowId) {
        return res.status(400).json({ message: "Borrow ID is required" });
    }

    try {
        const borrow = await Borrow.findById(borrowId).populate('book borrower');
        if (!borrow) {
            return res.status(404).json({ message: "Borrow not found" });
        }

        // Hitung penalti jika terlambat
        const today = new Date();
        const borrowDuration = Math.floor((today - borrow.borrowDate) / (1000 * 60 * 60 * 24));
        const maxDaysAllowed = 7; // Contoh: maksimal 7 hari peminjaman tanpa penalti
        const dailyPenaltyRate = 5000; // Contoh: biaya keterlambatan per hari

        if (borrowDuration > maxDaysAllowed) {
            const lateDays = borrowDuration - maxDaysAllowed;
            borrow.penalty = lateDays * dailyPenaltyRate;
        } else {
            borrow.penalty = 0;
        }

        // Update status peminjaman dan tanggal pengembalian
        borrow.status = 'returned';
        borrow.returnDate = today;
        await borrow.save();

        // Tambahkan stok buku kembali
        const book = await Book.findById(borrow.book._id);
        if (book) {
            book.stock += 1;
            await book.save();
        }

        res.status(200).json({
            message: "Buku berhasil dikembalikan",
            data: borrow
        });
    } catch (error) {
        console.error("Error in returnBook:", error);
        res.status(500).json({ message: "Gagal mengembalikan buku", error });
    }
};
