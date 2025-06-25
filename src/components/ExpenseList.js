const ExpenseList = ({ expenses, onDelete, onEdit }) => {
  
  return (
    <div>
      <h3>Expense List</h3>
      <ul>
        {expenses.map((expense) => (
          <li key={expense._id}>
            ₹{expense.amount} - {expense.category} ({expense.date.split("T")[0]}
            )
            <br />
            {expense.description}
            <br />
            <button onClick={() => onEdit(expense)}>Edit</button>
            <button onClick={() => onDelete(expense._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
