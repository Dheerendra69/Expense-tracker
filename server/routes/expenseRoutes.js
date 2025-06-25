const express = require("express");
const router = express.Router();
const {
  addExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
} = require("../controllers/expenseController");
const verifyToken = require("../middleware/auth");

router.use(verifyToken);

router.post("/", addExpense);
router.get("/", getExpenses);
router.put("/:id", updateExpense);
router.delete("/:id", deleteExpense);

module.exports = router;
