const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    console.log('Incoming request to:', req.path); // Log the request path
    console.log('Authorization header:', req.headers.authorization); // Log the Authorization header

    const token = req.headers.authorization?.split(" ")[1];
    console.log('Extracted token:', token); // Log the extracted token

    if (!token) {
        console.error('No token provided in the Authorization header');
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded token:', decoded); // Log the decoded token

        req.userId = decoded._id; // Attach userId from the token to the request
        console.log('User ID attached to req:', req.userId); // Confirm userId is attached

        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error('Error verifying token:', error.message); // Log any errors during token verification
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
};

module.exports = authMiddleware;
