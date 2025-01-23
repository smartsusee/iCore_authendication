import React from 'react'
import { useNavigate } from 'react-router-dom';

function User() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Remove token
    navigate('/', { replace: true }); // Redirect to login
  };
  return (
    <>
  
      
        
         <div className={`sidebar-container ${isOpen ? "open" : "closed"}`}>
      <div className="sidebar">
        <button className="toggle-button" onClick={toggleSidebar}>
          {isOpen ? "<<" : ">>"}
        </button>
        <ul className="menu-items">
          <li>user</li>
          <li>About</li>
          <li>Services</li>
          <li>Contact</li>
        </ul>
      </div>
      <div className="content">
        <h1>Welcome to the Main Page</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>

    </> )
}

export default User