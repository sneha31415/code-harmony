const express = require('express');
const { processAudio } = require('../controllers/audioController'); // Import the controller
const { downloadAudio, shareAudio, deleteAudio } = require('../controllers/audioController'); // Import the controller
const upload = require('../middlewares/uploadMiddleware'); // Import the configured multer middleware

const authMiddleware = require('../middlewares/authMiddleware'); // For authentication (if required)

const router = express.Router();

// Route for processing audio
router.post('/process', authMiddleware, upload.single('audio'), (req, res, next) => {
    console.log('Route hit: /process');
    console.log('File received:', req.file);
    console.log('Body received:', req.body);
    next(); // Proceed to the controller
}, processAudio);

// Route for downloading processed audio
router.get('/download/:id', authMiddleware, downloadAudio);

// Route for sharing processed audio (generates sharable link)
router.get('/share/:id', authMiddleware, shareAudio);

// Route for deleting processed audio
router.delete('/delete/:id', authMiddleware, deleteAudio);

router.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        return res.status(400).json({ message: err.message });
    } else if (err) {
        return res.status(500).json({ message: err.message });
    }
    next();
});
module.exports = router;
