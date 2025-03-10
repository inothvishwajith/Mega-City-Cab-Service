import React, { useState, useEffect } from "react";
import axios from "axios";
import "./cabs.css";

const API_URL = "http://localhost:8081/api/cabs"; // Change this to match your backend API

function App() {
  const [cabs, setCabs] = useState([]);
  const [form, setForm] = useState({
    cabName: "",
    cabModel: "",
    cabRegNumber: "",
    cabOwner: "",
    cabDescription: "",
    cabRate: "",
    cabFuelType: "",
    cabImage: "",
  });

  useEffect(() => {
    fetchCabs();
  }, []);

  const fetchCabs = async () => {
    try {
      const response = await axios.get(API_URL);
      setCabs(response.data);
    } catch (error) {
      console.error("Error fetching cabs:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm({ ...form, cabImage: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const addCab = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL, form);
      setForm({
        cabName: "",
        cabModel: "",
        cabRegNumber: "",
        cabOwner: "",
        cabDescription: "",
        cabRate: "",
        cabFuelType: "",
        cabImage: "",
      });
      fetchCabs();
    } catch (error) {
      console.error("Error adding cab:", error);
    }
  };

  const updateCab = async (id) => {
    const updatedCabName = prompt("Enter new Cab Name");
    if (!updatedCabName) return;
    try {
      await axios.put(`${API_URL}/${id}`, { ...form, cabName: updatedCabName });
      fetchCabs();
    } catch (error) {
      console.error("Error updating cab:", error);
    }
  };

  const deleteCab = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchCabs();
    } catch (error) {
      console.error("Error deleting cab:", error);
    }
  };

  return (
    <div className="container">
      <h1>Cab Management System</h1>

      {/* Form */}
      <form onSubmit={addCab}>
        <input type="text" name="cabName" placeholder="Cab Name" value={form.cabName} onChange={handleChange} required />
        <input type="text" name="cabModel" placeholder="Cab Model" value={form.cabModel} onChange={handleChange} required />
        <input type="text" name="cabRegNumber" placeholder="Cab Registration Number" value={form.cabRegNumber} onChange={handleChange} required />
        <input type="text" name="cabOwner" placeholder="Cab Owner" value={form.cabOwner} onChange={handleChange} required />
        <textarea name="cabDescription" placeholder="Cab Description" value={form.cabDescription} onChange={handleChange} required></textarea>
        <input type="text" name="cabRate" placeholder="Rate per Hour/Day" value={form.cabRate} onChange={handleChange} required />
        <input type="text" name="cabFuelType" placeholder="Fuel Type" value={form.cabFuelType} onChange={handleChange} required />
        <input type="file" onChange={handleImageUpload} accept="image/*" required />
        <button type="submit">Add Cab</button>
      </form>

      {/* Cab List */}
      {cabs.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Cab Name</th>
              <th>Cab Model</th>
              <th>Reg Number</th>
              <th>Owner</th>
              <th>Description</th>
              <th>Rate</th>
              <th>Fuel Type</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cabs.map((cab) => (
              <tr key={cab.id}>
                <td>{cab.cabName}</td>
                <td>{cab.cabModel}</td>
                <td>{cab.cabRegNumber}</td>
                <td>{cab.cabOwner}</td>
                <td>{cab.cabDescription}</td>
                <td>{cab.cabRate}</td>
                <td>{cab.cabFuelType}</td>
                <td>{cab.cabImage && <img src={cab.cabImage} alt="Cab" width="100" />}</td>
                <td>
                  <button onClick={() => updateCab(cab.id)}>Update</button>
                  <button onClick={() => deleteCab(cab.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No cabs available.</p>
      )}
    </div>
  );
}

export default App;
