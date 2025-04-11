"use client";

import { useEffect, useState } from "react";

export default function SeatsPage() {
  const [seats, setSeats] = useState([]);
  const [selected, setSelected] = useState([]);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const BASE_URL = "https://zapphire-backend.onrender.com";

  useEffect(() => {
    fetch(`${BASE_URL}/api/seats`)
      .then((res) => res.json())
      .then((data) => setSeats(data))
      .catch((err) => console.error("Error fetching seats:", err));
  }, []);

  const toggleSeat = (seatId, isBooked) => {
    if (isBooked) return;

    if (selected.includes(seatId)) {
      setSelected((prev) => prev.filter((id) => id !== seatId));
    } else {
      if (selected.length >= 7) {
        setMessage("⚠️ You can only select up to 7 seats.");
        return;
      }
      setSelected((prev) => [...prev, seatId]);
    }
  };

  const handleBooking = async () => {
    if (selected.length === 0) {
      setMessage("Please select at least one seat 😅");
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/api/book`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ seatsRequested: selected.length }),
      });

      const data = await res.json();
      if (res.ok) {
        setSuccess(true);
        setMessage("🎉 Seats booked successfully!");
        setSelected([]);
        const refreshed = await fetch(`${BASE_URL}/api/seats`);
        setSeats(await refreshed.json());
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setMessage(data.message || "Booking failed");
      }
    } catch (err) {
      console.error("Booking error:", err);
      setMessage("Something went wrong");
    }
  };

  const handleCancel = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/cancel`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("❌ All your seats were cancelled.");
        const refreshed = await fetch(`${BASE_URL}/api/seats`);
        setSeats(await refreshed.json());
        setSelected([]); // ✅ ADD THIS LINE
        setSuccess(true); // ✅ bounce animation
        setTimeout(() => setSuccess(false), 3000); // ✅ reset after animation
      } else {
        setMessage(data.message || "Cancellation failed");
      }
    } catch (err) {
      console.error("Cancel error:", err);
      setMessage("Something went wrong while cancelling");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto text-center">
      <h2 className="text-3xl font-bold text-indigo-700 mb-4 animate-pulse">
        🚆 Welcome to Zapphire Seat Booking
      </h2>

      <div className="grid grid-cols-7 gap-3 justify-center mb-8">
        {seats.map((seat) => {
          const isSelected = selected.includes(seat.id);
          return (
            <div
              key={seat.id}
              onClick={() => toggleSeat(seat.id, seat.is_booked)}
              className={`cursor-pointer px-4 py-2 rounded-lg font-medium shadow-md transition-all
              ${
                seat.is_booked
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : isSelected
                  ? "bg-blue-600 text-white animate-pulse"
                  : "bg-green-500 hover:bg-green-600 text-white"
              }`}
            >
              {seat.row_number}-{seat.seat_number}
            </div>
          );
        })}
      </div>

      <div className="flex justify-center gap-6 mb-6">
        <button
          onClick={handleBooking}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-semibold shadow-lg transition-transform hover:scale-105"
        >
          ✅ Reserve Seats
        </button>

        <button
          onClick={handleCancel}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold shadow-lg transition-transform hover:scale-105"
        >
          🔄 Cancel My Booking
        </button>
      </div>

      {message && (
        <div
          className={`mt-4 text-lg font-medium ${
            success ? "text-green-600 animate-bounce" : "text-rose-600"
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
}
