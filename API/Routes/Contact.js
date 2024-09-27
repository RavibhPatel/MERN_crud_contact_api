import express from 'express';
import { getAllContact } from '../Controller/Contact.js';

const router = express.Router();

// Get all contacts
router.get('/home', getAllContact);

export default router;