import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom"; // 🚀 For redirection
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import {jwtDecode} from "jwt-decode"; // 🚀 Decode JWT
import { AuthAxios } from "./Base/BaseUrl/interceptor/AuthAxios";
import { Bounce, toast } from "react-toastify";
import "./App.css"; // Import CSS file

const App = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // 🚀 For navigation

  // Register User State
  const [reg, setRegister] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Login User State
  const [LoginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const toggleForm = () => {
    setIsRegister(!isRegister);
  };

  // 🚀 Handle Registration
  const regHandle = async (e) => {
    e.preventDefault();

    if (reg.name === "" || reg.email === "" || reg.password === "") {
      toast.error("Please fill all fields!", { transition: Bounce });
      return;
    }

    try {
      const response = await AuthAxios.post("/postdata", reg);
      toast.success(response.data.msg, { transition: Bounce });
    } catch (error) {
      toast.error(error.response?.data || "Registration failed!", { transition: Bounce });
    }

    setRegister({ name: "", email: "", password: "" });
  };

  const tokens = JSON.parse(localStorage.getItem("authToken"))

  
  // 🚀 Handle Login
  const loginHandle = async (e) => {
    e.preventDefault();

    if (LoginData.email === "" || LoginData.password === "") {
      toast.error("Please fill all fields!", { transition: Bounce });
      return;
    }

    try {
      const response = await AuthAxios.post("/login", LoginData);
      const token = response.data.token;
      
      localStorage.setItem("authToken", JSON.stringify(token)); // ✅ Store token
      const decodedToken = jwtDecode(token); // ✅ Decode JWT
      toast.success(response.data.msg, { transition: Bounce });

      // ✅ Redirect Based on Role
      if (decodedToken.role === "admin") {
        navigate("/admin");

      } else {
        navigate("/user");

      }
      
    } catch (error) {
      toast.error(error.response?.data || "Login failed!", { transition: Bounce });
    }

    setLoginData({ email: "", password: "" });

    if (tokens) {
      const decodedToken = jwtDecode(tokens)

    return  decodedToken.role === "admin" ? (
      <Navigate to="/admin" replace/>
    ):
      (
        <Navigate to="/user" replace/>
      )
    }
    


  };


 
  return (
    <div id="container">
    <div id="div">
    <div className="container">
      <div className={`form-container ${isRegister ? "register-active" : ""}`}>
        <div className="form-box">
          <h2 className="text-center">{isRegister ? "Register" : "Login"}</h2>
          {isRegister ? (
            <form className="form animate-slide" onSubmit={regHandle}>
              <div className="input-group">
                <label>Name</label>
                <input type="text" placeholder="Enter your name" 
                  onChange={(e) => setRegister({ ...reg, name: e.target.value })} 
                  value={reg.name} />
              </div>
              <div className="input-group">
                <label>Email</label>
                <input type="email" placeholder="Enter your email" 
                  onChange={(e) => setRegister({ ...reg, email: e.target.value })} 
                  value={reg.email} />
              </div>
              <div className="input-group">
                <label>Password</label>
                <div className="password-container">
                  <input type={showPassword ? "text" : "password"} placeholder="Enter your password"
                    onChange={(e) => setRegister({ ...reg, password: e.target.value })} 
                    value={reg.password} />
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} 
                    onClick={() => setShowPassword(!showPassword)} className="eye-icon" />
                </div>
              </div>
              <button className="btn">Register</button>
            </form>
          ) : (
            <form className="form animate-slide" onSubmit={loginHandle}>
              <div className="input-group">
                <label>Email</label>
                <input type="email" placeholder="Enter your email"
                  onChange={(e) => setLoginData({ ...LoginData, email: e.target.value })} 
                  value={LoginData.email} />
              </div>
              <div className="input-group">
                <label>Password</label>
                <div className="password-container">
                  <input type={showPassword ? "text" : "password"} placeholder="Enter your password"
                    onChange={(e) => setLoginData({ ...LoginData, password: e.target.value })} 
                    value={LoginData.password} />
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} 
                    onClick={() => setShowPassword(!showPassword)} className="eye-icon" />
                </div>
              </div>
              <button className="btn">Login</button>
            </form>
          )}
          <button className="toggle-btn" onClick={toggleForm}>
            {isRegister ? "Already have an account? Login" : "Don't have an account? Register"}
          </button>
        </div>
      </div>
    </div>
    </div></div>
  );
};

export default App;
