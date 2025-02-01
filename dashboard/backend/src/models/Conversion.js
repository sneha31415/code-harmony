
const mongoose = require('mongoose');

const ConversionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true, // Ensure every conversion is tied to a user
    },
    instrumentUsed: {
        type: String,
        required: true,
    },
    originalFilePath: {
        type: String,
        required: true,
    },
    processedFilePath: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now, // Automatically add a timestamp
    },
});

module.exports = mongoose.model('Conversion', ConversionSchema);
