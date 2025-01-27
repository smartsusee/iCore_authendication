import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/UserPage.css";
import {
  FaBars,
  FaTimes,
  FaUser,
  FaInfoCircle,
  FaServicestack,
  FaEnvelope,
} from "react-icons/fa";
import { UserAxios } from "../../Base/BaseUrl/interceptor/AuthAxios";
import { Bounce, toast } from "react-toastify";

function User() {

  const imgref = useRef(null);

  const [DetailsStore, SetDetailsStore] = useState({

    firstname: "",
    lastname: "",
    dob: "",
    gender: "",
    email: "",
    mobile: "",
    city: "",
    state:"",
    image: "",

  })


 

  const [isOpen, setIsOpen] = useState(true);
  // const fileInputRef = useRef(null);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Remove token
    navigate("/", { replace: true }); // Redirect to login
  };

//This function handles input changes and updates the DetailsStore state

  // This function handles the file change event
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log(file.name); // Check the file's name
    SetDetailsStore({...DetailsStore, image: file}); // Store the actual file object in state
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Prepare the data to send in the POST request
    const formData = new FormData();
    formData.append("firstname", DetailsStore.firstname);
    formData.append("lastname", DetailsStore.lastname);
    formData.append("dob", DetailsStore.dob);
    formData.append("gender", DetailsStore.gender);
    formData.append("email", DetailsStore.email);
    formData.append("mobile", DetailsStore.mobile);
    formData.append("city", DetailsStore.city);
    formData.append("state", DetailsStore.state);
    
    // Append the actual image file, not just its name
    if (DetailsStore.image) {
      formData.append("image", DetailsStore.image);
    }
  
    // Send POST request to store the data
    UserAxios.post("/postdata", formData)
      .then((response) => {
        
        // Handle success
        console.log(response.data.msg);
        toast.success(response.data.msg, { transition: Bounce });
        SetDetailsStore({...DetailsStore, firstname:"", city:"", dob:"", email:"", gender:"", image:"" , lastname:"", mobile:"", state:""})
        // You can redirect or show a success message here
        imgref.current.value = "";
      })
      .catch((err) => {
        // Handle error
        toast.success(err.data.error, { transition: Bounce });

        console.error("There was an error storing the data!", err);
      });
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
              <a href="#">User</a>
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
                  Susee <strong>Smith</strong>
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
                        <div className="accordion-content" >
                          Content for Section .
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

            <div id="" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <div> <h2>User</h2></div>
             
            </div>
            <hr />
            <div className="row">
              <div className="col-md-12">
                <div id="formDatas">

                  <div class="container">
                    <div class="title">Registration</div>

                    <form action="" onSubmit={handleSubmit}>
                      <div class="user__details">
                        <div class="input__box">
                          <span class="details">First Name</span>
                          <input type="text" value={DetailsStore.firstname} placeholder="E.g: John Smith" required onChange={(e)=>{SetDetailsStore({...DetailsStore, firstname:e.target.value})}} />
                        </div>
                        <div class="input__box">
                          <span class="details">Last Name</span>
                          <input value={DetailsStore.lastname} type="text" placeholder="johnWC98" required onChange={(e)=>{SetDetailsStore({...DetailsStore, lastname:e.target.value})}} />
                        </div>
                        
                        <div class="input__box">
                          <span class="details">DOB</span>
                          <input type="date" required  name="dob" id="dob"
                        value={DetailsStore.dob}
                        onChange={(e)=>{SetDetailsStore({...DetailsStore, dob:e.target.value})}}/>
                        </div>
                        <div class="input__box">
                          <span class="details">image</span>
                          <input type="file"  name="image" ref={imgref} onChange={handleFileChange} />

                        </div>
                        <div class="gender__details">
                          <input type="radio" name="gender" id="dot-1" value="male"
                            checked={DetailsStore.gender === "male"}
                            onChange={(e)=>{SetDetailsStore({...DetailsStore, gender:e.target.value})}} />
                          <input type="radio" name="gender" id="dot-2"  value="female"
                          checked={DetailsStore.gender === "female"}
                          onChange={(e)=>{SetDetailsStore({...DetailsStore, gender:e.target.value})}} />
                          <input type="radio" name="gender" id="dot-3"  value="other"
                          checked={DetailsStore.gender === "other"}
                          onChange={(e)=>{SetDetailsStore({...DetailsStore, gender:e.target.value})}} />
                          <span class="gender__title">Gender</span>
                          <div class="category">
                            <label for="dot-1">
                              <span class="dot one"></span>
                              <span>Male</span>
                            </label>
                            <label for="dot-2">
                              <span class="dot two"></span>
                              <span>Female</span>
                            </label>
                            <label for="dot-3">
                              <span class="dot three"></span>
                              <span>Other</span>
                            </label>
                          </div>
                        </div>
                      
                        <div class="input__box">
                          <span class="details">Eamil</span>
                          <input type="text" value={DetailsStore.email} placeholder="Enter You'r mail" required onChange={(e)=>{SetDetailsStore({...DetailsStore, email:e.target.value})}} />
                        </div>
                        <div class="input__box">
                          <span class="details">Mobile_no</span>
                          <input type="number" value={DetailsStore.mobile} maxLength={10} pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="012-345-6789" required onChange={(e)=>{SetDetailsStore({...DetailsStore, mobile:e.target.value})}} />
                        </div>
                        <div class="input__box">
                          <span class="details">Choose you'r City </span>
                          <select style={{ width: "80%", height: "50px", borderRadius: "5px", border: "1px solid #ccc" }}  name="city"
                        value={DetailsStore.city}
                        onChange={(e)=>{SetDetailsStore({...DetailsStore, city:e.target.value})}}>
                            <option value="" key="">choose you'City</option>
                            <option value="New Delhi" key="">New Delhi</option>
                            <option value="Mumbai" key="">Mumbai </option>
                            <option value="Bengaluru" key="">Bengaluru </option>
                            <option value="Chennai" key="">Chennai </option>
                            <option value="Kolkata" key="">Kolkata </option>
                            <option value="Hyderabad" key="">Hyderabad </option>
                            <option value="Ahmedabad" key="">Ahmedabad </option>
                          </select>
                        </div>
                        <div class="input__box">
                          <span class="details">Choose you'r state </span>
                          <select style={{ width: "80%", height: "50px", borderRadius: "5px", border: "1px solid #ccc" }}                         name="state"
                        value={DetailsStore.state}
                        onChange={(e)=>{SetDetailsStore({...DetailsStore, state:e.target.value})}}>
                            <option value="" key="">choose you'State</option>
                            <option value="TamilNadu" key="">TamilNadu</option>
                            <option value="Andhra Pradesh" key="">Andhra Pradesh</option>
                            <option value="Arunachal Pradesh" key="">Arunachal Pradesh</option>
                            <option value="Assam" key="">Assam</option>
                            <option value="Bihar" key="">Bihar</option>
                            <option value="Goa" key="">Goa</option>
                          </select>
                        </div>

                      </div>

                      <div class="button">
                        <input type="submit" value="Register" />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default User;
