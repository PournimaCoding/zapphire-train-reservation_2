"use client";

import { useEffect, useState } from "react";

export default function MyBookingsPage() {
  const [mySeats, setMySeats] = useState([]);
  const [message, setMessage] = useState("");

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    const fetchMySeats = async () => {
      try {
        const res = await fetch("https://zapphire-backend.onrender.com/api/seats", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const allSeats = await res.json();
        const userSeats = allSeats.filter((seat) => seat.user_id !== null);

        if (res.ok) {
          setMySeats(userSeats);
        } else {
          setMessage("⚠️ Could not fetch your bookings.");
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setMessage("Something went wrong!");
      }
    };

    fetchMySeats();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto text-center">
      <h2 className="text-2xl font-bold mb-4 text-purple-700">🪑 Your Booked Seats</h2>

      {mySeats.length === 0 ? (
        <p className="text-gray-600">No seats booked yet.</p>
      ) : (
        <div className="grid grid-cols-4 gap-4 justify-center">
          {mySeats.map((seat) => (
            <div
              key={seat.id}
              className="bg-purple-200 text-purple-800 p-3 rounded shadow-md"
            >
              Row {seat.row_number} - Seat {seat.seat_number}
            </div>
          ))}
        </div>
      )}

      {message && <p className="text-red-600 mt-4">{message}</p>}
    </div>
  );
}
