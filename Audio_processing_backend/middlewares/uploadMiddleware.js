const multer = require('multer');
const path = require('path');

// Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Directory where files are stored
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

// File filter to allow only MP3 or audio files
const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = ['audio/mpeg', 'audio/mp3'];
    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Only MP3 files are allowed'), false);
    }
};


// Initialize Multer
const upload = multer({
    storage,
    fileFilter,
});

module.exports = upload;
