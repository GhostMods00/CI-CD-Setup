import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/techquiz';

// Add connection options to handle the retryWrites error
mongoose.connect(MONGODB_URI, {
  retryWrites: true,
  w: "majority"
}).catch(error => {
  console.error('Error connecting to MongoDB:', error);
});

const db = mongoose.connection;

// Add error handling
db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

db.once('open', () => {
  console.log('Connected to MongoDB successfully');
});

export default db;