import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./Component/Home/Home";
import Registration from "./Component/Registration/Registration";
import Login from "./Component/Login/Login";
import Vehicle from "./Component/Vehicle/Vehcile";
import Profile from "./Component/profile/profile";
import AdminVehicle from "./Component/Admin/Adminvehicle";
import ForgotPassword from "./Component/Login/forgotPassword";
import Comparision from "./Component/Comparision/Comparision";
import Admin_Booking from "./Component/Admin/Admin_Booking";
import Footer from "./Component/Footer/Footer";
import Booking from "./Component/Booking/Booking";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/Registration" element={<Registration />} />
        <Route path="/" element={<Home />} />
        <Route path="/Vehicle" element={<Vehicle />} />
        <Route path="/compare" element={<Comparision />} />
        <Route path="/forgotP" element={<ForgotPassword />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/Booking" element={<Booking />} />
        <Route path="/AdminBooking" element={<Admin_Booking />} />
        <Route path="/AdminVehicle" element={<AdminVehicle />} />
          
        
      </Routes>
      <ToastContainer />
      <Footer />
    </Router>
  );
};

export default App;
