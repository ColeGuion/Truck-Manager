import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/GlobalStyles.css';
import '../Styles/ForgotPasswordScreen.css'

/*-------------------------------------------------------------------------
  Forgot Password Component"
-------------------------------------------------------------------------*/
export default function ForgotPasswordScreen({ navigation }){
/*TODO: write simple function to check for a valid usernamethen display a different 
        UI for validation (probably via email), then display reset password UI
*/
const navigate = useNavigate();
const [validatedUsername, setValidatedUsername] = useState(false);

const ValidatingUsername = () => {

  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");

  const validUsername = () => {
    if (username === "admin") { //this will eventually run against all username in database to see if there is a match
      setValidatedUsername(true);
    }
    else {
      setUsernameError("Not Valid Username");
    }
  }

  const handleKeyDown = (e) => {
    if(e.nativeEvent.key == "Enter"){
      validUsername();
    }
  }


  return (
    <div className="mySoftRectangularContainer">
      {usernameError.length > 0 && <h2>{usernameError}</h2>}
      <div className="softContainer">
        <label htmlFor="username">Username*</label>
        <input id="usename" onChange={(e) => setUsername(e.target.value)} value={username} onKeyDown={handleKeyDown}/>
      </div>
      <button onClick={() => validUsername()}>Forgot Password</button>
    </div>
  );
}

const ResetPassword = () => {
  
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [validatedPassword, setValidatedPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const validPassword = () => {
    if (newPassword === newPasswordConfirm) { //this will eventually run against pararameters for a password, such as 8 characters in length, number, etc. it will also ensure it is not the old password
      setValidatedPassword(true);
      setNewPassword("");
      setNewPasswordConfirm("");
      if (passwordError.length > 0) {
        setPasswordError("");
      }
      navigate("/");
    }
    else {
      setPasswordError("Passwords do not match!");
    }
  }

  const handleKeyDown = (e) => {
    if(e.nativeEvent.key == "Enter"){
      validPassword();
    }
  }


  return (
    <div className="mySoftRectangularContainer">
        {passwordError.length > 0 && <h2>{passwordError}</h2>}
        <div className="softContainer">
          <label htmlFor="newpassword">New Password</label>
          <input id="newpassword" onChange={(e) => setNewPassword(e.target.value)} value={newPassword} type="password" onKeyDown={handleKeyDown}/>
        </div>
        <div className="softContainer">
          <label htmlFor="confriknewpassword">Confirm Password</label>
          <input id="confirmnewpassword" onChange={(e) => setNewPasswordConfirm(e.target.value)} value={newPasswordConfirm} type="password" onKeyDown={handleKeyDown}/>
        </div>
        <button onClick={() => validPassword()}>Reset Password</button>
      </div>
  );
}

  /*-------------------------------------------------------------------------
    Forgot Password Screen
  -------------------------------------------------------------------------*/
  //TODO: create and update specific to forgot password...
  return(
    <div className="globalpageContainer">
        <h1 className="globalpageTitle">Forgot Password</h1>
        {validatedUsername === false && <ValidatingUsername />}
        {validatedUsername === true && <ResetPassword />}
    </div>
  )
    
}