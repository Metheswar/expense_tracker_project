import React, { useContext, useEffect } from 'react'
import Context from '../Store/Context'

import Header from './Header';
import InputForm from './InputForm';
import ExpenseList from './ExpenseList';

const Home = () => {
    const context = useContext(Context);

  return (
    <>
    <InputForm />
    <ExpenseList />
    </>
  )
}

export default Home