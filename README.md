# 💸 Expense Tracker Application

This is a full-stack **Expense Tracker** application built using the **MERN stack** (MongoDB, Express.js, React, Node.js). The app allows users to **add, edit, delete**, and **visualize expenses** with interactive charts. 

### 🔐 Hero Page
![Hero Page](./website-demo/Hero-Page.jpeg)

🔐 **Google OAuth** is implemented for user authentication, and the backend is hosted on **Render**.

## 🚀 Features

- 🔐 User Authentication via **Google OAuth**
- ➕ Add, ✏️ Edit, 🗑 Delete expense records
- 📊 Visualize spending patterns with:
  - **Pie Chart** (Expense by category)
  - **Bar Chart** (Monthly breakdown)
- 💾 Persistent storage using **MongoDB**
- 📱 Responsive and user-friendly React interface

---

## 📦 Tech Stack

| Layer       | Tech                     |
|-------------|--------------------------|
| Frontend    | React.js, Chart.js       |
| Backend     | Node.js, Express.js      |
| Database    | MongoDB Atlas            |
| Auth        | Google OAuth             |
| Deployment  | Render (for backend)     |

---

## 🛠 Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/expense-tracker.git
cd expense-tracker
npm install
npm start
```

Run Backend (Express Server)
<!-- create a .env file in the same level as package.json and add following details - -->
PORT = 4000
DATABASE_URI = mongodb+srv://dheerendralpu:P4ZieaPBJHla7cyR@cluster0.uiphs0k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET = secret
<!-- this is a dummy database -->

```bash
cd server
npm install
npm run dev
```
