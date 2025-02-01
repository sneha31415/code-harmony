const Conversion = require('../models/Conversion');

exports.getConversions = async (req, res) => {
    try {
        const conversions = await Conversion.find({ userId: req.userId });
        res.status(200).json(conversions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.addConversion = async (req, res) => {
    try {
        const { instrumentUsed } = req.body;

        if (!instrumentUsed) {
            return res.status(400).json({ message: "Instrument used is required." });
        }

        const newConversion = new Conversion({
            userId: req.userId,
            instrumentUsed,
        });

        await newConversion.save();
        res.status(201).json(newConversion);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
