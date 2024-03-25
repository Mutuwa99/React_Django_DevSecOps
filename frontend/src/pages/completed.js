import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import $ from 'jquery';
import '../dashboard.css'
import '../index.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faTicket, faHouse, faArrowLeft, faCog, faChartPie , faBinoculars, faPencil , faEdit, faEye} from '@fortawesome/free-solid-svg-icons'; // Import the specific icons you need
import Menu from './menu' 

function Completed() {
  const [error, setError] = useState('');
  const [allinfo, setAllInfo] = useState([]);
  const navigate = useNavigate();
  

  console.log("this is all info", allinfo)

  useEffect(() => {

    $.ajax({
      url: 'http://127.0.0.1:8000/api/tickets/all',
      method: 'POST',
      contentType: 'application/json',
      success: (response) => {
        if (response.success) {
          console.log('this is data of all tickes', response.completed.completed);
          setAllInfo(response.completed.completed); 
        } else {
          setError('Error fetching records');
        }
      },
      error: (xhr, status, error) => {
        setError('Error fetching records');
        console.error('Error fetching records:', error);
      }
    });
  }, []); 

  return (
    <>
       < Menu></Menu>

      <div className="contenttable">
          <div className="title-info">
                  <p>dashboard ,<b> Welcome . Completed</b></p>
                  <i className="fas fa-chart-bar"></i>
          </div>
        <h5>Completed Tickets</h5>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allinfo.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{item.status}</td>
                <td>
                <FontAwesomeIcon icon={faEye} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Completed;
