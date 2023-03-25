/*-------------------------------------------------------------------------
  Import dependencies
-------------------------------------------------------------------------*/
import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/GlobalStyles.css';
import '../Styles/HomeScreen.css';
import API_URL from'../config.json';
import logo from '../Logo_Files/png/logo-header.png'

/*-------------------------------------------------------------------------
  Import Icons
-------------------------------------------------------------------------*/
// React Icons Library: https://react-icons.github.io/react-icons
import { HiOutlineLogout } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";
import { TiArrowBack,TiArrowBackOutline } from "react-icons/ti";



/*-------------------------------------------------------------------------
  Home Screen Component
-------------------------------------------------------------------------*/
export default function HomeScreen(){
  const [currentUser, setCurrentUser] = useState({});
  const [authenticated, setAuthenticated] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
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
          if(newCurrentUser.user.accountType === "Admin") {
            setIsAdmin(true);
          }
          else {
            setIsAdmin(false);
          }
      }
      fetchCurrentUser();
  },[])

  async function logout() {
    console.log("here");
    const response = await fetch(`${APIURL}/logout`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });
      const loggedOut = await response.json();
      if(loggedOut.response === "logged out") {
        navigate("/");
      }
  }
  /*-------------------------------------------------------------------------
    Home Screen
  -------------------------------------------------------------------------*/
  // <img className="logo-head" src={logo} alt="Logo" />
  return (
      <div className="container">
        <img className="Logo-header2" src={logo} alt="Logo" />
        <div className="back-button" onClick = { () => navigate(-1) }>
          <TiArrowBackOutline className="icon1" size="70px" />
          <TiArrowBack className="icon2" size="70px" />
        </div>

        {authenticated && <>
          <div className="user-options">
            <button className="option-button" onClick = { () => navigate("/user") }>
              Profile <CgProfile />
            </button>  
            <button className="option-button" onClick = {logout}>
              Logout <HiOutlineLogout />
            </button>
          </div>
          
          <h1>Truck Manager</h1>
          <div>
            <button className="home-btns" onClick = { () => navigate("/loadinvoice") }>
              Submit Load Ticket
            </button>
            <button className="home-btns" onClick = { () => navigate("/accounting") }>
              Invoices
            </button>
            {isAdmin && <button className="home-btns" onClick = { () => navigate("/addemployee") }>
              Add Employee
            </button>}
            {isAdmin && <button className="home-btns" onClick = { () => navigate("/employees") }>
              View Employees
            </button>}
          </div>
          
        </>}
        {!authenticated && <h1 style={{textAlign: 'center', color: 'red'}}>not authorized</h1>}
      </div>
  );
}