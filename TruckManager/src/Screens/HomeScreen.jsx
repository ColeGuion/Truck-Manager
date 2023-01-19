import React, {useState, useEffect} from 'react';
import '../Styles/GlobalStyles.css';
import '../Styles/HomeScreen.css'

/*-------------------------------------------------------------------------
  Home Screen Component
-------------------------------------------------------------------------*/
export default function HomeScreen({ navigation }){

  /*-------------------------------------------------------------------------
    Home Screen
  -------------------------------------------------------------------------*/
  return (
      <div className="globalpageContainer">
        <button className="globalforgotPassword" onClick = { () => navigation.navigate("UserProfileScreen") }>
          <input>User Profile</input>
        </button>
        <input className="globalpageTitle">Truck Manager</input>
        <button className="globalbutton" onClick = { () => navigation.navigate("LoadInvoicesScreen") }>
          <input className="globallogininput">Submit Load Ticket</input>
        </button>
        <button className="globalbutton" onClick = { () => navigation.navigate("AccountingScreen") }>
          <input className="globallogininput">Invoices</input>
        </button>
      </div>
  );

}