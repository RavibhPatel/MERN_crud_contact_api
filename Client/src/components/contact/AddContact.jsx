import React, { useState } from 'react';
import axios from 'axios';
import '../../../node_modules/bootstrap/dist/css/bootstrap.css';

const AddContact = ({ fetchData }) => {
  const url = 'http://localhost:2000';
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [error, setError] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem('userId');
      console.log('userId', userId);
      const response = await axios.post(
        `${url}/add`,
        { ...formData, userId },  // Explicitly adding userId to formData
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      if (response.data.message === 'Contact Already Exists') {
        setError('Contact Already Exists');
      } else {
        console.log(response.data);
        setFormData({ name: '', email: '', phone: '' });
        fetchData(); // Fetch updated data
        setError('');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to add contact');
    }
  };

  return (
    <div className="text-center">
      <button
        type="button"
        className="btn btn-warning mx-auto"
        data-bs-toggle="modal"
        data-bs-target="#addFormModal"
      >
        ADD Contact
      </button>

      <div
        className="modal fade"
        id="addFormModal"
        tabIndex="-1"
        aria-labelledby="addFormModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5 text-dark" id="addFormModalLabel">
                Add Contact
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body text-start">
              {error && <p style={{ color: 'red' }}>{error}</p>}
              <form onSubmit={handleFormSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label text-dark">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    id="name"
                    onChange={handleInputChange}
                    value={formData.name}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label text-dark">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    id="email"
                    onChange={handleInputChange}
                    value={formData.email}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label text-dark">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="phone"
                    className="form-control"
                    id="phone"
                    onChange={handleInputChange}
                    value={formData.phone}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  Add Contact
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddContact;
