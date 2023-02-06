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
  const APIURL = API_URL.API_URL;
    useEffect(() => {
        async function fetchCurrentUser() {
            const response = await fetch(`${APIURL}/user`,{credentials: 'include'});
            const newCurrentUser = await response.json()
            setCurrentUser(newCurrentUser);
        }
        fetchCurrentUser();
    },[])

  const navigate = useNavigate();
  /*-------------------------------------------------------------------------
    Home Screen
  -------------------------------------------------------------------------*/
  return (
      <div className="container">
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
      </div>
  );
}