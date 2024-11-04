const Borrower = require("../models/borrower_model");

exports.getAllBorrowers = async (req, res) => {
    try {
        const borrowers = await Borrower.find().populate('borrowedBooks'); // Mengisi borrowedBooks
        res.status(200).json(borrowers);
    } catch (error) {
        res.status(500).json({ message: "Gagal mengambil daftar peminjam", error });
    }
};

exports.getBorrowerById = async (req, res) => {
    try {
        const borrower = await Borrower.findById(req.params.id).populate('borrowedBooks'); // Mengisi borrowedBooks
        if (!borrower) return res.status(404).json({ message: "Borrower not found" });
        res.status(200).json(borrower);
    } catch (error) {
        res.status(500).json({ message: "Gagal mengambil peminjam", error });
    }
};

exports.createBorrower = async (req, res) => {
    console.log(req.body); 
    try {
        const { name, contact, borrowedBooks } = req.body; 
        const borrower = new Borrower({ name, contact, borrowedBooks });
        await borrower.save();
        res.status(201).json(borrower);
    } catch (error) {
        res.status(500).json({ message: "Gagal menambahkan borrower", error });
    }
};

exports.updateBorrower = async (req, res) => {
    try {
        const borrower = await Borrower.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('borrowedBooks');
        if (!borrower) return res.status(404).json({ message: "Borrower not found" });
        res.status(200).json(borrower);
    } catch (error) {
        res.status(500).json({ message: "Gagal mengupdate borrower", error });
    }
};

exports.deleteBorrower = async (req, res) => {
    try {
        const borrower = await Borrower.findByIdAndDelete(req.params.id);
        if (!borrower) return res.status(404).json({ message: "Borrower not found" });
        res.status(200).json({ message: "Borrower berhasil dihapus" }); // Mengembalikan pesan berhasil dihapus
    } catch (error) {
        res.status(500).json({ message: "Gagal menghapus borrower", error });
    }
};

// Contoh fungsi untuk menambahkan buku yang dipinjam
exports.addBorrowedBook = async (req, res) => {
    try {
        const borrower = await Borrower.findById(req.params.id);
        if (!borrower) return res.status(404).json({ message: "Borrower not found" });

        borrower.borrowedBooks.push(req.body.bookId); // Tambahkan bookId ke borrowedBooks
        await borrower.save();
        res.status(200).json(borrower);
    } catch (error) {
        res.status(500).json({ message: "Gagal menambahkan buku yang dipinjam", error });
    }
};

exports.removeBorrowedBook = async (req, res) => {
    try {
        const borrower = await Borrower.findById(req.params.id);
        if (!borrower) return res.status(404).json({ message: "Borrower not found" });

        borrower.borrowedBooks.pull(req.params.bookId); // Hapus bookId dari borrowedBooks
        await borrower.save();
        res.status(200).json(borrower);
    } catch (error) {
        res.status(500).json({ message: "Gagal menghapus buku yang dipinjam", error });
    }
};
