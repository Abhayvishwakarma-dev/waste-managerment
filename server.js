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
app.use(cors({
  origin: "https://removewaste.netlify.app"
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
