import {addUser , getAllUser, loginUser, getUserById} from '../Controller/User.js';
import express from 'express';

const router = express.Router();


// Get all users    
router.get('/', getAllUser);

// Create a new user
router.post('/create' , addUser);

// Log in user
router.post('/login' , loginUser);

// Get user by ID
router.get('/:id', getUserById);

export default router;
