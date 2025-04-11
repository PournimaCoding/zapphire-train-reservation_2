"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "40px",
        background: "linear-gradient(135deg, #1e1e1e, #343434)",
        color: "#fff",
        borderRadius: "10px",
        margin: "40px",
      }}
    >
      <h1 style={{ fontSize: "2.5rem", marginBottom: "10px" }}>
        🚆 Welcome to Zapphire Reservation System
      </h1>
      <p style={{ fontSize: "1.1rem", marginBottom: "20px", maxWidth: "600px" }}>
        Book train seats easily and quickly. Log in or sign up to get started. You can reserve up to 7 seats in one go!
      </p>

      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <Link
          href="/login"
          style={{
            padding: "10px 20px",
            backgroundColor: "#0070f3",
            color: "white",
            textDecoration: "none",
            borderRadius: "6px",
            fontWeight: "bold",
          }}
        >
          Login
        </Link>
        <Link
          href="/signup"
          style={{
            padding: "10px 20px",
            backgroundColor: "#10b981",
            color: "white",
            textDecoration: "none",
            borderRadius: "6px",
            fontWeight: "bold",
          }}
        >
          Signup
        </Link>
      </div>
    </div>
  );
}
