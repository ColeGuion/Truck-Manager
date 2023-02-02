/*-------------------------------------------------------------------------
  Import dependencies
-------------------------------------------------------------------------*/
import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/GlobalStyles.css';
import '../Styles/ForgotPasswordScreen.css'

const APIURL = "http://localhost:5000";

function ResetPassword(props) {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
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
          username: props.globalUsername,
          newPassword: newPassword
        })
      });
      const res = await response.json()
      console.log(res);
      if(res.response) {
        navigate("/", {replace: true});
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

function ValidatingUsername(props) {

  const [usernameError, setUsernameError] = useState("");
  const [username, setUsername] = useState("");

  const validUsername = async (e) => {
    e.preventDefault();
    const response = await fetch(`${APIURL}/validusername/${username}`)
    const validated = await response.json();
    if(validated.response) {
      props.setValidatedUsername(true);
      props.setGlobalUsername(username);
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

/*
-Author: Mason Otto
-Last Modified: 1/23/2023
-Description: This is a React Component that is displayed to verify the OTP sent to the requesting user's email
-Return: HTML Code that allows the user to enter the OTP
TODO: Test code and refactor
*/ 
function VerifyOTP(props) {
  const [otpError, setOTPError] = useState("");
  const [oneTimePin, setOneTimePin] = useState("");

  /*
  -Author: Mason Otto
  -Last Modified: 1/23/2023
  -Description: This fetches to the backend API to generate a OTP and get the users email address
  -Return: N/A
  TODO: Test code and refactor
  */ 
  async function getOTPEmail(){
    const response = await fetch(`${APIURL}/requestotp`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: props.globalUsername
      })
    });
    const sentEmail = await response.json();
    if(sentEmail.response === "EMAIL SENT") {
      props.setSentOTPEmail(true);
      props.setEmailAddress(sentEmail.email);
    }
  }
  /*
  -Author: Mason Otto
  -Last Modified: 1/23/2023
  -Description: This fetches to the backend API to verify that the input OTP is correct
  -Return: N/A
  TODO: Test code and refactor
  */ 
  async function validateOTP(e) {
    e.preventDefault();
    const response = await fetch(`${APIURL}/verifyotp`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: props.globalUsername,
        otp: oneTimePin,
      })
    });
    const verified = await response.json();
    if(verified.response === "VERIFIED") {
      props.setIsValidated(true);
    }
    else {
      setOTPError(`Invalid One Time Pin! Check email sent to ${props.emailAddress}`);
    }
  }
  if(!props.sentOTPEmail) {
    getOTPEmail();
  }
  
  
  return (
    <>
      {props.sentOTPEmail && 
        <div className="container">
          {!(otpError.length > 0) && <p>A One Time Pin was sent to {props.emailAddress}</p>}
          {otpError.length > 0 && <div style={{color:'red', fontWeight:'bold', margin:'10px'}}>{otpError}</div>}
          <form className="form-verify-otp" onSubmit={validateOTP}>
            <label style={{width: "100%"}} htmlFor="otp">
              Enter One Time Pin
            </label>
            <input className="input-field" id="otp" type="number" onChange={(e) => {if(e.target.value.length <= 6) setOneTimePin(e.target.value)}} value={oneTimePin}/>
            
            <button className="login-btn">Verify</button>
          </form>
        </div>}
    </>
  );
}
/*-------------------------------------------------------------------------
  Forgot Password Component
-------------------------------------------------------------------------*/
export default function ForgotPasswordScreen(){
  const [validatedUsername, setValidatedUsername] = useState(false);
  const [globalUsername, setGlobalUsername] = useState("");
  const [isValidated, setIsValidated] = useState(false);
  const [emailAddress, setEmailAddress] = useState("");
  const [sentOTPEmail, setSentOTPEmail] = useState(false);

  /*-------------------------------------------------------------------------
    Forgot Password Screen
  -------------------------------------------------------------------------*/
  return(
    <div className="container">
        <h1>Forgot Password</h1>
        {validatedUsername === false && <ValidatingUsername setGlobalUsername={setGlobalUsername} setValidatedUsername={setValidatedUsername}/>}
        {validatedUsername === true && isValidated === true && <ResetPassword globalUsername={globalUsername}/>}
        {validatedUsername === true && isValidated === false && <VerifyOTP globalUsername={globalUsername} emailAddress={emailAddress} setIsValidated={setIsValidated} setEmailAddress={setEmailAddress} sentOTPEmail={sentOTPEmail} setSentOTPEmail={setSentOTPEmail}/>}
    </div>
  )
    
}