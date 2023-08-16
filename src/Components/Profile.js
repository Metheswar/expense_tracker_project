import React from 'react'


const Profile = () => {
   
    const submitHandler = (event) =>{
        event.preventDefault();
        
    }
  return (
    <div className="InputContainer">
        <form onSubmit={submitHandler}>
    <div className="Input">

<label>Name: </label>
      <input
        type="text"
        required
      
      />

      <label>Email: </label>
      <input type="email" required />
      
      <button type='submit'>Update</button>

    </div>
    </form>
  </div>
  )
}

export default Profile