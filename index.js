import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'; // Import cors

import userRoutes from './routes/userRoutes.js';

// Load environment variables
dotenv.config();



const app = express();
app.use(express.json());
app.use(cors()); // Use cors middleware

// Use environment variable for MongoDB connection
const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT || 6000;

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch((error) => console.log('MongoDB connection error:', error));

// Use user routes
app.use('/', userRoutes);

app.listen(port, () => console.log(`Server running on port ${port}`));
