import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faTicket,faTrash,  faHouse, faArrowLeft, faCog, faChartPie , faBinoculars, faPencil , faEdit, faEye} from '@fortawesome/free-solid-svg-icons'; // Import the specific icons you need
import $ from 'jquery';
import '../dashboard.css'
import '../index.css'
import Menu from './menu'
import { showToast } from './toast'

function Alltick() {
  const [error, setError] = useState('');
  const [allinfo, setAllInfo] = useState([]);
  const navigate = useNavigate();


  function handleDelete(id){

    console.log("this is a record id ", id )

    $.ajax({
        url: `http://127.0.0.1:8000/api/tickets/delete/${id}/`,
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ id }),
        success: (response) => {
          if (response.success) {

            showToast('Hey', 'item has been removed');

          } else {
            setError('Error deleting records');
          }
        },
        error: (xhr, status, error) => {
          setError('Error deleting records');
          console.error('Error deleting records:', error);
        }
      });

  }

  function handleView(id){

    $.ajax({
        url: `http://127.0.0.1:8000/api/tickets/view/${id}/`,
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ id }),
        success: (response) => {
          if (response.success) {
            console.log("my response y" , response.record_json);
            navigate('/view', { 
                state: { 
                    tickinfo: response.record_json, 
                } 
            });

          } else {
            setError('Error fetching records');
          }
        },
        error: (xhr, status, error) => {
          setError('Error fetching  records');
          console.error('Error fetching records:', error);
        }
      });


  }
  

  console.log("this is all info", allinfo)

  useEffect(() => {

    $.ajax({
      url: 'http://127.0.0.1:8000/api/tickets/all',
      method: 'POST',
      contentType: 'application/json',
      success: (response) => {
        if (response.success) {
          console.log('this is data of all tickes', response.latest_tik.latest_tik);
          setAllInfo(response.latest_tik.latest_tik.latest_tik); 
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
                <p>dashboard ,<b> Welcome </b></p>
                <i className="fas fa-chart-bar"></i>
        </div>
        <h5>All Tickets</h5>
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
                <td > 
                    <FontAwesomeIcon onClick={() => handleDelete(item.id)} className="tabicon" icon={faTrash} />
                    <FontAwesomeIcon  onClick={() => handleView(item.id)} className="tabicon" icon={faEye} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Alltick;
