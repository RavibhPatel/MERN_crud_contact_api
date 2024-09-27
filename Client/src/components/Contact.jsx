import React, { useEffect , useState } from 'react';
import axios from 'axios';
import AddContact from './AddContact';

const Contact = () => {
    const url = 'http://localhost:2000';
    const [contacts, setContacts] = useState([]);
    useEffect(() =>{
        const fetchData = async () => {
            try {
                const response = await axios.get(`${url}/`,{headers: {"contentType": "application/json"}});
                console.log(response.data.contacts);
                setContacts(response.data.contacts);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    },[]);

    const deleteContact = async (id) => {
        try {
            await axios.delete(`${url}/delete/${id}`,{headers: {"contentType": "application/json"}});
            const updatedContacts = contacts.filter(contact => contact._id!== id);
            setContacts(updatedContacts);
        } catch (error) {
            console.error(error);
        }
    }

    const handelEditForm = async (e,id) => {
        e.preventDefault();
        
    }
    
  return (
    <div className='container my-5'>
        <div className='row justify-content-center gy-5'>
            <div className='col-12 '>
                <AddContact/>
            </div>
            {contacts.map(contact =>
                <div className='col-12 col-md-10 col-lg-7' key={contact._id} style={{borderRadius: '10px', border : '3px solid yellow'}}>
                    <div className='d-flex align-items-center justify-content-between p-5'>
                        <div className=' text-start'>
                            <h3 className='mb-3 fw-bold fs-3'>{contact.name}</h3>
                            <p className='mb-3'>{contact.email}</p>
                            <p className='mb-0'>{contact.email}</p>
                        </div>
                        <div className='d-flex flex-column align-items-center justify-content-center'>
                            {/* <!-- Button trigger modal --> */}
                            <button type="button" className='btn btn-info mb-3' onClick={()=>editContact(contact._id)} data-bs-toggle="modal" data-bs-target="#editContactModal">
                                Edit
                            </button>

                            {/* <!-- Modal --> */}
                            <div className="modal fade" id="editContactModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="editContactModalLabel" aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h1 className="modal-title fs-5 text-dark" id="editContactModalLabel">Edit Contact</h1>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <form onSubmit={handelEditForm}>
                                                <div className="mb-3">
                                                    <label htmlFor="name" className="form-label text-dark">Name</label>
                                                    <input type="email" name='name' className="form-control" id="name" aria-describedby="emailHelp" required/>
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="email" className="form-label text-dark">Email</label>
                                                    <input type="email" name='email' className="form-control" id="email" aria-describedby="emailHelp" required/>
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="phone" className="form-label text-dark">Phone</label>
                                                    <input type="text" name='phone' className="form-control" id="phone" required />
                                                </div>
                                            
                                                <button type="submit" className="btn btn-primary">Submit</button>
                                            </form>
                                        </div>                                    
                                    </div>
                                </div>
                            </div>
                            
                            
                            <button className='btn btn-danger ms-2'onClick={ ()=>deleteContact(contact._id)} >Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    </div>
  )
}

export default Contact