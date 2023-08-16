import React, { useEffect, useState } from 'react';
import Context from './Context';

const ContextProvider = (props) => {
  const [Login, setLogin] = useState(false);
  const [token, setToken] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [update, setUpdate] = useState(false);
  const [premium, setPremium] = useState(false);
  const [premiumBuyed, setPremiumBuyed] = useState(false);
  const [email,setEmail] = useState(null);

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
    const storedEmail = localStorage.getItem("email")
    if (!!storedToken && !!storedEmail) {
      setLogin(true);
      setToken(storedToken);
      setEmail(storedEmail);
    }
  }, []);

  const loginHandler = (Token, Email) => {
    setLogin(true);
    setToken(Token);
    setEmail(Email);
  };

  useEffect(() => {
    if (!!token) {
      localStorage.setItem('token', token);
    }
  }, [token]);
const emailHandler = () =>{
const urlEmail = email.replace(/[@.]/g, '');
setEmail(urlEmail)
localStorage.setItem("email",urlEmail)
}

  useEffect(()=>{
    if(!!email){
        emailHandler();
    }
  },[email])

  const logoutHandler = () => {
    setToken(null);
    setLogin(false);
    localStorage.removeItem('token');
    localStorage.removeItem("email")
  };
  const deleteExpense = (id) => {
    setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense.id !== id));
  };


  const expenseHandler = (Expense) => {
    setExpenses((prevExpenses) => [...prevExpenses, Expense]);
  };

  const totalExpenses = expenses.reduce((total, expense) => {
    return total + parseFloat(expense.amount);
  }, 0);

  useEffect(() => {
    const storeCartItems = async () => {
      if (email && Login) {
        // Check if the user is logged in and not logged out
        const url = `https://dependable-fuze-322211-default-rtdb.firebaseio.com/${email}/Expenses.json`;
        try {
          const response = await fetch(url, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(expenses),
          });

          if (!response.ok) {
            throw new Error('Failed to store data into Firebase.');
          }

          // alert('Data stored successfully!');
        } catch (error) {
          console.error('Error:', error);
        }
      }
    };

    storeCartItems();
  }, [expenses]);

  useEffect(() => {
    if (email && Login) {
      const fetchCartItems = async () => {
        try {
          const url = `https://dependable-fuze-322211-default-rtdb.firebaseio.com/${email}/Expenses.json`;
          const response = await fetch(url, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (!response.ok) {
            throw new Error('Failed to fetch cart items from Firebase.');
          }

          const data = await response.json();
          if (data) {
            const expensesArray = Object.values(data);
            console.log(data);
            setExpenses(expensesArray)
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };

      fetchCartItems();
    }
  }, [email,Login]);

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
    deleteExpense:deleteExpense,
  };

  return (
    <Context.Provider value={obj}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
