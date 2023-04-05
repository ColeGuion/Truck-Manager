/*-------------------------------------------------------------------------
  Import dependencies
-------------------------------------------------------------------------*/
import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/GlobalStyles.css';
import '../Styles/UserProfileScreen.css';
import '../Styles/ViewEmployees.css';
import API_URL from'../config.json';
import logo from '../Logo_Files/png/logo-no-background.png'
import { AiFillDelete } from "react-icons/ai";

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
    const navigate = useNavigate();

    /*
        Author: Mason Otto
        Created: 3/1/2023
        Description: makes request to backend to delete this load ticket
    */
    async function deleteEmployee(employee_id) {
        if(confirm("Delete this employee?") == false){
            return;
        }
        const response = await fetch(`${APIURL}/deleteemployee`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                employeeId: employee_id,
            })
        });

        const message = await response.json();
        //if ticket has an error then alert there was an error.
        if (message.message != "DELETED") {
            alert("ERROR WITH DELETING EMPLOYEE");
            return;
        }

        let copyOfEmployees = employees;
        copyOfEmployees = employees.filter((employee) => {
            if(employee.Employee_ID != employee_id) {
                return employee;
            }
        })
        setEmployees(copyOfEmployees);
    }
    

    useEffect(() => {
        async function fetchEmployees() {
            const response = await fetch(`${APIURL}/employees`,{credentials: 'include'});
            const loadedEmployees = await response.json();
            setEmployees(loadedEmployees);
        } 
        fetchEmployees();
    }, [])

    return (
        <div className="container">
            <span className="header">
                <img className="logo-left" src={logo} alt="Logo" onClick = { () => navigate(-1) } />
            </span>
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
                    <div className="user-info-container" key={idx}>
                        <span className="delete-x" onClick={() => deleteEmployee(employee.Employee_ID)}>
                            <AiFillDelete size="35px" />
                        </span>
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
    