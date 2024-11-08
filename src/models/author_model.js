const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    bio: { type: String },
    createdAt: { type: Date, default: Date.now },
});

const Author = mongoose.model('Author', authorSchema);

module.exports = Author;
