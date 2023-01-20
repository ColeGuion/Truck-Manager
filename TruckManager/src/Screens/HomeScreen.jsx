import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/GlobalStyles.css';
import '../Styles/HomeScreen.css'

/*-------------------------------------------------------------------------
  Home Screen Component
-------------------------------------------------------------------------*/
export default function HomeScreen(){
  const navigate = useNavigate();
  /*-------------------------------------------------------------------------
    Home Screen
  -------------------------------------------------------------------------*/
  return (
      <div className="globalpageContainer">
        <button className="globalforgotPassword" onClick = { () => navigate("/user") }>
          User Profile
        </button>
        <h1 className="globalpageTitle">Truck Manager</h1>
        <button className="globalbutton" onClick = { () => navigate("/loadinvoice") }>
          Submit Load Ticket
        </button>
        <button className="globalbutton" onClick = { () => navigate("/accounting") }>
          Invoices
        </button>
      </div>
  );

}