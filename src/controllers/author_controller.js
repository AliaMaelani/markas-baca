const Author = require("../models/author_model");
const multer = require('multer');
const path = require('path');

exports.getAllAuthors = async (req, res) => {
    const authors = await Author.find();
    res.status(200).json(authors);
};

exports.getAuthorById = async (req, res) => {
    try {
        const author = await Author.findById(req.params.id);
        if (!author) {
            return res.status(404).json({ message: "Author not found" });
        }
        res.status(200).json(author);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createAuthor = async (req, res) => {
    const { name, bio } = req.body;
    const author = new Author({ name, bio });
    await author.save();
    res.status(201).json(author);
};

exports.updateAuthor = async (req, res) => {
    try {
        const author = await Author.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!author) return res.status(404).json({ message: "Author not found" });
        res.status(200).json(author);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteAuthor = async (req, res) => {
    try {
        const author = await Author.findByIdAndDelete(req.params.id);
        if (!author) return res.status(404).json({ message: "Author not found" });
        
        // Mengubah status dari 204 ke 200 untuk mengirim pesan
        res.status(200).json({ message: "Author berhasil dihapus" }); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/upload_foto_author'); 
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); 
    },
});

const upload = multer({ storage });

exports.uploadAuthorPhoto = [
    upload.single('photo'),
    (req, res) => {
        if (!req.file) {
            return res.status(400).json({ message: "Please upload a photo" });
        }
        res.status(200).json({
            message: "Photo uploaded successfully",
            filePath: `/src/upload_foto_author/${req.file.filename}`, 
        });
    }
];
