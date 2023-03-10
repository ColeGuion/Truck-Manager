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

export default function ViewEmployees() {
    const [employees, setEmployees] = useState([{}]);

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
            {employees.map((employee, idx) => {
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
    