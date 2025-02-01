require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const conversionRoutes = require('./routes/conversionRoutes');
const statisticsRoutes = require('./routes/statistics');
const app = express();
connectDB();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/users', userRoutes);
app.use('/api/conversions', conversionRoutes);
app.use('/api/statistics', statisticsRoutes);

module.exports = app;
