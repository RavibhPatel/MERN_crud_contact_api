import React, { useState } from 'react'
import axios from 'axios';
import '../../node_modules/bootstrap/dist/js/bootstrap.js';

const AddContact = ({fetchData}) => {
  const url = 'http://localhost:2000';
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  })
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({...formData, [name]: value });
  };

  const handelFormSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${url}/add`, formData, {headers: {"contentType": "application/json"}});
      console.log(response.data);
      setFormData({name: '', email: '', phone: ''});
      fetchData();

    }catch(err) {
      console.error(err);
      alert('Failed to add contact');
    }
  };

  return (
    <div className=' text-center'>     
      <button type="button" className="btn btn-warning mx-auto" data-bs-toggle="modal" data-bs-target="#addFormModal">
        ADD Contact
      </button>
      <div className="modal fade" id="addFormModal" tabIndex="-1" aria-labelledby="addFormModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5 text-dark" id="addFormModalLabel">Add Contact</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body text-start">
              <form onSubmit={handelFormSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label text-dark text-start">Name</label>
                  <input type="text" name='name' className="form-control" id="name" aria-describedby="emailHelp" onChange={handleInputChange} value={formData.name} />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label text-dark text-start">Email</label>
                  <input type="email" name='email' className="form-control" id="email" aria-describedby="emailHelp" onChange={handleInputChange} value={formData.email}/>
                </div>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label text-dark text-start">Phone Number</label>
                  <input type="text" name='phone' className="form-control" id="phone" onChange={handleInputChange} value={formData.phone}/>
                </div>
                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal" aria-label="Close">Add Contact</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  )
}

export default AddContact