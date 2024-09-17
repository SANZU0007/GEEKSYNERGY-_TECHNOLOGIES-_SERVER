// controllers/userController.js
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Register a new user
export const registerUser = async (req, res) => {
    try {
        const { name, email, password, phoneNo, profession } = req.body;
        const user = new User({ name, email, password, phoneNo, profession });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ error: 'Error registering user' });
    }
};

// Login user
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id }, 'secret', { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ error: 'Error logging in' });
    }
};

// Fetch all users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, '-password'); // Exclude password
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching users' });
    }
};

// Update user data
export const updateUser = async (req, res) => {
    try {
        const { name, phoneNo } = req.body;
        await User.findByIdAndUpdate(req.params.id, { name, phoneNo });
        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error updating user' });
    }
};

// Delete user
export const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting user' });
    }
};
