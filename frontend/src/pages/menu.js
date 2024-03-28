
import React from 'react';

import '../dashboard.css'
import '../index.css'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faTicket, faHouse, faArrowLeft, faCog, faChartPie , faBinoculars, faPencil , faEdit, faEye} from '@fortawesome/free-solid-svg-icons'; // Import the specific icons you need


function Menu(){
    return(

        <div className="menu">
        <ul>
            <li className="profile">
                <div className="img-box">
                    <img src="https://avatars.githubusercontent.com/u/110469709?v=4" alt="image" />
                    
                </div>
                <h2><b>Mutuwa</b></h2>
            </li>
            <li>
                <Link to="/dashboard" className="active">
                    <FontAwesomeIcon icon={faHome} />
                    <p>dashboard </p>
                </Link>
            </li>
            <li>
                <Link to="/alltick">
                <FontAwesomeIcon icon={faTicket} />
                    <p>All Tickets</p>
                </Link>
            </li>
            <li>
                <Link to="/inprogress">
                <FontAwesomeIcon icon={faTicket} />
                    <p>Pending Ticket</p>
                </Link>
            </li>
            <li>
                <Link to="/completed">
                <FontAwesomeIcon icon={faTicket} />
                    <p>Done Tickets</p>
                </Link>
            </li>
            <li>
                <Link to="/createticket">
                <FontAwesomeIcon icon={faTicket} />
                    <p>Create Tickets</p>
                </Link>
            </li>
            <li>
                <Link to="#">
                    <FontAwesomeIcon icon={faCog} />
                    <p>settings</p>
                </Link>
            </li>
            <li className="log-out"> 
                <Link to="/">
                    <FontAwesomeIcon icon={faArrowLeft} />
                    <p>Log Out</p>
                </Link>
            </li>
        </ul>
    </div>

    );

}

export default  Menu