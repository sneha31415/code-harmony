const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getProfile = async (req, res) => {
    const user = await User.findById(req.user.userId);
    res.json(user);
};

exports.editProfile = async (req, res) => {
    try {
        console.log("User ID in editProfile:", req.userId); // Debug log

        // Validate if userId is attached to the request
        if (!req.userId) {
            return res.status(400).json({ message: "User ID is missing" });
        }

        // Update the user's profile
        const updatedUser = await User.findByIdAndUpdate(req.userId, req.body, {
            new: true,          // Return the updated document
            runValidators: true // Ensure validation rules are applied
        }).select('-password'); // Exclude password from the response

        // If no user is found
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        // Respond with updated user details
        res.status(200).json({
            message: "Profile updated successfully",
            user: updatedUser,
        });
    } catch (error) {
        console.error("Error in editProfile:", error.message); // Log the error
        res.status(500).json({ error: "Internal server error" });
    }
};

