const express = require('express');
const { getConversions, addConversion } = require('../controllers/conversionController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/conversions', authMiddleware, getConversions);
router.post('/addConversions', authMiddleware, addConversion);

module.exports = router;

