import React, { useRef, useState } from 'react'
import { NavLink, redirect } from 'react-router-dom'

export default function AdminDashboardLogin() {
    const [value , setValue ] = useState("")
     const input = useRef(<input type='text' placeholder='password' onChange={() => handleChange()} value={value}></input>)
        
    const handleChange = (event) => {
        console.log(event);
        setValue(event.target.value);
      };
      const [error, setError] = useState('');
      const handleSubmit = (event) => {
        event.preventDefault(); 

        if (!value.trim()) {
          setError('Input cannot be empty');
          return;
        }
    
        if (value !== "2009") {
          setError('password is wrong');
          return;
        } else{
            setError("")
        }

        
      };
  return (
   <section className='dashboardPassword'>
        <h6>Hello Admin {}</h6>
        <p>please enter the password</p>
        <form onSubmit={handleSubmit} >
        <input type='text' placeholder='password' onChange={ handleChange} value={value}></input>
        {error && <p className='err'>{error}</p>}
        <button type='submit'>Go to dashboard</button>
        </form>

   </section>
  )
}
