import React, { useContext, useEffect, useRef, useState } from 'react'
import Context from '../Store/Context';
import styles from './Profile.module.css'


const Profile = () => {
    const context = useContext(Context);
    
    const token = localStorage.getItem('token');
    const name = useRef();
    const email = useRef();
    const[disabled,setDisabled] = useState(false)
   
    const submitHandler = async (event) =>{
        event.preventDefault();
        if (token) {
      
            const url = 'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBsBi6XuiXEAJS8LypGcACrNuK5h8i494Y';
            try {
              const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify({
                  displayName: name.current.value,
                  photoUrl: '',
                  idToken: token,
                  returnSecureToken: true,
                }),
                headers: {
                  'Content-Type': 'application/json',
                },
              });
              if (response.ok) {
                const data = await response.json();
                console.log(data);

                context.nameHandler(name.current.value)
              } else {
                const errorData = await response.json();
                alert(errorData.error.message);
                // Handle error during profile update, if needed
              }
            } catch (error) {
              console.error('Error occurred:', error);
            }
          } else {
            console.log('idtoken is null or undefined');
          }
        
    }

    useEffect(()=>{
const fetchUpdateDetails = async () =>{
    const url = 'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBsBi6XuiXEAJS8LypGcACrNuK5h8i494Y';
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          idToken: token,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        if (data.users && data.users.length > 0) {
        name.current.value= data.users[0].displayName || '';
        email.current.value = data.users[0].email || '';
        context.nameHandler(data.users[0].displayName)
        setDisabled(true)
          }
      } else {
        const errorData = await response.json();
        alert(errorData.error.message);
        // Handle error during profile update, if needed
      }
    } catch (error) {
      console.error('Error occurred:', error);
    }
}
        fetchUpdateDetails();
    },[context.Login,context.token])
  return (
    <div className="InputContainer">
        <form onSubmit={submitHandler}>
    <div className="Input">

<label>Name: </label>
      <input
        type="text"
        required
        ref={name}
        className={styles.name}
        
      />

      <label>Email: </label>
      <input type="email" required ref={email} className={styles.email} disabled={disabled} />
      
      <button type='submit'>Update</button>

    </div>
    </form>
  </div>
  )
}

export default Profile