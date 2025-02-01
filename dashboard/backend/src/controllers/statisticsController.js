const Conversion = require('../models/Conversion');

exports.getStatistics = async (req, res) => {
    try {
        const userId = req.userId; // Assuming userId is passed through middleware

        // Aggregate data to calculate total conversions and instruments used
        const stats = await Conversion.aggregate([
            { $match: { userId: mongoose.Types.ObjectId(userId) } },
            { $group: { _id: "$instrumentUsed", count: { $sum: 1 } } },
        ]);

        const totalConversions = stats.reduce((sum, item) => sum + item.count, 0);

        res.status(200).json({ stats, totalConversions });
    } catch (error) {
        console.error('Error fetching statistics:', error.message);
        res.status(500).json({ error: 'Failed to fetch statistics' });
    }
};
