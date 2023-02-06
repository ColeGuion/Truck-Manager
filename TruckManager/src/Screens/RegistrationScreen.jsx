/*-------------------------------------------------------------------------
  Import dependencies
-------------------------------------------------------------------------*/
import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/GlobalStyles.css';
import '../Styles/RegistrationScreen.css';
import API_URL from'../config.json';

/*-------------------------------------------------------------------------
  Registration Component
-------------------------------------------------------------------------*/
export default function SignInScreen(){
  const navigate = useNavigate();

  /*-------------------------------------------------------------------------
    React States
  -------------------------------------------------------------------------*/
  const [employeeId, setEmployeeId] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitError, setSubmitError] = useState("");

  /*-------------------------------------------------------------------------
    Methods
  -------------------------------------------------------------------------*/
  const apiURL = API_URL.API_URL;
  const handleRegister = async () => {
    //handle adding user information into the database
    const response = await fetch(`${apiURL}/register`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          employeeId: employeeId,
          username: username,
          passcode: password,
          email: email
        })
    });
    const created = await response.json();
    //TODO: error handling
    if(created.message === "FAILED") {
      setSubmitError("FAILED TO CREATE ACCOUNT");
    }
    else {
      navigate("/..");
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(employeeId.length == 0 || username.length == 0 || email.length == 0 ||
        password.length == 0 || confirmPassword.length == 0){
        setSubmitError("Every blank must be filled in!");
        return;
    }
    else if(submitError.length > 0) {
      setSubmitError("");
    }
    handleRegister();
  }
    
  /*-------------------------------------------------------------------------
    Registration Screen
  -------------------------------------------------------------------------*/
  return(
      <div className="container">
        <h1>Create Account</h1>
        <form className="form-register" onSubmit={handleSubmit} autoComplete="off">
            {submitError.length > 0 && <div style={{color:'red', fontWeight:'bold', margin:'10px'}}>{submitError}</div>}
            <label className="input-label" htmlFor='employeeId'>Employee ID</label>
            <input 
                className='input-field'
                id='employeeId' 
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                autoComplete="off"
            />
            <label className="input-label" htmlFor='username'>Username</label>
            <input 
                className='input-field'
                id='username' 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
                type='password'
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