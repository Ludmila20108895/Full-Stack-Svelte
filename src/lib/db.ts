import mongoose from 'mongoose'; // Import mongoose for MongoDB interaction
import { MONGO_URI } from '$env/static/private'; // Import the MongoDB connection string from environment variables

let isConnected = false; // Track connection status

export async function connectToDatabase() {
	if (isConnected) return;

	if (!MONGO_URI) throw new Error('MongoDB connection string is not defined');

	await mongoose.connect(MONGO_URI);
	isConnected = true;
}
