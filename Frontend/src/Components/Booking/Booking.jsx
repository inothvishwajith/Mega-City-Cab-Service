import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminBookingTable.css"; // Import CSS for styling

const AdminBookingTable = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [bookingsPerPage] = useState(10);

  useEffect(() => {
    axios
      .get("http://localhost:8081/api/bookings")
      .then((response) => {
        setBookings(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching bookings:", error);
        setError("Failed to load bookings");
        setLoading(false);
      });
  }, []);

  const handleConfirmBooking = (id) => {
    axios
      .put(`http://localhost:8081/api/bookings/${id}/confirm`)
      .then(() => {
        setBookings(
          bookings.map((booking) =>
            booking.id === id ? { ...booking, confirmed: true } : booking
          )
        );
      })
      .catch((error) => {
        console.error("Error confirming booking:", error);
      });
  };

  const filteredBookings = bookings.filter((booking) =>
    booking.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = filteredBookings.slice(
    indexOfFirstBooking,
    indexOfLastBooking
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="admin-container">
      <h2 className="admin-header">Booking Details</h2>
      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      {loading ? (
        <p>Loading bookings...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>ID Number</th>
                <th>Destination</th>
                <th>Distance (km)</th>
                <th>Total Price ($)</th>
                <th>Cab Name</th>
                <th>Confirmed</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentBookings.map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.name}</td>
                  <td>{booking.phone}</td>
                  <td>{booking.idNumber}</td>
                  <td>{booking.destination}</td>
                  <td>{booking.distance}</td>
                  <td>${booking.totalPrice}</td>
                  <td>{booking.cabName}</td>
                  <td>{booking.confirmed ? "Yes" : "No"}</td>
                  <td>
                    <button
                      onClick={() => handleConfirmBooking(booking.id)}
                      disabled={booking.confirmed}
                      className="confirm-button"
                    >
                      Confirm
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            {Array.from(
              { length: Math.ceil(filteredBookings.length / bookingsPerPage) },
              (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => paginate(i + 1)}
                  className={currentPage === i + 1 ? "active" : ""}
                >
                  {i + 1}
                </button>
              )
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default AdminBookingTable;
