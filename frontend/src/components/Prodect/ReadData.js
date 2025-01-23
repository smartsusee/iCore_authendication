import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // 🚀 Decode JWT
import { AuthAxios } from '../../Base/BaseUrl/interceptor/AuthAxios';

const ReadData = () => {
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
    <div>
      <h2>Admin Page</h2>
      <button onClick={handleLogout}>Logout</button>
      <div>
        {/* Render your data here */}
        {data.map(item => (
          <div key={item.id}>{item.name}</div> // Replace 'id' and 'name' with your actual data properties
        ))}
      </div>
    </div>
  );
};

export default ReadData;
