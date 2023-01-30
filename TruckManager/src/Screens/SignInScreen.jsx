/*-------------------------------------------------------------------------
  Import dependencies
-------------------------------------------------------------------------*/
import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/GlobalStyles.css';
import '../Styles/SignInScreen.css';

/*-------------------------------------------------------------------------
  Sign In Component
-------------------------------------------------------------------------*/
export default function SignInScreen(){
  const navigate = useNavigate();
  /*-------------------------------------------------------------------------
    React States
  -------------------------------------------------------------------------*/
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [validation, setValidation] = useState(false);

  /*-------------------------------------------------------------------------
    Methods
  -------------------------------------------------------------------------*/
  const apiURL = 'http://localhost:5000'
  const handleLogin = async () => {
    const response = await fetch(`${apiURL}/login`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    });
    const validation = await response.json();
    console.log(validation.response);
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
      setUsername("");
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
        <h1>Sign In</h1>
        <form className="form-login" onSubmit={validateSignIn}>
          {loginError.length > 0 && <div style={{color:'red', fontWeight:'bold', margin:'10px'}}>{loginError}</div>}
              <label className="input-label" htmlFor='username'>Username</label>
              <input 
                className='input-field'
                id='username' 
                value={username}
                onChange={(e) => setUsername(e.target.value)} 
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