const express = require('express');
const router = express.Router();
const pool = require('../db'); // PostgreSQL connection
const authenticateUser = require('../authMiddleware'); // ⬅️ Import JWT middleware
// 🪑 Get all seats
router.get('/seats', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM seats ORDER BY row_number, seat_number');
    res.json(result.rows); // send all seats
  } catch (error) {
    console.error('Error fetching seats:', error.message);
    res.status(500).json({ message: 'Server error while fetching seats' });
  }
});

// 🎯 Book Seats
router.post('/book', authenticateUser, async (req, res) => {
  const { seatsRequested } = req.body;
  const userId = req.user.userId;

  if (!seatsRequested || seatsRequested < 1 || seatsRequested > 7) {
    return res.status(400).json({ message: 'You can book between 1 to 7 seats only.' });
  }

  try {
    // 1. Get all unbooked seats
    const result = await pool.query(
      'SELECT * FROM seats WHERE is_booked = false ORDER BY row_number, seat_number'
    );
    const seats = result.rows;

    if (seats.length < seatsRequested) {
      return res.status(400).json({ message: 'Not enough seats available' });
    }

    // 2. Group seats by row
    const rows = {};
    for (let seat of seats) {
      if (!rows[seat.row_number]) rows[seat.row_number] = [];
      rows[seat.row_number].push(seat);
    }

    // 3. Try to find one full row with enough seats
    let bookedSeats = [];
    for (let row in rows) {
      if (rows[row].length >= seatsRequested) {
        bookedSeats = rows[row].slice(0, seatsRequested);
        break;
      }
    }

    // 4. If no single row found, just pick nearby available seats
    if (bookedSeats.length === 0) {
      bookedSeats = seats.slice(0, seatsRequested);
    }

    // 5. Book those seats
    const seatIds = bookedSeats.map(seat => seat.id);
    await pool.query(
      'UPDATE seats SET is_booked = true, user_id = $1 WHERE id = ANY($2::int[])',
      [userId, seatIds]
    );

    res.status(200).json({
      message: 'Seats booked successfully!',
      seats: bookedSeats
    });

  } catch (error) {
    console.error('Booking error:', error.message);
    res.status(500).json({ message: 'Server error while booking seats' });
  }
});

// ❌ Cancel user booking
router.post('/cancel', authenticateUser, async (req, res) => {
  const userId = req.user.userId;

  try {
    // Find and unbook all seats for this user
    await pool.query(
      'UPDATE seats SET is_booked = false, user_id = NULL WHERE user_id = $1',
      [userId]
    );

    res.status(200).json({ message: 'All your booked seats have been cancelled.' });
  } catch (error) {
    console.error('Cancel error:', error.message);
    res.status(500).json({ message: 'Server error while cancelling seats' });
  }
});

module.exports = router;
