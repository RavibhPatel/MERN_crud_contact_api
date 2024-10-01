import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddContact from './AddContact';

const Contact = () => {
    const url = 'http://localhost:2000';
    const [contacts, setContacts] = useState([]);
    const [selectedContact, setSelectedContact] = useState(null); // State for selected contact

    useEffect(() => {       
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${url}/`, { headers: { "contentType": "application/json" } });
            setContacts(response.data.contacts);
        } catch (error) {
            console.error(error);
        }
    }
   

    const deleteContact = async (id) => {
        try {
            await axios.delete(`${url}/delete/${id}`, { headers: { "contentType": "application/json" } });
            const updatedContacts = contacts.filter(contact => contact._id !== id);
            setContacts(updatedContacts);
        } catch (error) {
            console.error(error);
        }
    }

    const handleEditClick = (contact) => {
        setSelectedContact(contact); // Set selected contact when "Edit" button is clicked
    }

    const handleEditForm = async (e) => {
        e.preventDefault();
        try {
            const id = selectedContact._id;
            const updatedContact = {
                name: e.target.name.value,
                email: e.target.email.value,
                phone: e.target.phone.value
            };

            const response = await axios.put(`${url}/update/${id}`, updatedContact, { headers: { "contentType": "application/json" } });
            const updatedContacts = contacts.map(contact => contact._id === id ? response.data.data : contact);
            setContacts(updatedContacts);

            // Reset form and close modal
            setSelectedContact(null);
            document.getElementById('editContactModal').style.display = 'none';
            
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className='container my-5'>
            <div className='row justify-content-center gy-5'>
                <div className='col-12 '>
                    <AddContact fetchData={fetchData} />
                </div>
                {contacts.map(contact =>
                    <div className='col-12 col-md-10 col-lg-7' key={contact._id} style={{ borderRadius: '10px', border: '3px solid yellow' }}>
                        <div className='d-flex align-items-center justify-content-between p-5'>
                            <div className=' text-start'>
                                <h3 className='mb-3 fw-bold fs-3'>{contact.name}</h3>
                                <p className='mb-3'>{contact.email}</p>
                                <p className='mb-0'>{contact.phone}</p>
                            </div>
                            <div className='d-flex flex-column align-items-center justify-content-center'>
                                <button
                                    type="button"
                                    className='btn btn-info mb-3'
                                    data-bs-toggle="modal"
                                    data-bs-target="#editContactModal"
                                    onClick={() => handleEditClick(contact)} // Set selected contact on click
                                >
                                    Edit
                                </button>

                                <button className='btn btn-danger ms-2' onClick={() => deleteContact(contact._id)}>Delete</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Edit Modal */}
            <div className="modal fade" id="editContactModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="editContactModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5 text-dark" id="editContactModalLabel">Edit Contact</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {selectedContact && (
                                <form onSubmit={handleEditForm}>
                                    <input type="hidden" name='id' value={selectedContact._id} />
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label text-dark">Name</label>
                                        <input type="text" name='name' className="form-control" id="name" defaultValue={selectedContact.name} required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label text-dark">Email</label>
                                        <input type="email" name='email' className="form-control" id="email" defaultValue={selectedContact.email} required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="phone" className="form-label text-dark">Phone</label>
                                        <input type="text" name='phone' className="form-control" id="phone" defaultValue={selectedContact.phone} required />
                                    </div>

                                    <button type="submit" className="btn btn-primary" data-bs-dismiss="modal" aria-label="Close">Save</button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact;
