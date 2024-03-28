import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Menu from './menu'
import { showToast } from './toast'
import $ from 'jquery';

function View() {
    const location = useLocation();
    const [editedData, setEditedData] = useState({
        id: location.state?.tickinfo.id,
        name: location.state?.tickinfo.name,
        description: location.state?.tickinfo.description,
        status: location.state?.tickinfo.status
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedData({ ...editedData, [name]: value });
    };

    function handleSave(id){ // Define handleSave as a function that returns a function
        // Perform save operation, e.g., send editedData to server
        console.log("thi is " , id)
        console.log("also id", editedData.id)
        console.log("Saving:", editedData);
        // Add your save logic here
        $.ajax({
            url: `http://noble-mutuwa.com:8000/api/tickets/edit/${id}/`,
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(editedData), // Send the editedData as JSON
            success: (response) => {
                console.log('Response:', response);
                console.log("Saving success :");
                showToast('Hey', 'item has been edited');
            },
            error: (xhr, status, error) => {
                console.error('Error:', error);
                console.log("Saving error :");
            }
        });
    };

    return (
        <>
         <Menu></Menu>
        <div className="view-container">
            <h2>Edit Ticket</h2>
            <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" value={editedData.name} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label htmlFor="description">Description:</label>
                <input id="description" name="description" value={editedData.description} onChange={handleChange}></input>
            </div>
            <div className="form-group">
                <label htmlFor="status">Status:</label>
                <select id="status" name="status" value={editedData.status} onChange={handleChange} className="select-field">
                    <option value="in_progress">In Progress</option>
                    <option value="pending">Pending</option>
                    <option value="done">Done</option>
                    <option value="invalid">Invalid</option>
                </select>
            </div>
            <button className="savetic" onClick={() => handleSave(editedData.id)}>Save</button>
            
        </div>
        </>
    );
}

export default View;
