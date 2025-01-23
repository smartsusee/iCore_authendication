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
    <div>
      user
         <button onClick={handleLogout}>Logout</button>
    </div>
    </> )
}

export default User