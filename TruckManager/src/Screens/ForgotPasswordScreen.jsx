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

  const validUsername = async (e) => {
    e.preventDefault();
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
    <form className="form-fgt-pass" onSubmit={validUsername}>
      {usernameError.length > 0 && <div style={{color:'red', fontWeight:'bold', margin:'10px'}}>{usernameError}</div>}
      <div className="softContainer">
        <label className="input-label" htmlFor="username">Username*</label>
        <input className="input-field" id="usename" onChange={(e) => setUsername(e.target.value)} value={username}/>
      </div>
      <button className="login-btn">Forgot Password</button>
    </form>
  );
}

const ResetPassword = () => {
  
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [validatedPassword, setValidatedPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const validPassword = async (e) => {
    e.preventDefault();
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
    <form className="form-fgt-pass" onSubmit={validPassword}>
        {passwordError.length > 0 && <div style={{color:'red', fontWeight:'bold', margin:'10px'}}>{passwordError}</div>}
        <div className="softContainer">
          <label className="input-label" htmlFor="newpassword">New Password</label>
          <input className="input-field" id="newpassword" onChange={(e) => setNewPassword(e.target.value)} value={newPassword} type="password"/>
        </div>
        <div className="softContainer">
          <label className="input-label" htmlFor="confriknewpassword">Confirm Password</label>
          <input className="input-field" id="confirmnewpassword" onChange={(e) => setNewPasswordConfirm(e.target.value)} value={newPasswordConfirm} type="password"/>
        </div>
        <button className="login-btn">Reset Password</button>
    </form>
  );
}

  /*-------------------------------------------------------------------------
    Forgot Password Screen
  -------------------------------------------------------------------------*/
  //TODO: create and update specific to forgot password...
  return(
    <div className="container">
        <h1>Forgot Password</h1>
        {validatedUsername === false && <ValidatingUsername />}
        {validatedUsername === true && <ResetPassword />}
    </div>
  )
    
}