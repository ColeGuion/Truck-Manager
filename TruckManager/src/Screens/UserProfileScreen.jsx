/*-------------------------------------------------------------------------
  Import dependencies
-------------------------------------------------------------------------*/
import React, {useState, useEffect} from 'react';
import '../Styles/GlobalStyles.css';
import '../Styles/UserProfileScreen.css';
import API_URL from'../config.json';
import { useNavigate } from 'react-router-dom';
import { TiArrowBack,TiArrowBackOutline } from "react-icons/ti";
import logo from '../Logo_Files/png/logo-header.png'

/*-------------------------------------------------------------------------
  User Profile Component
-------------------------------------------------------------------------*/
export default function UserProfileScreen({ navigation }){
  const APIURL = API_URL.API_URL;

  const [currentUser, setCurrentUser] = useState({});
  const [authenticated, setAuthenticated] = useState(true);
  const [updateInfo, setUpdateInfo] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();


  /*
    Author: Mason Otto
    Creation Date: 2/20/2023
    Last Modified: 2/20/2023
    Description: This will run once on mount and will fetch all of the data for the current user
  */
  useEffect(() => {
    async function fetchCurrentUser() {
        const response = await fetch(`${APIURL}/userdata`,{credentials: 'include'});
        const newCurrentUser = await response.json();
        if (newCurrentUser.authenticated === false) {
          setAuthenticated(false);
          alert("not authorized"); 
          navigate("/");
          return;
        }
        //this formats the date to show in the format mm/dd/yyyy
        let copyOfCurrentUser = {...newCurrentUser};
        const splitDate = copyOfCurrentUser.hireDate.split(" ")[0].split("-");
        const formattedDate = splitDate[1] + "/" + splitDate[2] + "/" + splitDate[0]; 
        copyOfCurrentUser.hireDate = formattedDate;

        setCurrentUser(copyOfCurrentUser);
        setLoading(false);
        setErrorMessage("");
    }
    fetchCurrentUser();
  },[])

  /*
    Author: Mason Otto
    Creation Date: 2/20/2023
    Last Modified: 2/26/2023
    Modified By: Mason Otto
    Modification: Added regex to check to make sure only numbers are input on zipcode and phone
    Description: This will update the values in currentUser as values are changed
  */
  function handleChange(e) {
    if(e.target.id === "phone" || e.target.id === "zipcode") {
      const numbersOnlyRegex = /^[0-9]*$/;
      if(!numbersOnlyRegex.test(e.target.value)) {
        return;
      }
    }
    let copyOfUser = {...currentUser};
    copyOfUser[e.target.id] = e.target.value;
    setCurrentUser(currentUser => ({
      ...copyOfUser
    }));
  }

  /*
    Author: Mason Otto
    Creation Date: 2/21/2023
    Last Modified: 2/26/2023
    Modified By: Mason Otto
    Recent Modifications: Added checks to make sure all fields are filled and that zipcode and phone number are of proper length
      Added an alert to alert successful updates
    Description: This will make a put request to the backend api to update the current users information
  */
  async function saveUserInfo() {
    if(currentUser.state.length === 0 || currentUser.city.length === 0 || currentUser.street.length === 0 || currentUser.zipcode.length === 0 || currentUser.phone.length === 0) {
      setErrorMessage("All fields must be filled!");
      return;
    }
    if(currentUser.phone.length < 10) {
      setErrorMessage("Phone number must be 10 digits");
      return;
    }
    if(currentUser.zipcode.length < 5) {
      setErrorMessage("Zipcode must be 5 digits");
      return;
    }
    const response = await fetch(`${APIURL}/updateuser`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
          state: currentUser.state,
          city: currentUser.city,
          street: currentUser.street,
          zipcode: currentUser.zipcode,
          phone: currentUser.phone,
      })
    });
    const message = await response.json(); 
    if(message.message === "FAILED") {
      setErrorMessage("Failed to update, try again");
    }
    else if(message.message === "UPDATED") {
      setErrorMessage("");
      alert("Update Successful");
      setUpdateInfo(false);
    }
  }

  /*-------------------------------------------------------------------------
    User Profile Screen
  -------------------------------------------------------------------------*/
  
  return (
      <div className="page-container">
        <img className="Logo-header" src={logo} alt="Logo" />
        <div className="back-button" onClick = { () => navigate(-1) }>
          <TiArrowBackOutline className="icon1" size="70px" />
          <TiArrowBack className="icon2" size="70px" />
        </div>

        <h1>User Information</h1>
        {loading && <div>Loading...</div>}
        {errorMessage.length > 0 && <div id="error" style={{color:'red', fontWeight:'bold', margin:'10px'}}>{errorMessage}</div>}
        {successMessage.length > 0 && <div id="error" style={{color:'green', fontWeight:'bold', margin:'10px'}}>{successMessage}</div>}
        {!updateInfo && !loading &&
        <div className="info-container">
          <span className="info">Name:  {currentUser.name || "N/A"}</span>
          <span className="info">Employee ID:  {currentUser.employeeId || "N/A"}</span>
          <span className="info">Email:  {currentUser.email || "N/A"}</span>
          <span className="info">Street:  {currentUser.street || "N/A"}</span>
          <span className="info">State:  {currentUser.state || "N/A"}</span>
          <span className="info">City:  {currentUser.city || "N/A"}</span>
          <span className="info">Zipcode:  {currentUser.zipcode || "N/A"}</span>
          <span className="info">Phone Number:  {currentUser.phone || "N/A"}</span>
          <span className="info">Hire Date:  {currentUser.hireDate || "N/A"}</span>
        </div>}
        {updateInfo && !loading &&
        <div className="update-container">
          <div className="info-container-left">
            <label className="info" htmlFor="name">Name:</label>
            <label className="info" htmlFor="employeeId">Employee ID:</label>
            <label className="info" htmlFor="email">Email:</label>
            <label className="info" htmlFor="street">Street:</label>
            <label className="info" htmlFor="state">State:</label>
            <label className="info" htmlFor="city">City:</label>
            <label className="info" htmlFor="zipcode">Zipcode:</label>
            <label className="info" htmlFor="phone">Phone Number:</label>
            <label className="info" htmlFor="hireDate">Hire Date:</label>
          </div>
          <div className="info-container-right">
            <input className="info-read-only" id="name" readOnly value={currentUser.name}/>
            <input className="info-read-only" id="employeeId" readOnly value={currentUser.employeeId}/>
            <input className="info-read-only" id="email" readOnly value={currentUser.email}/>
            <input className="info-update" id="street" onChange={handleChange} value={currentUser.street}/>
            <select className="info-select" id="state" maxLength={2} onChange={handleChange} value={currentUser.state}>
              <option value="AL">AL</option>
              <option value="AK">AK</option>
              <option value="AR">AR</option>
              <option value="AZ">AZ</option>
              <option value="CA">CA</option>
              <option value="CO">CO</option>
              <option value="CT">CT</option>
              <option value="DC">DC</option>
              <option value="DE">DE</option>
              <option value="FL">FL</option>
              <option value="GA">GA</option>
              <option value="HI">HI</option>
              <option value="IA">IA</option>
              <option value="ID">ID</option>
              <option value="IL">IL</option>
              <option value="IN">IN</option>
              <option value="KS">KS</option>
              <option value="KY">KY</option>
              <option value="LA">LA</option>
              <option value="MA">MA</option>
              <option value="MD">MD</option>
              <option value="ME">ME</option>
              <option value="MI">MI</option>
              <option value="MN">MN</option>
              <option value="MO">MO</option>
              <option value="MS">MS</option>
              <option value="MT">MT</option>
              <option value="NC">NC</option>
              <option value="NE">NE</option>
              <option value="NH">NH</option>
              <option value="NJ">NJ</option>
              <option value="NM">NM</option>
              <option value="NV">NV</option>
              <option value="NY">NY</option>
              <option value="ND">ND</option>
              <option value="OH">OH</option>
              <option value="OK">OK</option>
              <option value="OR">OR</option>
              <option value="PA">PA</option>
              <option value="RI">RI</option>
              <option value="SC">SC</option>
              <option value="SD">SD</option>
              <option value="TN">TN</option>
              <option value="TX">TX</option>
              <option value="UT">UT</option>
              <option value="VT">VT</option>
              <option value="VA">VA</option>
              <option value="WA">WA</option>
              <option value="WI">WI</option>
              <option value="WV">WV</option>
              <option value="WY">WY</option>
            </select>
            <input className="info-update" id="city" onChange={handleChange} value={currentUser.city}/>
            <input className="info-update" id="zipcode" maxLength={5} onChange={handleChange} value={currentUser.zipcode}/>
            <input className="info-update" id="phone" type="tel" maxLength={10} onChange={handleChange} value={currentUser.phone}/>
            <input className="info-read-only" id="hireDate" readOnly value={currentUser.hireDate}/>
          </div>
        </div>
        }
        {updateInfo && !loading && <div>
        <button onClick={saveUserInfo}>Save</button>
        <button onClick={() => {setUpdateInfo(false); setErrorMessage("");}}>Cancel</button>
        </div>}
        {!updateInfo && !loading && <button onClick={() => {setUpdateInfo(true)}}>Update</button>}


      </div>
      
  );

}