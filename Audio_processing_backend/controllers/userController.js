const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
       

        const user = await User.findOne({ email });
if (user) {
    return res.status(409).json({
        message: "User already exists. Please log in.",
        success: false
    });
}

        const userModel = new User({ name, email, password });
        // userModel.password = await bcrypt.hash(password, 10);
        const hashedPassword = await bcrypt.hash(password, 10);
    if (!hashedPassword) {
        return res.status(500).json({
            message: "Error while hashing the password",
            success: false
        });
    }
userModel.password = hashedPassword;

        await userModel.save();
        res.status(201)
            .json({
                message: "Signup Successfully",
                success: true
            })

    }catch (err) {
        
        console.error("Signup Error:", err.message); // Log the error for debugging
    res.status(500).json({
        message: "Internal Server Error",
        success: false
    });
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id.toString()},
            process.env.JWT_SECRET,
            { expiresIn: '24h'}
        )
        res.status(200)
        .json({
            message: "Login Successfully",
            success: true,
            jwtToken,
            email,
            name: user.name
        });
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

