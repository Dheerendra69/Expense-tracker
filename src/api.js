import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const fetchExpenses = () => API.get("/expenses");
export const createExpense = (expense) => API.post("/expenses", expense);
export const updateExpense = (id, expense) =>
  API.put(`/expenses/${id}`, expense);
export const deleteExpense = (id) => API.delete(`/expenses/${id}`);

export default API;
