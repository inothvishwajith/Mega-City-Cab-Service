import React, { useState, useEffect } from 'react';
import './Drivers.css'; // Import custom CSS

const Drivers = () => {
  const [drivers, setDrivers] = useState([]); // State to hold driver list
  const [form, setForm] = useState({
    name: '',
    license: '',
    idNumber: '',
    address: ''
  });
  const [editingDriver, setEditingDriver] = useState(null); // Track editing driver

  // Fetch drivers from backend on component mount
  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    try {
      const response = await fetch('http://localhost:8081/api/drivers');
      const data = await response.json();
      setDrivers(data);
    } catch (error) {
      console.error('Error fetching drivers:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  // Add or update driver
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.license || !form.idNumber || !form.address) return;

    const url = editingDriver
      ? `http://localhost:8081/api/drivers/${editingDriver.id}`
      : 'http://localhost:8081/api/drivers';

    const method = editingDriver ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setForm({ name: '', license: '', idNumber: '', address: '' });
        setEditingDriver(null);
        fetchDrivers(); // Refresh driver list
      }
    } catch (error) {
      console.error('Error saving driver:', error);
    }
  };

  const handleEdit = (driver) => {
    setEditingDriver(driver);
    setForm(driver);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:8081/api/drivers/${id}`, { method: 'DELETE' });
      fetchDrivers(); // Refresh driver list
    } catch (error) {
      console.error('Error deleting driver:', error);
    }
  };

  return (
    <div className="drivers-container">
      <h2 className="page-title">Drivers Management</h2>

      <div className="form-container">
        <h3>{editingDriver ? 'Edit Driver' : 'Add Driver'}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input type="text" name="name" value={form.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>License Number</label>
            <input type="text" name="license" value={form.license} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>ID Number</label>
            <input type="text" name="idNumber" value={form.idNumber} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Address</label>
            <input type="text" name="address" value={form.address} onChange={handleChange} required />
          </div>
          <button type="submit" className="submit-btn">{editingDriver ? 'Update' : 'Add'} Driver</button>
        </form>
      </div>

      <div className="table-container">
        <h3>Driver List</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>License</th>
              <th>ID Number</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {drivers.map((driver) => (
              <tr key={driver.id}>
                <td>{driver.name}</td>
                <td>{driver.license}</td>
                <td>{driver.idNumber}</td>
                <td>{driver.address}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(driver)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(driver.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Drivers;
