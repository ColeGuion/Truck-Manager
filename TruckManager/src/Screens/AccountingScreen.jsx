import React, {useState, useEffect} from 'react';
import '../Styles/GlobalStyles.css';
import '../AccountingScreen.css';

//This will display every invoice and all the data it has
//TODO: refactor so it will only display data under correct truck number.
function TruckAccoutingData({invoice}) {
  return (
    <div className="softContainer">
      <div className="cardHeader">
        <input className="truckNum">
          Truck #: {invoice.truck_number}
        </input>
        <input className="driver">
          Driver: {invoice.driver_id}
        </input>
      </div>
      <InvoiceData invoice={invoice}/>
      <div className="cardFooter">
        <input className="truckTotal">
          Truck Total:
        </input>
      </div>
    </div>
  );
}
//This will display date, ticket_number, order, hours, tons, and rate
function InvoiceData({invoice}) {
  return (
    <div className="cardBody">
        <input>
          Date: {invoice.date}
        </input>
        <input>
          Ticket #: {invoice.ticket_number}
        </input>
        <input>
          Order #: {invoice.order}
        </input>
        <input>
          Hours: {invoice.hours}
        </input>
        <input>
          Tons: {invoice.tons}
        </input>
        <input>
          Unit Price: ${invoice.rate}
        </input>
        <input>
          Total: ${(invoice.rate * invoice.tons).toFixed(2)}
        </input>
      </div>
  );
}

/*-------------------------------------------------------------------------
  Home Screen Component
-------------------------------------------------------------------------*/
export default function AccountingScreen(props){

  const apiURL = 'http://localhost:5000'
  const [invoices, setInvoices] = useState([{}]);

  useEffect(() => {
    async function fetchInvoices() {
      const response = await fetch(`${apiURL}/invoices`);
      const newInvoices = await response.json();
      setInvoices(newInvoices);
    }
    fetchInvoices();
    
      
  },[])
  /*-------------------------------------------------------------------------
    Home Screen
  -------------------------------------------------------------------------*/
  return (
    <div className="globalpageContainer">
      <div className="outerContainer">
        <input className="title">
          Invoices
        </input>
        {invoices.map((invoice) => {
          return(
            <TruckAccoutingData invoice={invoice}/>
          );
        })}
      </div>
    </div>
  );

}