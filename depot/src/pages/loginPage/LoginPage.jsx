import React, { useEffect, useState } from 'react'
import AccountBanner from '../../components/accountBanner/AccountBanner'
import LoginContainer from '../../components/loginContainer/LoginContainer'
import RegisterContainer from '../../components/registerContainer/RegisterContainer'

export default function LoginPage() {
  const [logInActive , setLoginActive] = useState(false)
  const [registerActive , setRegisterActive] = useState(true)
  const [user , setUser ] = useState(localStorage.getItem("name"))
  const [email , setEmail ] = useState(localStorage.getItem("email"))

  function handleLoginTab (){
    setLoginActive(true)
    setRegisterActive(false)
  }
  function handleRegisterTab (){
    setLoginActive(false)
    setRegisterActive(true)
  }
  useEffect(() => {
    setUser(localStorage.getItem("name"))
  }, [])
  return (
   <section>
      <AccountBanner></AccountBanner>
      <div className="container">
        <div className="tabs">
          <input type="button" className={`registerTab ${registerActive ? "active" : ""}`} onClick={handleRegisterTab} value="register" />
          <input type="button"  className={`logInTab ${logInActive ? "active" : ""}`} onClick={handleLoginTab} value="Log In" />
        </div>
  
        <div className="inputSection">
          <div className={`RegisterSection ${registerActive ? "active" : ""}`}>
           
  
            <RegisterContainer></RegisterContainer>
           
          </div>
          <div className={`LogInSection ${logInActive ? "active" : ""}` }>
           
            <LoginContainer ></LoginContainer>
          </div>
        </div>
  
        </div>
      
     
   </section>
  )
}
