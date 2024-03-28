import React, { useState } from 'react';
import {  useNavigate } from 'react-router-dom'; 
import $ from 'jquery';
import { Link } from 'react-router-dom';

const Welcome = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = (e) => {
    e.preventDefault();
    $.ajax({
      url: 'http://noble-mutuwa.com:8000/api/auth/login',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ username, password }),
      success: (response) => {
       
        if (response.success) {
          console.log('this is data' , response.latest_tik.latest_tik)
            navigate('/dashboard', { 
                state: { 
                    userData: response.user, 
                    statsData: response.stats ,
                    latest_tikData: response.latest_tik.latest_tik.latest_tik
                } 
            });
   
        } else {
          setError('Invalid username or password');
        }
      },
      error: (xhr, status, error) => {
        setError('Invalid username or password');
        console.error('Login error:', error);
      }
    });
  };

  return (
    <div className="login-container">
      <h2 className="login-heading">React + Django</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <label htmlFor="username" className="login-label">
          Username
        </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="login-input"
        />
        <label htmlFor="password" className="login-label">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />
        <button type="submit" className="login-button">Login</button>
        {error && <div className="error-message">{error}</div>}
      </form>
    </div>
  );
};

export default Welcome;
