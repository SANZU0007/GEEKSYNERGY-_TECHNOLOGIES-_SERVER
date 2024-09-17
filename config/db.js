import mongoose from 'mongoose';

const MONGO_URL = 'mongodb+srv://sanjay:sanjay2023@cluster0.tjzm3y1.mongodb.net/bookingApplication?retryWrites=true&w=majority&appName=Cluster0'; // Database name 'bookingApplication' added

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URL, { useNewUrlParser: true });
        console.log('Connected to MongoDB successfully');
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        process.exit(1); // Exit process if unable to connect to DB
    }
};

export default connectDB;
