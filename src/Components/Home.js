import React, { useContext, useEffect } from 'react'
import Context from '../Store/Context'
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const context = useContext(Context);
    const navigate = useNavigate();
    useEffect(()=>{
        if(!context.Login){
            navigate('/')
        }
    },[context.Login])
  return (
    <div><p onClick={() =>context.logoutHandler()}>Home</p></div>
  )
}

export default Home