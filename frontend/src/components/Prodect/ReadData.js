import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ReadData = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Prevent back navigation
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = () => {
      window.history.pushState(null, "", window.location.href);
    };

    // Check if authToken exists in localStorage
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/"); // Redirect to login if token is missing
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Remove token
    navigate("/", { replace: true }); // Redirect to login
  };

  return (
    <div>
      <h2>Admin Page</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default ReadData;
