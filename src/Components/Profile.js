import React, { useContext, useEffect, useRef } from 'react'
import Context from '../Store/Context';
import { isDisabled } from '@testing-library/user-event/dist/utils';


const Profile = () => {
    const context = useContext(Context);
    
    const token = localStorage.getItem('token');
    const name = useRef();
    const email = useRef();
   
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
    },[context.Login])
  return (
    <div className="InputContainer">
        <form onSubmit={submitHandler}>
    <div className="Input">

<label>Name: </label>
      <input
        type="text"
        required
        ref={name}
      />

      <label>Email: </label>
      <input type="email" required ref={email} />
      
      <button type='submit'>Update</button>

    </div>
    </form>
  </div>
  )
}

export default Profile