const mongoose = require("mongoose");

const borrowSchema = new mongoose.Schema({
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    borrower: { type: mongoose.Schema.Types.ObjectId, ref: 'Borrower', required: true },
    borrowDate: { type: Date, default: Date.now },
    returnDate: { type: Date },
    status: { type: String, enum: ['active', 'returned'], default: 'active' },
    penalty: { type: Number, default: 0 }, 
});
borrowSchema.methods.calculatePenalty = function () {
    const today = new Date();
    const borrowDuration = Math.floor((today - this.borrowDate) / (1000 * 60 * 60 * 24));
    const maxDaysAllowed = 7; // Misal: batas waktu bebas penalti adalah 7 hari
    const dailyPenaltyRate = 5000; // Misal: biaya penalti per hari keterlambatan

    if (this.returnDate == null && borrowDuration > maxDaysAllowed) {
        const lateDays = borrowDuration - maxDaysAllowed;
        this.penalty = lateDays * dailyPenaltyRate;
    } else {
        this.penalty = 0;
    }
    return this.penalty;
};

const Borrow = mongoose.model('Borrow', borrowSchema);

module.exports = Borrow;