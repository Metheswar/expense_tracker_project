import React, { useContext, useEffect } from 'react'
import Context from '../Store/Context'

const ExpenseList = () => {
    const context = useContext(Context);
    const Expenses = context.expenses;


    return (
    <>
   {context.premium && <button onClick={()=> context.premiumBuyedHandler()}>premium buy</button>}
        <table>
            <thead>
                <tr>
                    <th>
                        Amount
                    </th>
                    <th>
                        Description
                    </th>
                    <th>
                        Date
                    </th>
                    <th>
                        Category
                    </th>
                </tr>
            </thead>
            <tbody>
                {Expenses.map((expense) => (
                    <tr key={expense.id}> {/* Add a unique key for each row */}
                        <td>{expense.amount}</td>
                        <td>{expense.description}</td>
                        <td>{expense.date}</td>
                        <td>{expense.category}</td>
                    </tr>
                ))}
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan="4">Total Expenses: {context.totalExpenses}</td>
                </tr>
            </tfoot>
        </table>
        </>
    )
}

export default ExpenseList;
