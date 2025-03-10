import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginForm from "./Components/LoginForm/LoginForm";
import RegisterForm from "./Components/RegisterForm/RegisterForm";
import HomeForm from "./Components/HomeForm/HomeForm";
import Drivers from './Components/Drivers/Drivers'; // Import other pages as needed
import Cabs from './Components/Cabs/cabs'; 
import Website from  './Components/Website/website';
import Booking from './Components/Booking/Booking'
// import Rides from './Rides';
// import Customers from './Customers';
// import Earnings from './Earnings';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Website/>} />
       {/* <Route path="/" element={<LoginForm />} /> */}
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/home" element={<HomeForm />} /> {/* ✅ Home Page */}
        <Route path="/drivers" element={<Drivers />} />
        <Route path="/Cabs" element={<Cabs />} />
        <Route path="/Booking" element={<Booking />} />
       {/*  <Route path="/Booking" element={<Customers />} />
        <Route path="/earnings" element={<Earnings />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
