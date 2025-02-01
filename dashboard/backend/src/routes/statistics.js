


// const express = require('express');
// const router = express.Router();
// const Conversion = require('../models/Conversion');
// const authMiddleware = require('../middlewares/authMiddleware'); // JWT auth middleware

// // GET /api/statistics/user
// router.get('/user', authMiddleware, async (req, res) => {
//     try {
//         const userId = req.user.id; // Extract user ID from the middleware

//         // Aggregate data for the user
//         const stats = await Conversion.aggregate([
//             { $match: { userId: ObjectId(userId) } }, // Filter by user ID
//             {
//                 $group: {
//                     _id: "$instrumentUsed",
//                     count: { $sum: 1 }, // Count occurrences of each instrument
//                 },
//             },
//         ]);

//         if (!stats.length) {
//             return res.status(404).json({ message: "No data found for this user." });
//         }

//         res.status(200).json({ userId, stats });
//     } catch (error) {
//         console.error("Error fetching user-wise statistics:", error);
//         res.status(500).json({ message: "Error fetching user-wise statistics", error: error.message });
//     }
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const Conversion = require('../models/Conversion');
const authMiddleware = require('../middlewares/authMiddleware'); // JWT auth middleware
const { ObjectId } = require('mongoose').Types; // Ensure ObjectId is imported

// GET /api/statistics/user
router.get('/user', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id; // Extract user ID from the middleware

        // Log the userId to ensure it's being passed correctly
        console.log("Authenticated User ID:", userId);

        // Aggregate data for the user
        const stats = await Conversion.aggregate([
            { $match: { userId: new ObjectId(userId) } }, // Filter by user ID
            {
                $group: {
                    _id: "$instrumentUsed",
                    count: { $sum: 1 }, // Count occurrences of each instrument
                },
            },
        ]);

        // Log the stats to check the results
        console.log("Aggregated Stats:", stats);

        if (!stats.length) {
            return res.status(404).json({ message: "No data found for this user." });
        }

        res.status(200).json({ userId, stats });
    } catch (error) {
        console.error("Error fetching user-wise statistics:", error);
        res.status(500).json({ message: "Error fetching user-wise statistics", error: error.message });
    }
});

module.exports = router;
