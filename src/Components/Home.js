import React, { useContext, useEffect } from 'react';
import Context from '../Store/Context';
import InputForm from './InputForm';
import ExpenseList from './ExpenseList';


const Home = () => {
    const context = useContext(Context);

    return (
        <>
            <InputForm />
            <ExpenseList />
        </>
    );
};

export default Home;
