import express from 'express';
import { addContact, deleteContact, editContact, getAllContact } from '../Controller/Contact.js';


const router = express.Router();

// Get all contacts
router.get('/', getAllContact);

// Add a new contact
router.post('/add', addContact);

// Edit a contact
router.put('/update/:id' , editContact)

// Delete a contact
router.delete('/delete/:id', deleteContact);


export default router;