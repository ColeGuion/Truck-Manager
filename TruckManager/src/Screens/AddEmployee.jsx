/*-------------------------------------------------------------------------
  Import dependencies
-------------------------------------------------------------------------*/
import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/GlobalStyles.css';
import '../Styles/RegistrationScreen.css';
import API_URL from'../config.json';

/*-------------------------------------------------------------------------
  Registration Component
-------------------------------------------------------------------------*/
export default function AddEmployee(){
  /*-------------------------------------------------------------------------
    Constants
  -------------------------------------------------------------------------*/
  const navigate = useNavigate();

  /*-------------------------------------------------------------------------
    React States
  -------------------------------------------------------------------------*/
  const [employeeId, setEmployeeId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [accountType, setAccountType] = useState("Employee");
  const [submitError, setSubmitError] = useState("");

  /*-------------------------------------------------------------------------
    Methods
  -------------------------------------------------------------------------*/
  const apiURL = API_URL.API_URL;
  const handleRegister = async () => {
    //handle adding user information into the database
    const response = await fetch(`${apiURL}/newemployee`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        employeeId: employeeId,
        firstName: firstName,
        lastName: lastName,
        accountType: accountType,
      })
    });
    const created = await response.json();
    if(created.message === "FAILED") {
      setSubmitError("Failed to create account, try again");
    }
    else {
      navigate("/..");
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(employeeId.length == 0 || firstName.length == 0 || lastName.length == 0 || accountType.length == 0){
        setSubmitError("Every blank must be filled in!");
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
        <h1>Add Employee</h1>
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
            <label className="input-label" htmlFor='firstname'>First Name</label>
            <input
                className='input-field'
                id='firstname'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                autoComplete="off"
            />
            <label className="input-label" htmlFor='lastname'>Last Name</label>
            <input
                className='input-field'
                id='lastname'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                autoComplete="off"
            />
            <label className="input-label" htmlFor='accounttype'>Account Type</label>
            <select 
                className='input-field'
                id='accounttype'
                onChange={(e) => setAccountType(e.target.value)}
            >
                <option value="Employee">Employee</option>
                <option value="Admin">Admin</option>
            </select>
            <button className="register-btn" type="submit">Submit</button>
        </form>
      </div>
  )

}
