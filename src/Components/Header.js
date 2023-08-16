import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Header.module.css';
import Context from '../Store/Context';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const context = useContext(Context)
    const navigate = useNavigate();
const logoutHandler = () =>{
navigate('/')
context.logoutHandler();
}
  return (
    <header className={classes.header}>
      <h1><NavLink to='/home'>Expense Tracker</NavLink></h1>
      <nav>
        <ul>
        {!context.update &&           <li>
            <NavLink to='/profile' onClick={() => context.updateHandler()}>Profile</NavLink>
          </li>}
          {context.update &&           <li>
            <NavLink to='/home' onClick={() => context.updateHandler()}>Home</NavLink>
          </li>}
          <li>
          <a onClick={logoutHandler}>LogOut</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
