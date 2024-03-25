import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Menu from './menu'

function View() {
    const location = useLocation();
    const [editedData, setEditedData] = useState({
        name: location.state?.tickinfo.name,
        description: location.state?.tickinfo.description,
        status: location.state?.tickinfo.status
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedData({ ...editedData, [name]: value });
    };

    const handleSave = () => {
        // Perform save operation, e.g., send editedData to server
        console.log("Saving:", editedData);
        // Add your save logic here
    };

    return (
        <>
         < Menu></Menu>
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
            <button  className="savetic" onClick={handleSave}>Save</button>
        </div>

        </>
    );
}

export default View;
