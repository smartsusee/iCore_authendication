import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // 🚀 Decode JWT
import { AuthAxios } from '../../Base/BaseUrl/interceptor/AuthAxios';
import { FaBars, FaUser, FaInfoCircle, FaServicestack, FaEnvelope } from "react-icons/fa";

const ReadData = () => {
   const [isOpen, setIsOpen] = useState(false);
  
    const toggleSidebar = () => {
      setIsOpen(!isOpen);
    };
  const navigate = useNavigate();
  const tokens = JSON.parse(localStorage.getItem('authToken'));
  const decodedToken = jwtDecode(tokens);

  console.log(decodedToken.role);

  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (decodedToken.role !== 'admin') {
          throw new Error('Only admins can access this route');
        }

        const response = await AuthAxios.get('/getdata', {
          headers: {
            'Authorization': `Bearer ${tokens}`
          }
        });
        console.log(response.data);
        
        setData(response.data.Get_data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once on mount

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Remove token
    navigate('/', { replace: true }); // Redirect to login
  };

  return (
    // <div>
    //   <h2>Admin Page</h2>
    //   <button onClick={handleLogout}>Logout</button>
    
    // </div>
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
            <h4>Welcome to the admin Page</h4>
          </div>
          <div>
          <button onClick={handleLogout}>Logout</button>
    
          </div>
           </div>
           <div id="FormData">
           <div>
        {/* Render your data here */}
        {data.map(item => (
          <div key={item.id}>{item.name}</div> // Replace 'id' and 'name' with your actual data properties
        ))}
      </div>
           </div>
        </div>
       
       
        </div>
  );
};

export default ReadData;
