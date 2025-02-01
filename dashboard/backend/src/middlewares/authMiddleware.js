

// const jwt = require('jsonwebtoken');
// const mongoose = require('mongoose');

// const authMiddleware = (req, res, next) => {
//     const token = req.headers.authorization?.split(" ")[1];
//     if (!token) {
//         return res.status(401).json({ message: "Unauthorized: No token provided" });
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         console.log("Decoded Payload:", decoded);

//         // Validate the decoded token payload
//         if (!decoded._id || !mongoose.Types.ObjectId.isValid(decoded._id)) {
//             return res.status(400).json({ message: "Invalid token: Malformed user ID" });
//         }

//         req.userId ={id:decoded._id};  // Attach user ID to the request object
//         next();
//     } catch (err) {
//         console.error("Error in authMiddleware:", err.message);
//         res.status(403).json({ message: "Invalid or expired token" });
//     }
// };

// module.exports = authMiddleware;

const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded Payload:", decoded);

        // Validate the decoded token payload
        if (!decoded._id || !mongoose.Types.ObjectId.isValid(decoded._id)) {
            return res.status(400).json({ message: "Invalid token: Malformed user ID" });
        }

        req.user = { id: decoded._id }; // Attach user ID to the request object
        next();
    } catch (err) {
        console.error("Error in authMiddleware:", err.message);
        res.status(403).json({ message: "Invalid or expired token" });
    }
};

module.exports = authMiddleware;
