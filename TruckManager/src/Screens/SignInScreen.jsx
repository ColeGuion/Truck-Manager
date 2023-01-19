import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/GlobalStyles.css';
import '../Styles/SignInScreen.css';
import AppInputField from '../Components/AppInputField.jsx';
import AppButton from '../Components/AppButton.jsx';

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

  const handleKeyDown = (e) => {
    if(e.nativeEvent.key == "Enter"){
      validateSignIn();
    }
  }

  //Temporary -- will eventually validate with usernames and passwords from database server.
  const validateSignIn = () => {
    async function loginHandler() {
      await handleLogin().then((e) => {
        if(e === true || validation) {
          navigate("/home");
        }
        else if(e === false) {
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

  /*-------------------------------------------------------------------------
    Sign In Screen
  -------------------------------------------------------------------------*/
  return(
    <div>
      <div>Sign In</div>
      <div>
          {loginError.length > 0 && <div>{loginError}</div>}
          <input placeholder="Username" onChange={(e) => {
            setUsername(e.target.value)
            if(loginError.length > 0) {setLoginError("");}
            }} value={username} onKeyDown={handleKeyDown} />
          <input placeholder="Password" onChange={(e) => {
            setPassword(e.target.value);
            if(loginError.length > 0) {setLoginError("");}
          }} value={password} onKeyDown={handleKeyDown} type='password' />
        <button onClick={() => forgotPassword()}>
          <div >Forgot password</div>
        </button>
        <button onClick={() => validateSignIn()}>Login</button>
      </div>
    </div>
  )
    
}