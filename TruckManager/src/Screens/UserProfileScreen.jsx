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

  /*-------------------------------------------------------------------------
    User Profile Screen
  -------------------------------------------------------------------------*/
  return (
      <div className="page-container">
        {!updateInfo &&
        <div className="info-container">
          <span className="info">Name: {(currentUser.firstName + " " + currentUser.lastName) || "N/A"}</span>
          <span className="info">Employee ID: {currentUser.employeeId || "N/A"}</span>
          <span className="info">Email: {currentUser.email || "N/A"}</span>
          <span className="info">State: {currentUser.state || "N/A"}</span>
          <span className="info">City: {currentUser.city || "N/A"}</span>
          <span className="info">Zipcode: {currentUser.zipcode || "N/A"}</span>
          <span className="info">Phone Number: {currentUser.phone || "N/A"}</span>
          <span className="info">Hire Date: {currentUser.hireDate || "N/A"}</span>
        </div>}
        {updateInfo &&
        <div className="info-container">
          <input className="info"/>
          <input className="info"/>
          <input className="info"/>
          <input className="info"/>
          <input className="info"/>
          <input className="info"/>
          <input className="info"/>
          <input className="info"/>
        </div>}
      </div>
  );

}