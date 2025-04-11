# 🚆 Zapphire Train Seat Reservation System

A full-stack web application to book train seats with smart seat allocation logic — built using **Next.js**, **Express.js**, and **PostgreSQL**.  
Only one coach with 80 seats (7 per row and the last row with 3 seats). Maximum 7 seats can be reserved at a time with row-priority booking.

---

## 🌐 Live Demo

**Frontend**: [http://localhost:3001](http://localhost:3001)  
**Backend**: [http://localhost:5001](http://localhost:5001)  
(Replace with deployed links once hosted)

---

## 🚀 Features

- 👤 User Signup & Login with JWT Auth  
- 🔐 Secure Routes with Middleware  
- 🪑 Smart Seat Booking Logic (row-first, then nearest)  
- ❌ Booking Cancellation  
- 🎯 Only 1–7 seats allowed per reservation  
- 🎨 Stylish UI using Tailwind CSS & React Hooks  
- 📦 Fully Responsive Design  

---

## 🛠️ Tech Stack

| Frontend      | Backend     | Database     |
|---------------|-------------|--------------|
| Next.js 15    | Express.js  | PostgreSQL   |
| Tailwind CSS  | Node.js     | pg (npm)     |
| React Hooks   | JWT Auth    |              |

---

## 🗂️ Folder Structure

zapphire_project/ │ ├── frontend/ # Next.js Frontend │ ├── app/ │ │ ├── login/ │ │ ├── signup/ │ │ ├── seats/ │ │ ├── dashboard/ │ │ ├── components/ │ │ └── page.js │ └── tailwind.config.js │ ├── server/ # Express Backend │ ├── routes/ │ │ ├── auth.js │ │ └── booking.js │ ├── db.js │ ├── authMiddleware.js │ └── index.js │ └── README.md

pgsql
Copy
Edit

---

## 🧠 Smart Booking Logic

- Tries to allocate all requested seats **in a single row**
- If not possible, picks **closest available seats**
- Prevents **double-booking**
- Cancellation releases those seats

---

## 🧪 API Endpoints

### 🔐 Auth Routes (`/api`)

| Method | Route         | Description             |
|--------|---------------|-------------------------|
| POST   | `/signup`     | Register user           |
| POST   | `/login`      | Login & get JWT token   |
| GET    | `/protected`  | Protected route test    |

### 🎟️ Booking Routes (`/api`)

| Method | Route         | Description                     |
|--------|---------------|----------------------------------|
| GET    | `/seats`      | Fetch all seat status           |
| POST   | `/book`       | Book 1–7 seats (Auth required)  |
| POST   | `/cancel`     | Cancel user’s booking           |

---

## 🧾 Database Schema (PostgreSQL)

```sql

---

## 🧠 Smart Booking Logic

- Tries to allocate all requested seats **in a single row**
- If not possible, picks **closest available seats**
- Prevents **double-booking**
- Cancellation releases those seats

---

## 🧪 API Endpoints

### 🔐 Auth Routes (`/api`)

| Method | Route         | Description             |
|--------|---------------|-------------------------|
| POST   | `/signup`     | Register user           |
| POST   | `/login`      | Login & get JWT token   |
| GET    | `/protected`  | Protected route test    |

### 🎟️ Booking Routes (`/api`)

| Method | Route         | Description                     |
|--------|---------------|----------------------------------|
| GET    | `/seats`      | Fetch all seat status           |
| POST   | `/book`       | Book 1–7 seats (Auth required)  |
| POST   | `/cancel`     | Cancel user’s booking           |

---

## 🧾 Database Schema (PostgreSQL)

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password TEXT
);

CREATE TABLE seats (
  id SERIAL PRIMARY KEY,
  row_number INT,
  seat_number INT,
  is_booked BOOLEAN DEFAULT FALSE,
  user_id INT REFERENCES users(id)
);

🧑‍💻 Local Setup Instructions
# 1. Clone the repo
git clone https://github.com/PournimaCoding/zapphire-train-reservation.git
cd zapphire-train-reservation

# 2. Backend setup
cd server
npm install
# Create `.env` with your PostgreSQL connection string
node index.js

# 3. Frontend setup
cd ../frontend
npm install
npm run dev
✅ Validation & Best Practices
✅ Input validation on both frontend & backend

🔐 JWT-based protected routes

🧼 Sanitized DB queries using pg

💅 Clean folder structure

📱 Fully responsive with Tailwind CSS

📋 Comments & modular code

📸 Presentation & Deployment
💻 GitHub Repo: zapphire-train-reservation

🎥 Walkthrough Video: (Add link here when recorded)

🚀 Deployment (Optional): Host via Vercel / Railway / Render

Made with ❤️ by Pournima
ZS Assignment Project
Made with ❤️ by Pournima
ZS Assignment Project
