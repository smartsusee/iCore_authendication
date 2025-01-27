import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // 🚀 Decode JWT
import { FaBars, FaUser, FaInfoCircle, FaServicestack, FaEnvelope } from "react-icons/fa";
import { AuthAxios, UserAxios } from '../../Base/BaseUrl/interceptor/AuthAxios';
import Table from 'react-bootstrap/Table';
import "../../css/ReadData.css"
import { FaTrashAlt } from "react-icons/fa";
import { Bounce, toast } from 'react-toastify';
const RegisterData = () => {
   const [isOpen, setIsOpen] = useState(false);
  
    const toggleSidebar = () => {
      setIsOpen(!isOpen);
    };
  const navigate = useNavigate();
  const tokens = JSON.parse(localStorage.getItem('authToken'));
  const decodedToken = jwtDecode(tokens);

  console.log(decodedToken.role);

  const [data, setData] = useState([]);
  const [toogle , setToogle] = useState(false)
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const rowsPerPage = 3; // Number of records per page

function fetchData() {
    
    UserAxios.get("getData").then((res)=>{
        console.log(res.data);
        setData(res.data)
        
    }).catch((err)=>{

          console.log(err);
          

    })
}


  useEffect(() => {
    fetchData()

  
  }, [toogle]); // Empty dependency array means this effect runs once on mount

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

  const deleteFun =(id)=>{

     console.log(id);
     UserAxios.delete(`DeleteData/${id}`).then((res)=>{
      console.log(res.data.message);
      toast.success(res.data.message, { transition: Bounce });

      setToogle(!toogle)
     }).catch((err)=>{
      console.log(err);
     })
     

  }

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
                       <strong>Susee</strong>
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
                            <label for="section1" className="accordion-header" style={{ border: "none", textAlign: "center", fontSize: "15px" }}>
                              Section 1
                            </label>
                            <div className="accordion-content"  onClick={()=>{navigate("/reg")}}>
                             Userdata View
                            </div>
                          </div>
                          <div className="accordion-item" style={{ border: "none", textAlign: "center" }}>
                            <input type="checkbox" id="section2" />
                            <label for="section2" className="accordion-header" style={{ border: "none", fontSize: "15px" }}>
                              section2
                            </label>
                            <div className="accordion-content">
                              Content for Section 2.
                            </div>
                          </div>
                          <div className="accordion-item" style={{ border: "none", }}>
                            <input type="checkbox" id="section3" />
                            <label for="section3" className="accordion-header" style={{ border: "none", textAlign: "center", fontSize: "15px" }}>
                              Section 3
                            </label>
                            <div className="accordion-content" >
                              Content for Section 3.
                            </div>
                          </div>
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
            <Table striped bordered hover style={{textAlign:"center"}}>
              <thead>
                <tr>
                  <th id='th' >S.No</th>
                  <th id='th' >First Name</th>
                  <th id='th' >Last Name</th>
                  <th id='th' >dob</th>
                  <th id='th' >gender</th>
                  <th id='th' >email</th>
                  <th id='th' >city</th>
                  <th id='th' >state</th>
                  <th id='th' >User_Image</th>
                  <th id='th' >Actions</th>


                  

                </tr>
              </thead>
              <tbody>
  {currentData
    .filter((item) => item.name !== "admin")
    .map((item, index) => {
      const imageName = item.image
        ? item.image.replace('R:\\ApiIntegrate\\frontend\\src\\images\\', '')
        : 'No Image';

      return (
        <tr key={item.id} className="fade-in">
          <td data-label="S.No">{indexOfFirstRow + index + 1}</td>
          <td data-label="First Name">{item.firstname}</td>
          <td data-label="Last Name">{item.lastname}</td>
          <td data-label="DOB">{item.role}</td>
          <td data-label="Gender">{item.gender}</td>
          <td data-label="Email">{item.email}</td>
          <td data-label="City">{item.city}</td>
          <td data-label="State">{item.state}</td>
          <td data-label="User Image">
            <img
              id="img"
              src={require(`../../images/${imageName}`)}
              alt={imageName}
            />
          </td>
          <td data-label="Actions">
            <span>edit</span> &nbsp; <span onClick={()=>{deleteFun(item._id)}}><FaTrashAlt /></span>
          </td>
        </tr>
      );
    })}
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

export default RegisterData;
