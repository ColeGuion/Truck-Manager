/*-------------------------------------------------------------------------
  Import dependencies
-------------------------------------------------------------------------*/
import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/GlobalStyles.css';
import '../Styles/UserProfileScreen.css';
import API_URL from'../config.json';

const APIURL = API_URL.API_URL;

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
            <label className="filter-radio-button" htmlFor="name">
            Name
            <input
                type="radio"
                name="filterOption"
                value="Name"
                id="name"
                checked={props.filterOption === "Name"}
                onChange={handleFilterOptionChange}
            />
            </label>
            <label className="filter-radio-button" htmlFor="employee_id">
            Employee ID
            <input
                type="radio"
                name="filterOption"
                value="Employee_ID"
                id="employee_id"
                checked={props.filterOption === "Employee_ID"}
                onChange={handleFilterOptionChange}
            />
            </label>
        </form>
        </div>
    );
}

export default function ViewEmployees() {
    const [employees, setEmployees] = useState([{}]);
    const [filterOption, setFilterOption] = useState("Name");
    const [filterSearch, setFilterSearch] = useState("");

    useEffect(() => {
        async function fetchEmployees() {
            const response = await fetch(`${APIURL}/employees`,{credentials: 'include'});
            const loadedEmployees = await response.json();
            setEmployees(loadedEmployees);
        } 
        fetchEmployees();
    }, [])

    return (
        <div className="page-container">
            <h1>Employees</h1>
            <FilterOptions filterOption={filterOption} setFilterOption={setFilterOption}/>
            <input
                type="text"
                placeholder="Search..."
                className="filter-search"
                id="search"
                onChange={(e) => setFilterSearch(e.target.value)}
                value={filterSearch}
            />  
            {employees.filter((employee) =>
          employee[filterOption]?.toString().includes(filterSearch))
          .sort( (a,b) => {return parseInt(a[filterOption], 10) > parseInt(b[filterOption], 10) ? 1 : -1} )
          .map((employee, idx) => {
                return (
                    <div className="info-container" key={idx}>
                        <span className="info">Name:  {employee.Name || "N/A"}</span>
                        <span className="info">Employee ID:  {employee.Employee_ID || "N/A"}</span>
                        <span className="info">Email:  {employee.Email || "N/A"}</span>
                        <span className="info">Street:  {employee.Street || "N/A"}</span>
                        <span className="info">State:  {employee.State || "N/A"}</span>
                        <span className="info">City:  {employee.City || "N/A"}</span>
                        <span className="info">Zipcode:  {employee.Zipcode || "N/A"}</span>
                        <span className="info">Phone Number:  {employee.Phone || "N/A"}</span>
                        <span className="info">Hire Date:  {employee.Creation_Date || "N/A"}</span>
                    </div>
                );
            })}
        </div>
    );
}
    