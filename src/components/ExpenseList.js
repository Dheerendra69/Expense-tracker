import "../styles/ExpenseList.css";

const ExpenseList = ({ expenses, onDelete, onEdit }) => {
  return (
    <div className="expense-list-container">
      <h3 className="expense-list-title">Expense List</h3>
      <ul className="expense-list">
        {expenses.map((expense) => (
          <li key={expense._id} className="expense-item">
            <span>
              ₹{expense.amount} - {expense.category} (
              {expense.date.split("T")[0]})
            </span>
            <span>{expense.description}</span>
            <div className="expense-buttons">
              <button onClick={() => onEdit(expense)}>Edit</button>
              <button onClick={() => onDelete(expense._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
