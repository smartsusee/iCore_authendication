import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/UserPage.css";
import Accordion from "react-bootstrap/Accordion";
import {
  FaBars,
  FaTimes,
  FaUser,
  FaInfoCircle,
  FaServicestack,
  FaEnvelope,
} from "react-icons/fa";

function User() {
  const [isOpen, setIsOpen] = useState(true);

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
                  src={require("./profile.jpg")}
                  alt="User"
                />
              </div>
              <div className="user-info">
                <span className="user-name">
                  John <strong>Smith</strong>
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
                  <div className="custom-accordion-container">

                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="sidebar-footer">
            <a href="#">
              <i className="fa fa-power-off"></i>
            </a>
          </div>
        </nav>
        <div className="page-content">
          <div className="container-fluid">
            <h2>Admin</h2>
            <hr />
            <div className="row">
              <div className="col-md-12">
                <p>
                  This is a responsive sidebar template with a dropdown menu
                  based on Bootstrap 4 framework.
                </p>
                <p>
                  You can find the complete code on{" "}
                  <a
                    href="https://github.com/azouaoui-med/pro-sidebar-template"
                    target="_blank"
                  >
                    Github
                  </a>
                  , it contains more themes and background image options.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default User;
