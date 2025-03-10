import React from "react";
import { useLocation, Link } from "react-router-dom";
import "./HomeForm.css"; // You can create a separate CSS file for the admin dashboard

function AdminDashboard() {
  const location = useLocation();
  const username = location.state?.username || "Admin"; // Get username from state

  return (
    <div className="admin-dashboard-wrapper">
      <h1>Welcome, {username}!</h1>
      <p>Admin Dashboard - Manage your cab booking system efficiently.</p>

      <div className="dashboard-sections">
        <div className="dashboard-card">
          <h2>Drivers</h2>
          <p>Manage drivers and their details.</p>
          <Link to="/drivers">
            <button>View Drivers</button>
          </Link>
        </div>

        <div className="dashboard-card">
          <h2>Cabs</h2>
          <p>Monitor ongoing and completed Cabs.</p>
          <Link to="/Cabs">
            <button>View Rides</button>
          </Link>
        </div>

        <div className="dashboard-card">
          <h2>Customers</h2>
          <p>Manage customer profiles and ride history.</p>
          <Link to="/Booking">
            <button>View Customers</button>
          </Link>
        </div>

        <div className="dashboard-card">
          <h2>Earnings</h2>
          <p>Track earnings and revenue reports.</p>
          <Link to="/earnings">
            <button>View Earnings</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
