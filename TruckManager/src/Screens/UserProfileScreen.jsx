/*-------------------------------------------------------------------------
  Import dependencies
-------------------------------------------------------------------------*/
import React, {useState, useEffect} from 'react';
import '../Styles/GlobalStyles.css';
import '../Styles/UserProfileScreen.css';
import API_URL from'../config.json';

/*-------------------------------------------------------------------------
  User Profile Component
-------------------------------------------------------------------------*/
export default function UserProfileScreen({ navigation }){
  const APIURL = API_URL.API_URL;

  const [currentUser, setCurrentUser] = useState({});
  const [authenticated, setAuthenticated] = useState(true);
  const [updateInfo, setUpdateInfo] = useState(false);

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
        setCurrentUser(newCurrentUser);
    }
    fetchCurrentUser();
},[])

  /*
    Author: Mason Otto
    Creation Date: 2/20/2023
    Last Modified: 2/20/2023
    Description: This will update the values in currentUser as values are changed
  */
  function handleChange(e) {
    let copyOfUser = {...currentUser};
    copyOfUser[e.target.id] = e.target.value;
    setCurrentUser(currentUser => ({
      ...copyOfUser
    }));
  }

  /*
    Author: Mason Otto
    Creation Date: 2/21/2023
    LastModified: 2/21/2023
    Description: This will make a put request to the backend api to update the current users information
  */
  async function saveUserInfo() {
    //TODO: make put request to update current users information
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
      console.log("Failed!");
    }
    else if(message.message === "UPDATED") {
      console.log("Updated!");
    }
  }

  /*-------------------------------------------------------------------------
    User Profile Screen
  -------------------------------------------------------------------------*/
  return (
      <div className="page-container">
        <h1>User Information</h1>
        {!updateInfo &&
        <div className="info-container">
          <span className="info">Name: {currentUser.name || "N/A"}</span>
          <span className="info">Employee ID: {currentUser.employeeId || "N/A"}</span>
          <span className="info">Email: {currentUser.email || "N/A"}</span>
          <span className="info">Street: {currentUser.street || "N/A"}</span>
          <span className="info">State: {currentUser.state || "N/A"}</span>
          <span className="info">City: {currentUser.city || "N/A"}</span>
          <span className="info">Zipcode: {currentUser.zipcode || "N/A"}</span>
          <span className="info">Phone Number: {currentUser.phone || "N/A"}</span>
          <span className="info">Hire Date: {currentUser.hireDate || "N/A"}</span>
        </div>}
        {updateInfo &&
        <div className="update-container">
          <div className="info-container">
            <span className="info">Name:</span>
            <span className="info">Employee ID:</span>
            <span className="info">Email:</span>
            <span className="info">Street:</span>
            <span className="info">State:</span>
            <span className="info">City:</span>
            <span className="info">Zipcode:</span>
            <span className="info">Phone Number:</span>
            <span className="info">Hire Date:</span>
          </div>
          <div className="info-container">
            <input className="info" id="name" readOnly value={currentUser.name}/>
            <input className="info" id="employeeId" readOnly value={currentUser.employeeId}/>
            <input className="info" id="email" readOnly value={currentUser.email}/>
            <input className="info" id="street" onChange={handleChange} value={currentUser.street}/>
            <input className="info" id="state" onChange={handleChange} value={currentUser.state}/>
            <input className="info" id="city" onChange={handleChange} value={currentUser.city}/>
            <input className="info" id="zipcode" onChange={handleChange} value={currentUser.zipcode}/>
            <input className="info" id="phone" onChange={handleChange} value={currentUser.phone}/>
            <input className="info" id="hireDate" readOnly value={currentUser.hireDate}/>
          </div>
        </div>
        }
        {updateInfo && <div>
        <button onClick={saveUserInfo}>Save</button>
        <button onClick={() => {setUpdateInfo(false)}}>Cancel</button>
        </div>}
        {!updateInfo && <button onClick={() => {setUpdateInfo(true)}}>Update</button>}
      </div>
  );

}