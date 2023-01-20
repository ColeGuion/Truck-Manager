import React, {useState, useEffect} from 'react';
import '../Styles/GlobalStyles.css';
import '../Styles/AccountingScreen.css';

//This will display every invoice and all the data it has
//TODO: refactor so it will only display data under correct truck number.
function TruckAccoutingData({invoice}) {
  return (
    <div className="softContainer" style={{border: '2px solid', marginBottom: "20px"}}>
      <div className="cardHeader">
        <div className="truckNum">
          Truck #: {invoice.truck_number}
        </div>
        <div className="driver">
          Driver: {invoice.driver_id}
        </div>
      </div>
      <InvoiceData invoice={invoice}/>
      <div className="cardFooter">
        <div className="truckTotal">
          Truck Total:
        </div>
      </div>
    </div>
  );
}
//This will display date, ticket_number, order, hours, tons, and rate
function InvoiceData({invoice}) {
  return (
    <div className="cardBody">
        <div>
          Date: {invoice.date}
        </div>
        <div>
          Ticket #: {invoice.ticket_number}
        </div>
        <div>
          Order #: {invoice.order}
        </div>
        <div>
          Hours: {invoice.hours}
        </div>
        <div>
          Tons: {invoice.tons}
        </div>
        <div>
          Unit Price: ${invoice.rate}
        </div>
        <div>
          Total: ${(invoice.rate * invoice.tons).toFixed(2)}
        </div>
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
        <h1 className="title">
          Invoices
        </h1>
        {invoices.map((invoice, idx) => {
          return(
            <TruckAccoutingData invoice={invoice} key={idx}/>
          );
        })}
      </div>
    </div>
  );

}