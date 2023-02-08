/*-------------------------------------------------------------------------
  Import dependencies
-------------------------------------------------------------------------*/
import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/GlobalStyles.css';
import '../Styles/HomeScreen.css';
import API_URL from'../config.json';

/*-------------------------------------------------------------------------
  Home Screen Component
-------------------------------------------------------------------------*/
export default function HomeScreen(){
  const [currentUser, setCurrentUser] = useState({});
  const [authenticated, setAuthenticated] = useState(true);
  const navigate = useNavigate();
  const APIURL = API_URL.API_URL;
    useEffect(() => {
        async function fetchCurrentUser() {
            const response = await fetch(`${APIURL}/user`,{credentials: 'include'});
            const newCurrentUser = await response.json()
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
    Home Screen
  -------------------------------------------------------------------------*/
  return (
      <div className="container">
        {authenticated && <>
          <div className="user-profile-link" onClick = { () => navigate("/user") }>
            User Profile
          </div>
          <h1>Truck Manager</h1>
          <button className="home-btns" onClick = { () => navigate("/loadinvoice") }>
            Submit Load Ticket
          </button>
          <button className="home-btns" onClick = { () => navigate("/accounting") }>
            Invoices
          </button>
        </>}
        {!authenticated && <h1 style={{textAlign: 'center', color: 'red'}}>not authorized</h1>}
      </div>
  );
}