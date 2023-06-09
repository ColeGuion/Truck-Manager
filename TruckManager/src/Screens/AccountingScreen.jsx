/*-------------------------------------------------------------------------
  Import dependencies
-------------------------------------------------------------------------*/
import React, {useState, useEffect} from 'react';
import '../Styles/GlobalStyles.css';
import '../Styles/AccountingScreen.css';
import API_URL from'../config.json';
import { useNavigate } from 'react-router-dom';
import { TiArrowLeftOutline,TiArrowLeftThick } from "react-icons/ti";
import { AiFillDelete } from "react-icons/ai";
import logo from '../Logo_Files/png/logo-no-background.png'

/*-------------------------------------------------------------------------
  Load Ticket Component
  Displays Load Ticket information
-------------------------------------------------------------------------*/
function LoadTicket(props) {
  let formattedDate = new Date(props.invoice.date);
  formattedDate = formattedDate.toLocaleDateString() + ' ' + formattedDate.toLocaleTimeString();
  const total = (props.invoice.rate * props.invoice.tons).toFixed(2);
  const navigate = useNavigate();

  /*
    Author: Mason Otto
    Created: 3/1/2023
    Description: makes request to backend to delete this load ticket
  */
  async function deleteTicket() {
    if(confirm("Delete this ticket?") == false){
      return;
    }
    const response = await fetch(`${API_URL.API_URL}/deleteinvoice`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        ticketId: props.invoice.ticket_id,
      })
    });

    const message = await response.json();
    //if ticket has an error then alert there was an error.
    if (message.message != "DELETED") {
      alert("ERROR WITH DELETING TICKET");
      return;
    }
    props.setDeletedTicket(props.invoice.ticket_id);
  }

  return (
    <div className="card-outer">
      <div className="card">
        <div className="delete-x" onClick={deleteTicket}>
          <AiFillDelete size="35px" />
        </div>
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
  Filter Options Component

  Author: Ryan Penrod - 2/28/2023
  Description: Displays filter options radio buttons
-------------------------------------------------------------------------*/
function FilterOptions(props) {

  const handleFilterOptionChange = (e) => {
    props.setFilterOption(e.target.value);
  }

  return (
    <div className="filter-options">
      <label htmlFor="search">
        Search by:
      </label>
      <form>
        <label className="filter-radio-button" htmlFor="driver_id">
          Driver ID
          <input
            type="radio"
            name="filterOption"
            value="driver_id"
            id="driver_id"
            checked={props.filterOption === "driver_id"}
            onChange={handleFilterOptionChange}
          />
        </label>
        <label className="filter-radio-button" htmlFor="truck_number">
          Truck #
          <input
            type="radio"
            name="filterOption"
            value="truck_number"
            id="truck_number"
            checked={props.filterOption === "truck_number"}
            onChange={handleFilterOptionChange}
          />
        </label>
        <label className="filter-radio-button" htmlFor="date">
          Date
          <input
            type="radio"
            name="filterOption"
            value="date"
            id="date"
            checked={props.filterOption === "date"}
            onChange={handleFilterOptionChange}
          />
        </label>
        <label className="filter-radio-button" htmlFor="ticket_number">
          Ticket #
          <input
            type="radio"
            name="filterOption"
            value="ticket_number"
            id="ticket_number"
            checked={props.filterOption === "ticket_number"}
            onChange={handleFilterOptionChange}
          />
        </label>
        <label className="filter-radio-button" htmlFor="order">
          Order #
          <input
            type="radio"
            name="filterOption"
            value="order"
            id="order"
            checked={props.filterOption === "order"}
            onChange={handleFilterOptionChange}
          />
        </label>
      </form>
    </div>
  );
}

/*-------------------------------------------------------------------------
  Accounting Screen Component

  Last Updated: Ryan Penrod - 2/28/2023
  Changes: added filtering functionality for tickets
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
  const [deletedTicket, setDeletedTicket] = useState(0);
  const [confirmDeletion, setConfirmDeletion] = useState(false);
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

  useEffect(() => {
    if(deletedTicket != 0 && invoices.length > 0) {
      let copyOfInvoices = invoices;
      copyOfInvoices = invoices.filter((invoice) => {
        if(invoice.ticket_id != deletedTicket) {
          return invoice;
        }
      })
      setInvoices(copyOfInvoices);
      setDeletedTicket(0);
    }
  }, [deletedTicket]);

  /*-------------------------------------------------------------------------
    Accounting Screen

    Map function is used on state variable to itterate through each
    invoice and create a TruckAccountingData component for each one. This
    is included in the jsx as an object, as denoted by the curly braces.

    Last Updated: Cole Guion 3/25/23
    Changes: Added logo & back button
  -------------------------------------------------------------------------*/
  return (
    <div className="container">
      <span className="header">
        <img className="logo-left" src={logo} alt="Logo" onClick = { () => navigate(-1) } />
      </span>
      <h1>Invoices</h1>
        {isLoading && <div>Loading...</div>}
        {isLoading === false && <div className="cards">
        <FilterOptions filterOption={filterOption} setFilterOption={setFilterOption}/>
        {filterOption != "date" &&
          <input
          type="text"
          placeholder="Search..."
          className="filter-search"
          id="search"
          onChange={(e) => setFilterSearch(e.target.value)}
          value={filterSearch}
        />}
        {filterOption == "date" &&
          <input
          type="datetime-local"
          className="filter-date-search"
          id="search"
          onChange={(e) => setFilterSearch(e.target.value)}
          value={filterSearch}
        />}
        {authenticated && invoices.filter((invoice) =>
          invoice[filterOption]
          .toString()
          .includes(filterSearch))
          .sort( (a,b) => {return parseInt(a[filterOption], 10) > parseInt(b[filterOption], 10) ? 1 : -1} )
          .map((invoice) => {
            return(
              <LoadTicket invoice={invoice} key={invoice.ticket_id} setDeletedTicket={setDeletedTicket} setConfirmDeletion={setConfirmDeletion}/>
            );
          })}
        {!authenticated && <h1 style={{textAlign: 'center', color: 'red'}}>not authorized</h1>}
      </div>}
    </div>
  );

}