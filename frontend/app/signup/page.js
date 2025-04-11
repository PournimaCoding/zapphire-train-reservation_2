"use client";


import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5001/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (res.ok) {
        router.push("/login");
      } else {
        const data = await res.json();
        setError(data.message || "Signup failed");
      }
    } catch (err) {
      setError("Something went wrong");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Create Your Account 🚀</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="👤 Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ ...styles.input, color: "black" }}
          required
        />
        <input
          type="email"
          placeholder="📧 Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ ...styles.input, color: "black" }}
          required
        />
        <input
          type="password"
          placeholder="🔒 Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ ...styles.input, color: "black" }}
          required
        />
        <button type="submit" style={styles.button}>
          ✨ Signup
        </button>
        {error && <p style={styles.error}>{error}</p>}
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "420px",
    margin: "60px auto",
    backgroundColor: "#fefefe",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 4px 18px rgba(0, 0, 0, 0.1)",
    border: "1px solid #e0e0e0",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "26px",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "12px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    outline: "none",
    backgroundColor: "#fff",
  },
  button: {
    padding: "12px",
    backgroundColor: "#10b981",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "0.3s",
  },
  error: {
    color: "red",
    marginTop: "10px",
    textAlign: "center",
  },
};
