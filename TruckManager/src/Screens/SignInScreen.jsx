import React, {useState, useEffect} from 'react';
import '../Styles/GlobalStyles.css';
import '../Styles/SignInScreen.css';
import AppInputField from '../Components/AppInputField.jsx';
import AppButton from '../Components/AppButton.jsx';

/*-------------------------------------------------------------------------
  Sign In Component
-------------------------------------------------------------------------*/
export default function SignInScreen({ navigation }){

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
          navigation.navigate("HomeScreen");
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
    navigation.navigate("ForgotPasswordScreen");
  }

  /*-------------------------------------------------------------------------
    Sign In Screen
  -------------------------------------------------------------------------*/
  return(
    <div className="globalpageContainer">
      <div className="globalpageTitle">Sign In</div>
      <div className="mySoftRectangularContainer">
          {loginError.length > 0 && <div className="globalerrordiv">{loginError}</div>}
          <input placeholder="Username" onChange={(e) => {
            setUsername(e.target.value)
            if(loginError.length > 0) {setLoginError("");}
            }} value={username} onKeyDown={handleKeyDown} />
          <input placeholder="Password" onChange={(e) => {
            setPassword(e.target.value);
            if(loginError.length > 0) {setLoginError("");}
          }} value={password} onKeyDown={handleKeyDown} type='password' />
        <button className="globalforgotPassword" onClick={() => forgotPassword()}>
          <div style={{color: '#1e90ff'}}>Forgot password</div>
        </button>
        <button placeholder="Login" onClick={() => validateSignIn()}/>
      </div>
    </div>
  )
    
}