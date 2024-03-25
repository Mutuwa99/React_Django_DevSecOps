import React from 'react';
import { useLocation } from 'react-router-dom';
import '../dashboard.css'
import '../index.css'
import $ from 'jquery';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faTicket, faHouse, faArrowLeft, faCog, faChartPie , faBinoculars, faPencil , faEdit, faEye} from '@fortawesome/free-solid-svg-icons'; // Import the specific icons you need

import Menu from './menu'
import { showToast } from './toast'

const Dashboard = () => {

const [allinfo, setAllInfo] = useState([]);
const [alltick, setAllInfotick] = useState([]);
const [error, setError] = useState('');

$.ajax({
    url: 'http://127.0.0.1:8000/api/tickets/all',
    method: 'POST',
    contentType: 'application/json',
    success: (response) => {
      if (response.success) {
        console.log('this is data of all tickes', response.latest_tik.latest_tik.latest_tik);
        setAllInfo(response.stats)
        setAllInfotick(response.latest_tik.latest_tik.latest_tik)
        
      } else {
        setError('Error fetching records');
      }
    },
    error: (xhr, status, error) => {
      setError('Error fetching records');
      console.error('Error fetching records:', error);
    }
  });



  return (
    <>
        < Menu></Menu>

        <div className="content">
            <div className="title-info">
                <p>dashboard ,<b> Welcome  </b></p>
                <i className="fas fa-chart-bar"></i>
            </div>
            <div className="data-info">
                <div className="box">
                    <i className="fas fa-user"></i>
                    <div className="data">
                    <FontAwesomeIcon icon={faUser} />
                        <p>user</p>
                        <span>{allinfo.count_users}</span>
                    </div>
                </div>
                <div className="box">
                    <i className="fas fa-pen"></i>
                    <div className="data">
                    <FontAwesomeIcon icon={faTicket} />
                        <p>tickets</p>
                        <span>101</span>
                    </div>
                </div>
                <div className="box">
                    <i className="fas fa-table"></i>
                    <div className="data">
                    <FontAwesomeIcon icon={faHouse} />
                        <p>product</p>
                        <span>{allinfo.count_product}</span>
                    </div>
                </div>
            </div>
            <h5>Recent Tickets</h5>
            <table>
                <thead>
                    <tr>
                        <th>Name </th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Action</th>
                        {/* Add more columns if needed */}
                    </tr>
                </thead>
                <tbody>
                    {alltick.map((item) => (
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
            <div className="data-info">
                <div className="box">
                    <i className="fas fa-user"></i>
                    <div className="data">
                    <FontAwesomeIcon icon={faTicket} />
                        <p>Open Tickets</p>
                        <span>{allinfo.count_users}</span>
                    </div>
                </div>
                <div className="box">
                    <i className="fas fa-pen"></i>
                    <div className="data">
                    <FontAwesomeIcon icon={faTicket} />
                        <p>Pending Tickets</p>
                        <span>101</span>
                    </div>
                </div>
                <div className="box">
                    <i className="fas fa-table"></i>
                    <div className="data">
                    <FontAwesomeIcon icon={faTicket} />
                        <p>Closed Ticket</p>
                        <span>{allinfo.count_product}</span>
                    </div>
                </div>
            </div>

        </div>
    </>
);
};

export default Dashboard;
