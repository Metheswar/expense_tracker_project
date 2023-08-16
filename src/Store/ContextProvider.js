import React, { useEffect, useState } from 'react';
import Context from './Context';

const ContextProvider = (props) => {
  const [Login, setLogin] = useState(false);
  const [token, setToken] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [update, setUpdate] = useState(false);
  const [premium, setPremium] = useState(false);
  const [premiumBuyed, setPremiumBuyed] = useState(false);

  const premiumBuyedHandler = () => {
    setPremiumBuyed(true);
    setPremium(false);
  };

  const premiumHandler = () => {
    setPremium(true);
    alert('Buy premium to continue');
  };

  const updateHandler = () => {
    setUpdate((prevState) => !prevState);
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (!!storedToken) {
      setLogin(true);
      setToken(storedToken);
    }
  }, []);

  const loginHandler = (Token, email) => {
    setLogin(true);
    setToken(Token);
  };

  useEffect(() => {
    if (!!token) {
      localStorage.setItem('token', token);
    }
  }, [token]);

  const logoutHandler = () => {
    setToken(null);
    setLogin(false);
    localStorage.removeItem('token');
  };

  const expenseHandler = (Expense) => {
    setExpenses((prevExpenses) => [...prevExpenses, Expense]);
  };

  const totalExpenses = expenses.reduce((total, expense) => {
    return total + parseFloat(expense.amount);
  }, 0);

  const obj = {
    Login: Login,
    loginHandler: loginHandler,
    logoutHandler: logoutHandler,
    expenseHandler: expenseHandler,
    expenses: expenses,
    updateHandler: updateHandler,
    update: update,
    premiumHandler: premiumHandler,
    premium: premium,
    premiumBuyedHandler: premiumBuyedHandler,
    premiumBuyed: premiumBuyed,
    totalExpenses: totalExpenses,
  };

  return (
    <Context.Provider value={obj}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
