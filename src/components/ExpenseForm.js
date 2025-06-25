import React, { useState, useEffect } from 'react';

const initialForm = {
  amount: '',
  category: '',
  description: '',
  date: '',
};

const ExpenseForm = ({ onSubmit, editingExpense, clearEdit }) => {
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (editingExpense) setForm(editingExpense);
  }, [editingExpense]);

  const handleChange = (e) => {
    console.log(form);
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm(initialForm);
    if (clearEdit) clearEdit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{editingExpense ? 'Edit Expense' : 'Add Expense'}</h3>
      <input type="number" name="amount" placeholder="Amount" value={form.amount} onChange={handleChange} required />
      <input type="text" name="category" placeholder="Category" value={form.category} onChange={handleChange} required />
      <input type="text" name="description" placeholder="Description" value={form.description} onChange={handleChange} />
      <input type="date" name="date" value={form.date} onChange={handleChange} required />
      <button type="submit">{editingExpense ? 'Update' : 'Add'}</button>
    </form>
  );
};

export default ExpenseForm;
