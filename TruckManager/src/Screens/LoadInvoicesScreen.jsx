import React, {useState, useEffect} from 'react';

import '../Styles/GlobalStyles.css';
import '../Styles/LoadInvoicesScreen.css';
import AppButton from '../Components/AppButton.jsx';
import AppInputField from '../Components/AppInputField.jsx';


//TODO: make date useState an actual date variable so it can work with the database
/*-------------------------------------------------------------------------
  Home Screen Component
-------------------------------------------------------------------------*/
export default function LoadInvoicesScreen({ navigation }){

  //this function will submit the input data to the backend to be uploaded to the database
  //TODO: 1.) submit the data - DONE - MXO
  //      2.) error handling/input handling
  const apiURL = 'http://localhost:5000'
  const handleSubmit = async () => {
    await fetch(`${apiURL}/invoices`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        date: date,
        driver: driver,
        truckNum: truckNum,
        description: description,
        orderNum: orderNum,
        ticketNum: ticketNum,
        tons: tons,
        hours: hours,
        unitPrice: unitPrice
      })
    });

    setDate("");
    setDriver("");
    setTruckNum("");
    setDescription("");
    setOrderNum("");
    setTicketNum("");
    setTons("");
    setHours("");
    setUnitPrice("");
  }

  const handleSubmitChecker = () => {
    if(date.length == 0 || driver.length == 0 || truckNum.length == 0 || description.length == 0 || orderNum.length == 0 
      || ticketNum.length == 0 || tons.length == 0 || hours.length == 0 || unitPrice.length == 0){
        setSubmitError("Every blank must be filled in!");
        return;
    }
    else if(submitError.length > 0) {
      setSubmitError("");
    }
    handleSubmit();
  }

  const [date, setDate] = useState(""); //look at using {varOne: new Data()}
  const [driver, setDriver] = useState("");
  const [truckNum, setTruckNum] = useState("");
  const [description, setDescription] = useState("");
  const [orderNum, setOrderNum] = useState("");
  const [ticketNum, setTicketNum] = useState("");
  const [tons, setTons] = useState(""); //database stores this as an int
  const [hours, setHours] = useState(""); //database stores this as an int
  const [unitPrice, setUnitPrice] = useState(""); //database stores this as an int
  const [submitError, setSubmitError] = useState("");

  /*-------------------------------------------------------------------------
    Home Screen
  -------------------------------------------------------------------------*/
  return (
      <div className="globalpageContainer">
        <div className="outerContainer">
          <input className="pageTitle">
            Load Ticket
          </input>
          {submitError.length > 0 && <input className={globalerrorinput}>{submitError}</input>}
          <div className="softContainer">
            <AppInputField placeholder="Date" onChangeinput={(inputInputBox) => setDate(inputInputBox)} value={date}/>
          </div>
          <div className="softContainer">
            <AppInputField placeholder="Driver" onChangeinput={(inputInputBox) => setDriver(inputInputBox)} value={driver}/>
          </div>
          <div className="softContainer">
            <AppInputField placeholder="Truck #" onChangeinput={(inputInputBox) => setTruckNum(inputInputBox)} value={truckNum}/>
          </div>
          <div className="softContainer">
            <AppInputField placeholder="Description" onChangeinput={(inputInputBox) => setDescription(inputInputBox)} value={description}/>
          </div>
          <div className="softContainer">
            <AppInputField placeholder="Order #" onChangeinput={(inputInputBox) => setOrderNum(inputInputBox)} value={orderNum}/>
          </div>
          <div className="softContainer">
            <AppInputField placeholder="Ticket #" onChangeinput={(inputInputBox) => setTicketNum(inputInputBox)} value={ticketNum}/>
          </div>
          <div className="softContainer">
            <AppInputField placeholder="Tons" onChangeinput={(inputInputBox) => setTons(inputInputBox)} value={tons}/>
          </div>
          <div className="softContainer">
            <AppInputField placeholder="Hours" onChangeinput={(inputInputBox) => setHours(inputInputBox)} value={hours}/>
          </div>
          <div className="softContainer">
            <AppInputField placeholder="Unit Price" onChangeinput={(inputInputBox) => setUnitPrice(inputInputBox)} value={unitPrice}/>
          </div>
          <AppButton input="Submit" onClick={() => handleSubmitChecker()} />
        </div>
      </div>
  );

};