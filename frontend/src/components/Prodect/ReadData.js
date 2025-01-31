import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // 🚀 Decode JWT
import { FaBars, FaUser, FaInfoCircle, FaServicestack, FaEnvelope } from "react-icons/fa";
import { AuthAxios } from '../../Base/BaseUrl/interceptor/AuthAxios';
import Table from 'react-bootstrap/Table';
import "../../css/ReadData.css"
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
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const rowsPerPage = 3; // Number of records per page
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

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentData = data.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(data.length / rowsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };


  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Remove token
    navigate('/', { replace: true }); // Redirect to login
  };

  return (
    <>
    
      <div className={`page-wrapper chiller-theme ${isOpen ? "toggled" : ""}`}>
            <button
              id="show-sidebar"
              className="btn btn-sm btn-dark"
              onClick={toggleSidebar}
            >
              <FaBars />
            </button>
            <nav id="sidebar" className="sidebar-wrapper">
              <div className="sidebar-content">
                <div className="sidebar-brand">
                  <a href="#">Admin</a>
                  <i id="close-sidebar" class="fas fa-times" onClick={toggleSidebar}></i>
    
                </div>
                <div className="sidebar-header">
                  <div className="user-pic">
                    <img
                      className="img-responsive img-rounded"
                      src={require("../../pages/user/profile.jpg")}
                      alt="User"
                    />
                  </div>
                  <div className="user-info">
                    <span className="user-name">
                       <strong> Susee</strong>
                    </span>
                    <span className="user-role">Administrator</span>
                    <span className="user-status">
                      <i className="fa fa-circle"></i>
                      <span>Online</span>
                    </span>
                  </div>
                </div>
                <div className="sidebar-menu">
                  <ul>
                    <li className="header-menu">
                      <span>General</span>
                    </li>
                    <li className="sidebar-dropdown">
                      <a href="#">
                        <i className="fa fa-tachometer-alt"></i>
                        <span>Dashboard</span>
                        <span className="badge badge-pill badge-warning">New</span>
                      </a>
                      <div className="custom-accordion-container" style={{ border: "none" }}>
                        <div className="accordion" style={{ border: "none" }}>
                          <div className="accordion-item" style={{ border: "none", }}>
                            <input type="checkbox" id="section1" style={{ border: "none", outline: "none" }} />
                            <label for="section1" className="accordion-header"  style={{ border: "none", textAlign: "center", fontSize: "15px" }}>
                            view User Details list
                            </label>
                            <div className="accordion-content"   id='detailsView'  onClick={()=>{navigate("/reg")}} >
                              Userdata View  
                            </div>
                          </div>
                          <div className="accordion-item" style={{ border: "none", textAlign: "center" }}>
                            <input type="checkbox" id="section2" />
                            <label for="section2" className="accordion-header" style={{ border: "none", fontSize: "15px" }}>
                            Register page
                            </label>
                            <div className="accordion-content"  id='detailsView' onClick={()=>{navigate("/admin")}}>
                            Register list
                            </div>
                          </div>
                          {/* <div className="accordion-item" style={{ border: "none", }}>
                            <input type="checkbox" id="section3" />
                            <label for="section3" className="accordion-header" style={{ border: "none", textAlign: "center", fontSize: "15px" }}>
                              Section 3
                            </label>
                            <div className="accordion-content"  id='detailsView' >
                              Content for Section 3.
                            </div>
                          </div> */}
                        </div>
                      </div>
    
                    </li>
                  </ul>
                </div>
              </div>
              <div className="sidebar-footer">
                <a href="#" onClick={()=>{navigate("/")}}>
                  <i className="fa fa-power-off"></i>
                </a>
              </div>
            </nav>
            <div className="page-content">
          <div className="container-fluid">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Username</th>
                </tr>
              </thead>
              <tbody>
                {currentData
                  .filter((item) => item.name !== "admin")
                  .map((item, index) => (
                    <tr key={item.id} className="fade-in">
                      <td>{indexOfFirstRow + index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.role}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>

            {/* Pagination */}
            <div className="pagination">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="pagination-btn"
              >
                Previous
              </button>
              <span className="pagination-info">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="pagination-btn"
              >
                Next
              </button>
            </div>
          </div>
        </div>
          </div>
   
    
    </>

  );
};

export default ReadData;
