import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Header.module.css';
import Context from '../Store/Context';
import { useNavigate } from 'react-router-dom';
import { saveAs } from "file-saver";

const Header = () => {
    const context = useContext(Context)
    const navigate = useNavigate();
const logoutHandler = () =>{
navigate('/')
context.logoutHandler();
}

const downloadExpenses = () => {
  // Create a CSV string from the received data
  const csv =
    "Category,Description,Amount\n" +
    Object.values(context.expenses)
      .map(
        ({ category, description, amount }) =>
          `${category},${description},${amount}`
      )
      .join("\n");

  // Create a new blob with the CSV data
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });

  // Save the blob as a file with the name "expenses.csv"
  saveAs(blob, "expenses.csv");
};
  return (
    <header className={classes.header}>
      <h1><NavLink to='/home'>ExpenseTrack Pro</NavLink></h1>
      <h3>{context.name}</h3>
      <nav>
        <ul>
        {!context.update &&           <li>
            <NavLink to='/profile' onClick={() => context.updateHandler()}>Profile</NavLink>
          </li>}
          {context.update &&           <li>
            <NavLink to='/home' onClick={() => context.updateHandler()}>Home</NavLink>
          </li>}
         {context.premiumBuyed && <li>
            <a onClick={downloadExpenses}>Download csv</a>
          </li> } 
       
          <li>
          <a onClick={logoutHandler}>LogOut</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
