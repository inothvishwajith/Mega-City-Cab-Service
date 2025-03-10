import React, { useEffect, useState } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import "./CabList.css"; // Import custom CSS

const CabList = () => {
  const [cabs, setCabs] = useState([]);
  const [filteredCabs, setFilteredCabs] = useState([]);
  const [priceFilter, setPriceFilter] = useState(0);
  const [modelFilter, setModelFilter] = useState("");
  const [sortBy, setSortBy] = useState("rate");
  const [currentPage, setCurrentPage] = useState(1);
  const [cabsPerPage] = useState(6);
  const [selectedCab, setSelectedCab] = useState(null);
  const [bookingDetails, setBookingDetails] = useState({
    name: "",
    phone: "",
    id: "",
    destination: "",
    distance: "",
  });
  const [totalPrice, setTotalPrice] = useState(0);
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8081/api/cabs")
      .then((response) => {
        setCabs(response.data);
        setFilteredCabs(response.data);
      })
      .catch((error) => {
        console.error("Error fetching cabs:", error);
      });
  }, []);

  const filterCabs = () => {
    const filtered = cabs.filter((cab) => {
      const matchesPrice = priceFilter ? cab.cabRate <= priceFilter : true;
      const matchesModel = modelFilter
        ? cab.cabModel.toLowerCase().includes(modelFilter.toLowerCase())
        : true;
      return matchesPrice && matchesModel;
    });
    setFilteredCabs(filtered);
  };

  const sortCabs = (cabs) => {
    switch (sortBy) {
      case "rate":
        return [...cabs].sort((a, b) => a.cabRate - b.cabRate);
      case "name":
        return [...cabs].sort((a, b) => a.cabName.localeCompare(b.cabName));
      default:
        return cabs;
    }
  };

  useEffect(() => {
    filterCabs();
  }, [priceFilter, modelFilter, sortBy]);

  const indexOfLastCab = currentPage * cabsPerPage;
  const indexOfFirstCab = indexOfLastCab - cabsPerPage;
  const currentCabs = sortCabs(filteredCabs).slice(indexOfFirstCab, indexOfLastCab);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const openModal = (cab) => setSelectedCab(cab);
  const closeModal = () => {
    setSelectedCab(null);
    setBookingDetails({
      name: "",
      phone: "",
      id: "",
      destination: "",
      distance: "",
    });
    setTotalPrice(0);
    setIsBookingConfirmed(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails({
      ...bookingDetails,
      [name]: value,
    });
    if (name === "distance") {
      calculatePrice(value);
    }
  };

  const calculatePrice = (distance) => {
    const parsedDistance = parseFloat(distance);
    const rate = selectedCab ? selectedCab.cabRate : 0;
    if (parsedDistance && rate) {
      const price = parsedDistance * rate;
      setTotalPrice(price);
    } else {
      setTotalPrice(0);
    }
  };

  const handleDownloadPDF = () => {
    const { name, phone, id, destination, distance } = bookingDetails;
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("Booking Invoice", 20, 20);

    doc.setFontSize(12);
    doc.text(`Name: ${name}`, 20, 40);
    doc.text(`Phone: ${phone}`, 20, 50);
    doc.text(`ID: ${id}`, 20, 60);
    doc.text(`Destination: ${destination}`, 20, 70);
    doc.text(`Distance: ${distance} km`, 20, 80);
    doc.text(`Rate: $${selectedCab ? selectedCab.cabRate : "N/A"} per km`, 20, 90);
    doc.text(`Total Price: $${totalPrice}`, 20, 100);

    // Save as PDF
    doc.save(`booking_invoice_${name}.pdf`);
  };
  const handleBookingConfirmation = () => {
    if (!bookingDetails.name || !bookingDetails.phone || !bookingDetails.id || !bookingDetails.destination || !bookingDetails.distance) {
      alert("Please fill in all fields before confirming the booking.");
      return;
    }
  
    const bookingData = {
      name: bookingDetails.name,
      phone: bookingDetails.phone,
      idNumber: bookingDetails.id,
      destination: bookingDetails.destination,
      distance: parseFloat(bookingDetails.distance),
      totalPrice: totalPrice,
      cabId: selectedCab.id,
      cabName: selectedCab.cabName,
    };
  
    axios
      .post("http://localhost:8081/api/bookings", bookingData)
      .then((response) => {
        console.log("Booking saved:", response.data);
        setIsBookingConfirmed(true);
        handleDownloadPDF(); // Generate invoice
      })
      .catch((error) => {
        console.error("Error saving booking:", error);
        alert("Failed to confirm booking. Please try again.");
      });
  };
  

  return (
    <div className="cab-list-container">
      <h1 className="cab-list-header">Available Cabs</h1>

      <div className="filters-container">
        <div className="filter-item">
          <label htmlFor="price-filter" className="filter-label">Max Price per km</label>
          <input
            type="number"
            id="price-filter"
            value={priceFilter}
            onChange={(e) => setPriceFilter(Number(e.target.value))}
            placeholder="Enter max price"
            className="filter-input"
          />
        </div>
        <div className="filter-item">
          <label htmlFor="model-filter" className="filter-label">Car Model</label>
          <input
            type="text"
            id="model-filter"
            value={modelFilter}
            onChange={(e) => setModelFilter(e.target.value)}
            placeholder="Enter car model"
            className="filter-input"
          />
        </div>
        <div className="filter-item">
          <label htmlFor="sort-by" className="filter-label">Sort By</label>
          <select
            id="sort-by"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="filter-input"
          >
            <option value="rate">Rate</option>
            <option value="name">Name</option>
          </select>
        </div>
      </div>

      <div className="cab-grid">
        {currentCabs.map((cab) => (
          <div key={cab.id} className="cab-card" onClick={() => openModal(cab)}>
            <img src={cab.cabImage} alt={cab.cabName} className="cab-image" />
            <div className="cab-details">
              <h2 className="cab-name">{cab.cabName}</h2>
              <div className="cab-info-container">
                <p className="cab-info"><strong>Model:</strong> {cab.cabModel}</p>
                <p className="cab-info"><strong>Rate:</strong> ${cab.cabRate}/km</p>
              </div>
              <button className="book-button">
                <i className="fas fa-car"></i> Book Now
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        {Array.from({ length: Math.ceil(filteredCabs.length / cabsPerPage) }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => paginate(i + 1)}
            className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {selectedCab && !isBookingConfirmed && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="close-modal" onClick={closeModal}>×</button>
            <h2>Book {selectedCab.cabName}</h2>
            <img src={selectedCab.cabImage} alt={selectedCab.cabName} className="modal-image" />
            <div className="modal-details">
              <p><strong>Model:</strong> {selectedCab.cabModel}</p>
              <p><strong>Rate:</strong> ${selectedCab.cabRate}/km</p>
              <p><strong>Owner:</strong> {selectedCab.cabOwner}</p>
              <p><strong>Fuel Type:</strong> {selectedCab.cabFuelType}</p>
            </div>

          <form className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-lg space-y-4">
  <h2 className="text-xl font-semibold text-gray-700 text-center">Cab Booking Form</h2>

  {[
    { label: "Full Name", name: "name", type: "text", minLength: 3, maxLength: 50, placeholder: "Enter your name" },
    { label: "Phone Number", name: "phone", type: "tel", pattern: "[0-9]{10}", maxLength: 10, placeholder: "0712345678" },
    { label: "ID Number", name: "id", type: "text", minLength: 5, maxLength: 20, placeholder: "Enter your ID" },
    { label: "Destination", name: "destination", type: "text", minLength: 3, maxLength: 50, placeholder: "Where are you going?" },
    { label: "Distance (km)", name: "distance", type: "number", min: 1, placeholder: "Enter distance in km" }
  ].map(({ label, name, ...rest }) => (
    <div key={name} className="flex flex-col">
      <label className="text-gray-600 font-medium">{label}</label>
      <input
        className="border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        name={name}
        value={bookingDetails[name]}
        onChange={handleInputChange}
        required
        {...rest}
      />
    </div>
  ))}

  <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition">
    Book Now
  </button>
</form>

            <p><strong>Total Price: </strong>${totalPrice}</p>
            <button className="confirm-booking-button" onClick={handleBookingConfirmation}>Confirm Booking</button>
          </div>
        </div>
      )}

      {isBookingConfirmed && (
        <div className="thank-you-message">
          <h2>Thank You for Your Booking!</h2>
          <p>Your booking has been confirmed. An invoice has been sent to your email.</p>
        </div>
      )}
    </div>
  );
};

export default CabList;
