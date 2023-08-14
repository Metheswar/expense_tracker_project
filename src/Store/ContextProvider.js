import React, { useEffect, useState } from 'react'
import Context from './Context'

const ContextProvider = (props) => {
    const [Login,setLogin] = useState(false);
    const [token,setToken] = useState(null);

    useEffect(()=>{
        const token = localStorage.getItem("token");
        if(!!token){
            setLogin(true)
        } else{
            return null;
        }
    },[])

    const loginHandler = (Token,email) =>{
        console.log(Token);
        setLogin(true);
        setToken(Token)
        
    }

    useEffect(()=>{
        if(!!token){
            localStorage.setItem("token",token)
        }
    },token)
    const logoutHandler = () =>{
        setToken(null);
        setLogin(false)
        localStorage.removeItem("token")
    }

    const obj= {
        Login:Login,
        loginHandler: loginHandler,
        logoutHandler:logoutHandler
    }
  return (
    <Context.Provider value={obj}>
    {props.children}
    </Context.Provider>
  )
}

export default ContextProvider