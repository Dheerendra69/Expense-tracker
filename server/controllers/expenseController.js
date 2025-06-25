const Expense = require("../models/Expense");

const addExpense = async (req, res) => {
  try {
    const { amount, category, description, date } = req.body;
    console.log(category + description);
    const newExpense = new Expense({
      amount,
      category,
      description,
      date,
      user: req.user.id,
    });
    console.log(newExpense);
    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(500).json({ message: "Error adding expense", error });
  }
};

const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id }).sort({
      date: -1,
    });

    if (expenses.length === 0) {
      return res.status(200).json([]);
    }

    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching expenses", error });
  }
};

const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;

    const expense = await Expense.findById(id);

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    if (expense.user.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Unauthorized to update this expense" });
    }

    const updatedExpense = await Expense.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json(updatedExpense);
  } catch (error) {
    res.status(500).json({ message: "Error updating expense", error });
  }
};

const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;

    const expense = await Expense.findById(id);

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    if (expense.user.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this expense" });
    }

    await Expense.findByIdAndDelete(id);
    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting expense", error });
  }
};

module.exports = {
  addExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
};
