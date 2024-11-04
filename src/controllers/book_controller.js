const multer = require('multer');
const path = require('path');
const Book = require("../models/book_model");

// Setup multer untuk upload file
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/sampulbuku_upload/'); // Ubah nama direktori penyimpanan
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Simpan dengan timestamp
    },
});

const upload = multer({ storage });
exports.uploadBookCover = upload.single('cover'); // Endpoint untuk meng-upload cover

// Tambahkan endpoint untuk meng-upload sampul buku
exports.uploadCover = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "Gagal mengunggah gambar sampul" });
    }
    res.status(200).json({ message: "Gambar sampul berhasil diunggah", file: req.file });
};

exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: "Gagal mengambil data buku", error });
    }
};

exports.getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ message: "Buku tidak ditemukan" });
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: "Gagal mengambil data buku", error });
    }
};

exports.createBook = async (req, res) => {
    try {
        const { title, author, category } = req.body;
        const book = new Book({ title, author, category });
        await book.save();
        res.status(201).json(book);
    } catch (error) {
        res.status(500).json({ message: "Gagal menambahkan buku baru", error });
    }
};

exports.updateBook = async (req, res) => {
    console.log("Request body:", req.body);
    console.log("Request params:", req.params);

    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!book) return res.status(404).json({ message: "Buku tidak ditemukan" });
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: "Gagal mengupdate buku", error });
    }
};


exports.deleteBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) return res.status(404).json({ message: "Buku tidak ditemukan" });
        res.status(204).json({ message: "Buku berhasil dihapus" }); 
    } catch (error) {
        res.status(500).json({ message: "Gagal menghapus buku", error });
    }
};

