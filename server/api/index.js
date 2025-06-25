require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT;
const dbConnect = require("../config/dbConnect");
dbConnect();
const cors = require("cors");
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());
const userRoutes = require("../routes/userRoutes");
const expenseRoutes = require("../routes/expenseRoutes");
app.use("/api", userRoutes);
app.use("/api/expenses", expenseRoutes);
app.listen(PORT, () => {
  console.log(`Server running at port number ${PORT}`);
});
