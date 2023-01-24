import React, {useState, useEffect} from 'react';
import '../Styles/GlobalStyles.css';
import '../Styles/AccountingScreen.css';

/*-------------------------------------------------------------------------
  Accounting Data Component

  This will display every invoice and all the data it has.

  TODO: refactor so it will only display data under correct truck number.
-------------------------------------------------------------------------*/
function TruckAccoutingData({invoice}) {
  return (
    <div className="card-outer">
      <div className="card">
        <div className="truckNum">
          Truck #: {invoice.truck_number}
        </div>
        <div className="driver">
          Driver: {invoice.driver_id}
        </div>
      </div>
      <InvoiceData invoice={invoice}/>
      <div className="card-bottom">
        <div className="truckTotal">
          Truck Total:
        </div>
      </div>
    </div>
  );
}
/*-------------------------------------------------------------------------
  Invoice Data Component

  Displays date, ticket_number, order, hours, tons, and rate
-------------------------------------------------------------------------*/
function InvoiceData({invoice}) {
  let formattedDate = new Date(invoice.date);
  formattedDate = formattedDate.toLocaleDateString() + ' ' + formattedDate.toLocaleTimeString();
  return (
    <div className="card-inner">
        <div>
          Date: {formattedDate}
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
  Accounting Screen Component
-------------------------------------------------------------------------*/
export default function AccountingScreen(props){

  const apiURL = 'http://localhost:5000'

  /*-------------------------------------------------------------------------
    Create "invoices" state variable and function to update it
  -------------------------------------------------------------------------*/
  const [invoices, setInvoices] = useState([{}]);

  /*-------------------------------------------------------------------------
    useEffect() is a hook that takes a callback and a dependency array.
    The dependency array determines when the callback is executed, which when left
    empty is when the component mounts/unmounts. The callback creates an
    asynchronous fetch to the API which returns a response object. The JSON is
    obtained from the response and used to set the "invoices" state variable.
  -------------------------------------------------------------------------*/
  useEffect(() => {
    async function fetchInvoices() {
      const response = await fetch(`${apiURL}/invoices`);
      const newInvoices = await response.json();
      setInvoices(newInvoices);
    }
    fetchInvoices();
  }, []);

  /*-------------------------------------------------------------------------
    Accounting Screen

    Map function is used on state variable to itterate through each
    invoice and create a component for each one. This is included in the
    jsx as an object, as denoted by the curly braces.
  -------------------------------------------------------------------------*/
  return (
    <div className="container">
      <h1>Invoices</h1>
        <div className="cards">
        {invoices.map((invoice, idx) => {
          return(
            <TruckAccoutingData invoice={invoice} key={idx}/>
          );
        })}
      </div>
    </div>
  );

}