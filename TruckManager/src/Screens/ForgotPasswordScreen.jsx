import React, {useState} from 'react';
import AppInputField from '../Components/AppInputField.jsx';
import AppButton from '../Components/AppButton.jsx';
import '../Styles/GlobalStyles.css';
import '../Styles/ForgotPasswordScreen.css'

/*-------------------------------------------------------------------------
  Forgot Password Component"
-------------------------------------------------------------------------*/
export default function ForgotPasswordScreen({ navigation }){
/*TODO: write simple function to check for a valid usernamethen display a different 
        UI for validation (probably via email), then display reset password UI
*/

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
      {usernameError.length > 0 && <input className={globalerrorinput}>{usernameError}</input>}
      <div className="softContainer">
        <AppInputField placeholder="Username*" onChangeinput={(inputInputBox) => setUsername(inputInputBox)} value={username} onKeyPress={handleKeyDown}/>
      </div>
      <AppButton input="Forgot Password" onClick={() => validUsername()}/>
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
      navigation.navigate("SignInScreen");
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
        {passwordError.length > 0 && <input className={globalerrorinput}>{passwordError}</input>}
        <div className="softContainer">
          <AppInputField placeholder="New Password*" onChangeinput={(inputInputBox) => setNewPassword(inputInputBox)} value={newPassword} type="password" onKeyPress={handleKeyDown}/>
        </div>
        <div className="softContainer">
          <AppInputField placeholder="Confirm New Password*" onChangeinput={(inputInputBox) => setNewPasswordConfirm(inputInputBox)} value={newPasswordConfirm} type="password" onKeyPress={handleKeyDown}/>
        </div>
        <AppButton input="Reset Password" onClick={() => validPassword()}/>
      </div>
  );
}

  /*-------------------------------------------------------------------------
    Forgot Password Screen
  -------------------------------------------------------------------------*/
  //TODO: create and update specific to forgot password...
  return(
    <div className="globalpageContainer">
        <input className="globalpageTitle">Forgot Password</input>
        {validatedUsername === false && <ValidatingUsername />}
        {validatedUsername === true && <ResetPassword />}
    </div>
  )
    
}