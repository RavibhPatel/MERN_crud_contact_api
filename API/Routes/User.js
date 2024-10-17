import {addUser , getAllUser} from '../Controller/User.js';
import express from 'express';

const router = express.Router();


// Get all users    
router.get('/', getAllUser);

// Create a new user
router.post('/create' , addUser);


export default router;
