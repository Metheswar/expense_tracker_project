import React, { useContext } from 'react';
import Context from '../Store/Context';
import './ExpenseList.css'; // Import your CSS for styling

const ExpenseList = () => {
  const context = useContext(Context);
  const Expenses = context.expenses;

  const handleDeleteExpense = (id) => {
    context.deleteExpense(id);
  };
  const handleEditExpense = (id,amount,description,category,date) =>{
    context.deleteExpense(id);
    context.amountRef.current.value = amount;
    context.descriptionRef.current.value = description;
    context.categoryRef.current.value = category;
    context.dateRef.current.value = date;

  }

  return (
    <div className="expense-list-container">
      {context.premium && (
        <button onClick={() => context.premiumBuyedHandler()} className="premium-button">
          Premium Buy
        </button>
      )}
      <table className="expense-table">
        <thead>
          <tr>
            <th>Amount</th>
            <th>Description</th>
            <th>Date</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Expenses.map((expense) => (
            <tr key={expense.id}>
              <td>₹{expense.amount.toFixed(2)}</td>
              <td>{expense.description}</td>
              <td>{expense.date}</td>
              <td>{expense.category}</td>
              <td>
              <button onClick={() => handleEditExpense(expense.id,expense.amount,expense.description,expense.category,expense.date)} className='btn'>Edit</button>
                <button onClick={() => handleDeleteExpense(expense.id)} className='btn'>Delete</button>
                
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="4" className="total-expenses">
              Total Expenses: ₹{context.totalExpenses.toFixed(2)}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default ExpenseList;
