const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
    name: String,
    company: String,
    phone: String,
    email: String,
    website: String,
    image: String,
    qrCode: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Card', cardSchema);
