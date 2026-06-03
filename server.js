const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();
connectDB();

const app = express();

// Middleware
// app.use(cors());
// app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000' }));
const cors = require('cors');

// Allowed origins
const allowedOrigins = [
  'http://localhost:3000',                  // local development
  'https://removewaste.netlify.app'        // tumhara live frontend (https compulsory)
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS not allowed'));
    }
  },
  credentials: true   // optional
}));



app.use(express.json());

// Routes
app.use('/api/classify', require('./routes/classifyRoutes'));
app.use('/api/chat', require('./routes/chatRoutes'));
app.use('/api/history', require('./routes/historyRoutes'));
app.use('/api/dashboard', require('./routes/dashboardRoutes'));

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
