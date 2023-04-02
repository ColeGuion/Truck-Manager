/*-------------------------------------------------------------------------
  Import dependencies
-------------------------------------------------------------------------*/
import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/GlobalStyles.css';
import '../Styles/SignInScreen.css';
import API_URL from'../config.json';
import logo from '../Logo_Files/png/logo-no-background.png'
import { AiOutlineLogin } from "react-icons/ai";

/*-------------------------------------------------------------------------
  Sign In Component
-------------------------------------------------------------------------*/
export default function SignInScreen(){
  const navigate = useNavigate();
  /*-------------------------------------------------------------------------
    React States
  -------------------------------------------------------------------------*/
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [validation, setValidation] = useState(false);

  /*-------------------------------------------------------------------------
    Methods
  -------------------------------------------------------------------------*/
  const apiURL = API_URL.API_URL;
  const handleLogin = async () => {
    const response = await fetch(`${apiURL}/login`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        employeeId: employeeId,
        password: password
      })
    });
    const validation = await response.json();
    //console.log(validation.response);
    setValidation(validation.accepted);
    return validation.accepted;
  }

  //Temporary -- will eventually validate with usernames and passwords from database server.
  const validateSignIn = async (e) => {
    e.preventDefault();
    async function loginHandler() {
      await handleLogin().then((valid) => {
        if(valid === true || validation) {
          navigate("/home");
        }
        else if(valid === false) {
          setLoginError("Invalid Credentials");
        }
      });
      setEmployeeId("");
      setPassword("");
    }
    loginHandler();
  }

  const forgotPassword = () => {
    navigate("/forgotpassword");
  }

  const register = () => {
    navigate("/register");
  }

  /*-------------------------------------------------------------------------
    Sign In Screen
  -------------------------------------------------------------------------*/
  return(
      <div className="container">
        <img className="logo" src={logo} alt="Truck Manager Logo" />
        
        <form className="form-login" onSubmit={validateSignIn}>
          {loginError.length > 0 && <div style={{color:'red', fontWeight:'bold', margin:'10px'}}>{loginError}</div>}
              <label className="input-label" htmlFor='employeeId'>Employee ID</label>
              <input 
                className='input-field'
                id='employeeId' 
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)} 
              />
              <label className="input-label" htmlFor='password'>Password</label>
              <input 
                className='input-field'
                id='password' 
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
              />
          <button className="login-btn" type="submit">Login</button>
          <div className="sign-in-link-container">
            <span className="register-link" onClick={() => register()}>Create account</span>
            <span className="fgt-pass-link" onClick={() => forgotPassword()}>Forgot password</span>
          </div>
        </form>
      </div>
  )
    
}