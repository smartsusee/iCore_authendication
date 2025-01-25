import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/UserPage.css";
import { FaBars, FaUser, FaInfoCircle, FaServicestack, FaEnvelope } from "react-icons/fa";

function User() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Remove token
    navigate("/", { replace: true }); // Redirect to login
  };

  return (
    <>
    <div style={{display: "flex", flexDirection: "row"}}>
   
    <div className={`sidebar-container ${isOpen ? "open" : "closed"}`}>
    {/* Sidebar */}
    <div className="sidebar">
      <div className="toggle-container">
        <FaBars className="toggle-icon" onClick={toggleSidebar} />
      </div>
      <ul className="menu-items">
        <li>
          <FaUser className="menu-icon" />&nbsp;
          {isOpen && <span>User</span>}
        </li>
        <li>
          <FaInfoCircle className="menu-icon" />
          {isOpen && <span>About</span>}
        </li>
        <li>
          <FaServicestack className="menu-icon" />
          {isOpen && <span>Services</span>}
        </li>
        <li>
          <FaEnvelope className="menu-icon" />
          {isOpen && <span>Contact</span>}
        </li>
      </ul>
    </div>
  
    {/* Main Content */}
    
    </div>
  
    <div id="bodyData">
       <div id="nav">
       <div className="">
        <h4>Welcome to the user Page</h4>
      </div>
      <div>
      <button onClick={handleLogout}>Logout</button>

      </div>
       </div>
       <div id="FormData">

       </div>
    </div>
   
   
    </div>
    </>
  );
}

export default User;
