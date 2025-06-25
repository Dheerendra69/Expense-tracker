import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import Dashboard from "../components/Dashboard";
import "../styles/Home.css";

import {
  fetchExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
} from "../api";

const Home = () => {
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    } else {
      setUser(JSON.parse(userData));
      loadExpenses();
    }
  }, [navigate]);

  const loadExpenses = async () => {
    try {
      const res = await fetchExpenses();
      setExpenses(res.data);
    } catch (err) {
      console.error("Error loading expenses", err);
    }
  };

  const handleAddOrUpdate = async (expense) => {
    if (editingExpense) {
      await updateExpense(editingExpense._id, expense);
    } else {
      await createExpense(expense);
    }
    clearEdit();
    loadExpenses();
  };

  const handleDelete = async (id) => {
    await deleteExpense(id);
    loadExpenses();
  };

  const handleEdit = (expense) => {
    setEditingExpense(expense);
  };

  const clearEdit = () => setEditingExpense(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="home-container">
      <div className="header">
        <h2>Expense Tracker</h2>
        {user ? (
          <div className="user-info">
            <p>{user.username}</p>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <button className="login-btn" onClick={() => navigate("/login")}>
            Login
          </button>
        )}
      </div>

      {user ? (
        <>
          <p className="welcome-text">Welcome, {user.username}</p>
          <ExpenseForm
            onSubmit={handleAddOrUpdate}
            editingExpense={editingExpense}
            clearEdit={clearEdit}
          />
          <ExpenseList
            expenses={expenses}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
          <Dashboard expenses={expenses} />
        </>
      ) : (
        <p className="not-logged-in">
          You need to be logged in to view this page.
        </p>
      )}
    </div>
  );
};

export default Home;
