/*-------------------------------------------------------------------------
  Import dependencies
-------------------------------------------------------------------------*/
import React, {useState, useEffect} from 'react';
import '../Styles/GlobalStyles.css';
import '../Styles/AccountingScreen.css';
import API_URL from'../config.json';
import { useNavigate } from 'react-router-dom';

/*-------------------------------------------------------------------------
  Load Ticket Component
  Displays Load Ticket information
-------------------------------------------------------------------------*/
function LoadTicket(props) {
  let formattedDate = new Date(props.invoice.date);
  formattedDate = formattedDate.toLocaleDateString() + ' ' + formattedDate.toLocaleTimeString();
  const total = (props.invoice.rate * props.invoice.tons).toFixed(2);
  return (
    <div className="card-outer">
      <div className="card">
          <div className="truckNum">
            Truck #: {props.invoice.truck_number}
          </div>
          <div className="driver">
            Driver: {props.invoice.driver_id}
          </div>
        </div>
        <div className="card-inner">
        <div>
          Date: {formattedDate}
        </div>
        <div>
          Ticket #: {props.invoice.ticket_number}
        </div>
        <div>
          Order #: {props.invoice.order}
        </div>
        <div>
          Hours: {props.invoice.hours}
        </div>
        <div>
          Tons: {props.invoice.tons}
        </div>
        <div>
          Unit Price: ${props.invoice.rate}
        </div>
        <div>
          Total: ${total}
        </div>
      </div>
    </div>
  );
}

/*-------------------------------------------------------------------------
  Accounting Screen Component
-------------------------------------------------------------------------*/
export default function AccountingScreen(props){

  const apiURL = API_URL.API_URL;

  /*-------------------------------------------------------------------------
    State Variables
  -------------------------------------------------------------------------*/
  const [invoices, setInvoices] = useState([{}]);
  const [authenticated, setAuthenticated] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [filterOption, setFilterOption] = useState("driver_id");
  const [filterSearch, setFilterSearch] = useState("");
  const navigate = useNavigate();

  /*-------------------------------------------------------------------------
    useEffect() is a hook that takes a callback and a dependency array.
    The dependency array determines when the callback is executed, which when left
    empty is when the component mounts/unmounts. The callback creates an
    asynchronous fetch to the API which returns a response object. The JSON is
    obtained from the response and used to set the "invoices" state variable.
  -------------------------------------------------------------------------*/
  useEffect(() => {
    async function fetchInvoices() {
      const response = await fetch(`${apiURL}/invoices`, {credentials: 'include'});
      const newInvoices = await response.json();
      console.log(newInvoices);
      if (newInvoices.authenticated === false) {
        setAuthenticated(false);
        alert("not authorized");
        navigate("/");
        return;
      }
      setAuthenticated(true);
      setIsLoading(false);
      setInvoices(newInvoices);
    }
    fetchInvoices();
  }, []);

  const handleFilterOptionChange = (e) => {
    setFilterOption(e.target.value);
  }

  /*-------------------------------------------------------------------------
    Accounting Screen

    Map function is used on state variable to itterate through each
    invoice and create a TruckAccountingData component for each one. This
    is included in the jsx as an object, as denoted by the curly braces.

    Last Updated: Ryan Penrod 2/28/23
    Changes: Added filtering functionality for tickets
  -------------------------------------------------------------------------*/
  return (
    <div className="container">
      <h1>Invoices</h1>
        {isLoading && <div>Loading...</div>}
        {isLoading === false && <div className="cards">
        <div className="filter-options">
          Filter by:
          <form>
            <label className="filter-radio-button">
              Driver ID
              <input
                type="radio"
                name="filterOption"
                value="driver_id"
                checked={filterOption === "driver_id"}
                onChange={handleFilterOptionChange}
              />
            </label>
            <label className="filter-radio-button">
              Truck #
              <input
                type="radio"
                name="filterOption"
                value="truck_number"
                checked={filterOption === "truck_number"}
                onChange={handleFilterOptionChange}
              />
            </label>
            <label className="filter-radio-button">
              Date
              <input
                type="radio"
                name="filterOption"
                value="date"
                checked={filterOption === "date"}
                onChange={handleFilterOptionChange}
              />
            </label>
            <label className="filter-radio-button">
              Ticket #
              <input
                type="radio"
                name="filterOption"
                value="ticket_number"
                checked={filterOption === "ticket_number"}
                onChange={handleFilterOptionChange}
              />
            </label>
            <label className="filter-radio-button">
              Order #
              <input
                type="radio"
                name="filterOption"
                value="order"
                checked={filterOption === "order"}
                onChange={handleFilterOptionChange}
              />
            </label>
          </form>
        </div>
        <input
          type="text"
          placeholder="Search..."
          className="filter-search"
          onChange={(e) => setFilterSearch(e.target.value)}
        />
        {authenticated && invoices.filter((invoice) => invoice[filterOption].includes(filterSearch)).map((invoice, idx) => {
          return(
            <LoadTicket invoice={invoice} key={idx}/>
          );
        })}
        {!authenticated && <h1 style={{textAlign: 'center', color: 'red'}}>not authorized</h1>}
      </div>}
    </div>
  );

}