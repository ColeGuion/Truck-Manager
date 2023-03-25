/*-------------------------------------------------------------------------
  Import dependencies
-------------------------------------------------------------------------*/
import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/GlobalStyles.css';
import '../Styles/RegistrationScreen.css';
import API_URL from'../config.json';
import { TiArrowBack,TiArrowBackOutline } from "react-icons/ti";
import logo from '../Logo_Files/png/logo-header.png'

/*-------------------------------------------------------------------------
  Registration Component
-------------------------------------------------------------------------*/
export default function RegistrationScreen(){
  /*-------------------------------------------------------------------------
    Constants
  -------------------------------------------------------------------------*/
  const navigate = useNavigate();
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{8,32}$/;
  const emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

  /*-------------------------------------------------------------------------
    React States
  -------------------------------------------------------------------------*/
  const [employeeId, setEmployeeId] = useState("");
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
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        employeeId: employeeId,
        passcode: password,
        email: email,
      })
    });
    const created = await response.json();
    if(created.message === "FAILED") {
      setSubmitError("Failed to create account, try again");
    }
    else if(created.message === 'employeeId') {
      setSubmitError("Invalid Employee ID");
    }
    else if(created.message === 'exists') {
      setSubmitError("Employee ID already in use");
    }
    else if(created.message === 'email') {
      setSubmitError("Invalid email!");
    }
    else if(created.message === 'password'){
      setSubmitError("Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and a number");
    }
    else {
      navigate("/..");
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(employeeId.length == 0 || email.length == 0 ||
         password.length == 0 || confirmPassword.length == 0){
        setSubmitError("Every blank must be filled in!");
        return;
    }
    if (!emailRegex.test(email)) {
      setSubmitError("Invalid email!");
      return;
    }
    if (!passwordRegex.test(password)) {
      setSubmitError("Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and a number");
      return;
    }
    if (password != confirmPassword){
      setSubmitError("Password and Confirm Password are not the same, try again.");
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
        <img className="Logo-header" src={logo} alt="Logo" />
        <div className="back-button" onClick = { () => navigate(-1) }>
          <TiArrowBackOutline className="icon1" size="70px" />
          <TiArrowBack className="icon2" size="70px" />
        </div>

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
