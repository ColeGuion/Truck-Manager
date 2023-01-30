/*-------------------------------------------------------------------------
  Import dependencies
-------------------------------------------------------------------------*/
import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/GlobalStyles.css';
import '../Styles/RegistrationScreen.css';

/*-------------------------------------------------------------------------
  Registration Component
-------------------------------------------------------------------------*/
export default function SignInScreen(){
  const navigate = useNavigate();

  /*-------------------------------------------------------------------------
    React States
  -------------------------------------------------------------------------*/
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  /*-------------------------------------------------------------------------
    Methods
  -------------------------------------------------------------------------*/
  const handleRegister = async () => {
    //handle adding user information into the database
    //handle navigating to the login page
    navigate("/..");
  }
    
  /*-------------------------------------------------------------------------
    Registration Screen
  -------------------------------------------------------------------------*/
  return(
      <div className="container">
        <h1>Create Account</h1>
        <form className="form-register" onSubmit={handleRegister} autoComplete="off">
            <label className="input-label" htmlFor='firstName'>First Name</label>
            <input 
                className='input-field'
                id='firstName' 
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                autoComplete="off"
            />
            <label className="input-label" htmlFor='lastName'>Last Name</label>
            <input 
                className='input-field'
                id='lastName'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)} 
                autoComplete="off"
            />
            <label className="input-label" htmlFor='email'>Email</label>
            <input 
                className='input-field'
                id='email' 
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
                autoComplete="off"
            />
            <label className="input-label" htmlFor='password'>Password</label>
            <input 
                className='input-field'
                id='password' 
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
                autoComplete="off"
            />
            <label className="input-label" htmlFor='confirmPassword'>Confirm Password</label>
            <input 
                className='input-field'
                id='confirmPassword' 
                type='confirmPassword'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)} 
                autoComplete="off"
            />
            <button className="register-btn" type="submit">Submit</button>
            <div className="sign-in-link" onClick = { () => navigate("/..") }>
                Already have an account?
            </div>
        </form>
      </div>
  )
    
}