// routes/userRoutes.js
import express from 'express';
import { registerUser, loginUser, getAllUsers, updateUser, deleteUser } from '../controllers/userController.js';

const router = express.Router();

// Register User
router.post('/register', registerUser);

// Login User
router.post('/login', loginUser);

// Get All Users
router.get('/users', getAllUsers);

// Update User
router.put('/users/:id', updateUser);

// Delete User
router.delete('/users/:id', deleteUser);

export default router;
