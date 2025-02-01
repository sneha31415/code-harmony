// require('dotenv').config();
// const express = require('express');
// const connectDB = require('./config/db'); // Import the database connection
// const userRoutes = require('./routes/userRoutes');
// const audioRoutes = require('./routes/audioRoutes');

// const app = express();

// // Middleware
// app.use(express.json());
// app.use('/uploads', express.static('uploads')); // Serve uploaded files

// // Routes
// app.use('/api/users', userRoutes);
// app.use('/api/audio', audioRoutes);

// // Connect to MongoDB
// connectDB();

// // Start Server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db'); // Import the database connection
const userRoutes = require('./routes/userRoutes');
const audioRoutes = require('./routes/audioRoutes');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors()); // Enable CORS for frontend communication
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
app.use('/uploads', express.static('uploads')); // Serve uploaded files

// Routes
app.use('/api/users', userRoutes);
app.use('/api/audio', audioRoutes);

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
