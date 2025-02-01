const express = require('express');
const { login, signup, editProfile, getProfile } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const User = require('../models/User');
const router = express.Router();
const mongoose = require('mongoose');
router.post('/login', login);
router.post('/signup', signup);

router.get('/profile', authMiddleware, async (req, res) => {
    try {
        console.log("Authenticated User ID:", req.userId);

        // Validate if req.userId is a valid MongoDB ObjectId
        if (!req.userId || !mongoose.Types.ObjectId.isValid(req.userId)) {
            return res.status(400).json({ message: "Invalid user ID format" });
        }

        // Find the user by ID and exclude the password field
        const user = await User.findById(req.userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Respond with user details
        res.status(200).json({ message: "User profile retrieved successfully", user });
    } catch (error) {
        console.error("Error in /profile route:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.put('/profile', authMiddleware, editProfile);

module.exports = router;

