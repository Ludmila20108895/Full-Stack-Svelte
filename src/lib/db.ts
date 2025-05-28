import mongoose from 'mongoose'; // Import mongoose for MongoDB interaction
import { MONGODB_URI } from '$env/static/private'; // Import the MongoDB connection string from environment variables

let isConnected = false; // Track connection status

export async function connectToDatabase() {
	if (isConnected) return;

	if (!MONGODB_URI) throw new Error('MongoDB connection string is not defined');

	await mongoose.connect(MONGODB_URI);
	isConnected = true;
}
