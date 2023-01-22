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
const APIURL = "http://localhost:5000";
const navigate = useNavigate();
const [validatedUsername, setValidatedUsername] = useState(false);
const [globalUsername, setGlobalUsername] = useState("");


const ValidatingUsername = () => {

  const [usernameError, setUsernameError] = useState("");
  const [username, setUsername] = useState("");

  const validUsername = async (e) => {
    e.preventDefault();
    const response = await fetch(`${APIURL}/validusername/${username}`)
    const validated = await response.json();
    if(validated.response) {
      setValidatedUsername(true);
      setGlobalUsername(username);
    }
    else {
      setUsername("");
      setUsernameError("Not Valid Username");
    }
  }

  return (
    <form className="form-fgt-pass" onSubmit={validUsername}>
      {usernameError.length > 0 && <div style={{color:'red', fontWeight:'bold', margin:'10px'}}>{usernameError}</div>}
        <label className="input-label" htmlFor="username">Username*</label>
        <input className="input-field" id="usename" onChange={(e) => setUsername(e.target.value)} value={username}/>
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
      const response = await fetch(`${APIURL}/forgotpassword`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: globalUsername,
          newPassword: newPassword
        })
      });
      const res = await response.json()
      console.log(res);
      if(res.response) {
        navigate("/");
      }
      else {
        if(res.errcode === 1) {
          setPasswordError("Password must have 8-32 characters, capital letter, and a number");
        }
        if(res.errcode === 2) {
          setPasswordError("something went wrong try again");
        }
        setNewPassword("");
        setNewPasswordConfirm("");
      }
    }
    else {
      setPasswordError("Passwords do not match!");
      setNewPassword("");
      setNewPasswordConfirm("");
    }
  }

  return (
    <form className="form-fgt-pass" onSubmit={validPassword}>
        {passwordError.length > 0 && <div style={{color:'red', fontWeight:'bold', margin:'10px'}}>{passwordError}</div>}
          <label className="input-label" htmlFor="newpassword">New Password</label>
          <input className="input-field" id="newpassword" onChange={(e) => setNewPassword(e.target.value)} value={newPassword} type="password"/>
          <label className="input-label" htmlFor="confriknewpassword">Confirm Password</label>
          <input className="input-field" id="confirmnewpassword" onChange={(e) => setNewPasswordConfirm(e.target.value)} value={newPasswordConfirm} type="password"/>
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