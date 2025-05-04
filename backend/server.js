const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const taskRoutes = require('./routes/tasks');
const weekRoutes = require('./routes/weeks');
const noteRoutes = require('./routes/notes');
const seedRoutes = require('./routes/seed');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigin = process.env.FRONTEND_URL ? process.env.FRONTEND_URL.replace(/\/$/, '') : '*';
    if (!origin || origin.replace(/\/$/, '') === allowedOrigin || allowedOrigin === '*') {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};
app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use('/api/tasks', taskRoutes);
app.use('/api/weeks', weekRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/seed', seedRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})
.catch((err) => {
  console.error('MongoDB connection error:', err);
});
