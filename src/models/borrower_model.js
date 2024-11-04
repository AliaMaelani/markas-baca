const mongoose = require("mongoose");

const borrowerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    contact: { type: String },
    createdAt: { type: Date, default: Date.now },
    borrowedBooks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }] 
});

const Borrower = mongoose.model('Borrower', borrowerSchema);

module.exports = Borrower;
