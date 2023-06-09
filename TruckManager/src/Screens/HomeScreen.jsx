/*-------------------------------------------------------------------------
  Import dependencies
-------------------------------------------------------------------------*/
import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/GlobalStyles.css';
import '../Styles/HomeScreen.css';
import API_URL from'../config.json';
import logo from '../Logo_Files/png/logo-no-background.png'

/*-------------------------------------------------------------------------
  Import Icons
-------------------------------------------------------------------------*/
// React Icons Library: https://react-icons.github.io/react-icons
import { HiOutlineLogout } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";
import { TiArrowLeftOutline,TiArrowLeftThick } from "react-icons/ti";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { TfiReceipt } from "react-icons/tfi";
import { RxAvatar } from "react-icons/rx";
import { MdAddCircleOutline } from "react-icons/md";


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
  return (
      <div className="container">
        {authenticated && <>
          <div className="user-options">
            <button className="option-button" onClick = { () => navigate("/user") }>
              <CgProfile size="20px"/><br/> Profile
              
            </button>  
            <button className="option-button" onClick = {logout}>
              <HiOutlineLogout size="20px"/><br/> Sign Out
            </button>
          </div>
          <img className="logo-header2" src={logo} alt="Logo" />
            <div className="home-btns-container">
            <button className="home-btns" onClick = { () => navigate("/loadinvoice") }>
              Submit Load Ticket
              <br/><br/>
              <TfiReceipt size="70px"/>
            </button>
            <button className="home-btns" onClick = { () => navigate("/accounting") }>
              Invoices
              <br/><br/>
              <FaFileInvoiceDollar size="70px"/>
            </button>
            {isAdmin && <button className="home-btns" onClick = { () => navigate("/addemployee") }>
              Add Employee
              <br/><br/>
              <MdAddCircleOutline size="70px"/>
            </button>}
            {isAdmin && <button className="home-btns" onClick = { () => navigate("/employees") }>
              View Employees
              <br/><br/>
              <RxAvatar size="70px"/>
            </button>}
          </div>
          
        </>}
        {!authenticated && <h1 style={{textAlign: 'center', color: 'red'}}>not authorized</h1>}
      </div>
  );
}