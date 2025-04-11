"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const BASE_URL = "https://zapphire-backend.onrender.com"; // ✅ added

export default function DashboardPage() {
  const router = useRouter();
  const [userId, setUserId] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    fetch(`${BASE_URL}/api/protected`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Unauthorized");
        }
        return res.json();
      })
      .then((data) => {
        setUserId(data.userId);
        setMessage(data.message);
      })
      .catch((err) => {
        console.error(err);
        router.push("/login");
      });
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200 text-gray-800 p-6">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md text-center">
        <h2 className="text-3xl font-bold mb-4 text-blue-600">Welcome to Zapphire 🚆</h2>

        {userId ? (
          <>
            <p className="text-lg font-medium mb-2">{message}</p>
            <p className="text-gray-600 text-sm">You're logged in! <span className="font-semibold text-blue-500">User ID: {userId}</span></p>
            <button
              className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
              onClick={() => router.push("/seats")}
            >
              🎫 Go to Seat Booking
            </button>
          </>
        ) : (
          <p className="text-gray-500">Loading your dashboard...</p>
        )}
      </div>
    </div>
  );
}
