const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    transactionType: {
        type: String,
        required: true,
    },
    fileSize: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true // Adds createdAt and updatedAt timestamps
});

const LogModel = mongoose.model('Log', logSchema);

module.exports = LogModel;
