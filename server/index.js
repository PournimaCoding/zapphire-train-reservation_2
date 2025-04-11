console.log("Starting server...");

const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());

// ⬇️ Add this line
const authRoutes = require('./routes/auth');
const bookingRoutes = require('./routes/booking');

app.use('/api', authRoutes); // base URL for auth routes
app.use('/api', bookingRoutes);

app.get('/', (req, res) => {
  res.send('Train Reservation Backend is running!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

