import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Prodect from './components/Prodect/Prodect';
import ReadData from './components/Prodect/ReadData';
import User from './pages/user/UserPage';
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<App />} />

        {/* Admin Protected Route */}
        <Route element={<Prodect allowedRole="admin" />}>
          <Route path="/admin" element={<ReadData />} />
        </Route>

        {/* User Protected Route */}
        <Route element={<Prodect allowedRole="user" />}>
          <Route path="/user" element={<User />} />
        </Route>

        {/* Redirect to "/" for undefined routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>




      <ToastContainer />
    </BrowserRouter>
  </React.StrictMode>
);
