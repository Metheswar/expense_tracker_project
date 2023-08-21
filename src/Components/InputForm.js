import React, { useContext, useRef } from 'react';
import './InputForm.css';
import Context from '../Store/Context';

const InputForm = () => {
  const context = useContext(Context);
  const amountRef = context.amountRef;
  const descriptionRef = context.descriptionRef;
  const dateRef = context.dateRef;
  const categoryRef = context.categoryRef;

  const submitHandler = (event) => {
    event.preventDefault();
    const parts = dateRef.current.value.split('-');
    const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
    const expense = {
      id: Math.random(),
      amount: parseFloat(amountRef.current.value),
      description: descriptionRef.current.value,
      date: formattedDate,
      category: categoryRef.current.value,
    };

    if (context.totalExpenses + expense.amount <= 10000 || context.premiumBuyed) {
      context.expenseHandler(expense);
    

    amountRef.current.value = '';
    descriptionRef.current.value = '';
    dateRef.current.value = '';
    categoryRef.current.value = '';
    } else{
      context.premiumHandler();
    }
  };

  return (
    <div className="InputContainer">
      <form onSubmit={submitHandler}>
        <div className="Input">
          <label>Amount: </label>
          <input type="number" min="1" ref={amountRef} />

          <label>Description: </label>
          <input className='description' type="text" ref={descriptionRef} />

          <label>Date: </label>
          <input type="date" ref={dateRef} />

          <label>Category: </label>
          <select ref={categoryRef} defaultValue="">
            <option disabled value="">
              Select Category
            </option>
            <option value="food">Food</option>
            <option value="petrol">Petrol</option>
            <option value="clothes">Clothes</option>
            <option value="others">Others</option>
          </select>

          <button type="submit">
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default InputForm;
