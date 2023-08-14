import React, { useContext, useEffect, useRef, useState } from 'react';
import styles from './LoginPage.module.css';
import Context from '../Store/Context';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
    const context = useContext(Context)
  const emailRef = useRef();
  const passwordRef = useRef(); 
  const navigate = useNavigate();

  const switchHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const SubmitHandler = async (event) =>{
event.preventDefault();
const enteredEmail = emailRef.current.value;
const enteredPassword = passwordRef.current.value;
if (isLogin) {
    const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBsBi6XuiXEAJS8LypGcACrNuK5h8i494Y';
    try{
     const response = await fetch(url,{
       method:'POST',
       body: JSON.stringify({
         email: enteredEmail,
           password: enteredPassword,
           returnSecureToken: true,
       }),
       headers:{
         'Content-Type': 'application/json'
       },
     });
     if (response.ok) {
       const data = await response.json();
       console.log(data)
      // loginHandler(data.idToken,enteredEmail);
      context.loginHandler(data.idToken,enteredEmail);       
     } else {
       const errorData = await response.json();
       alert(errorData.error.message);
       // Handle error during signup, if needed
     }
    } catch(error){
     console.error('Error occurred:', error);
    } finally{
     emailRef.current.value = ''
       passwordRef.current.value = ''
    }
   } else {
    const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBsBi6XuiXEAJS8LypGcACrNuK5h8i494Y'; // Replace YOUR_API_KEY with your actual API key
     try {
       const response = await fetch(url, {
         method: 'POST',
         body: JSON.stringify({
           email: enteredEmail,
           password: enteredPassword,
           returnSecureToken: true,
         }),
         headers: {
           'Content-Type': 'application/json',
         },
       });

       if (response.ok) {
         const data = await response.json();
        switchHandler();
         alert("Account created Successfully!!")
         setIsLogin(true)

       } else {
         const errorData = await response.json();
         alert(errorData.error.message);
         // Handle error during signup, if needed
       }
     } catch (error) {
       // Handle any other errors that may occur during the fetch
       console.error('Error occurred:', error);
     } finally{
       emailRef.current.value = ''
       passwordRef.current.value = ''
     }
   }
  }

  useEffect(()=>{
    if(context.Login){
        navigate('/home')
    }
  },[context.Login])

  return (
    <div className={styles.loginPage}>
      <div className={styles.formContainer}>
        <h1> {isLogin ? "Login" : "Signup"} </h1>
        <form onSubmit={SubmitHandler}>
          <div className={styles.formGroup}>
            <label htmlFor='email' className={styles.label}>Email:</label>
            <input type='email' id='email' className={styles.input} ref={emailRef} />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor='password' className={styles.label}>Password:</label>
            <input type='password' id='password' className={styles.input}  ref={passwordRef}/>
          </div>
          {isLogin ? (
            <button className={styles.button} type='submit'>Login</button>
          ) : (
            <button className={styles.button} type='submit'>Signup</button>
          )}
        </form>
        <p className={styles.p} onClick={switchHandler}>
          {isLogin ? 'Create new account' : 'Log in to existing account'}
        </p>
      </div>
    </div>
  );
};

export default LoginPage;