import mongoose from 'mongoose';
import { MONGODB_URI } from '$env/dynamic/private';

export async function connectToDatabase() {
	if (mongoose.connection.readyState >= 1) return;

	if (!MONGODB_URI) {
		throw new Error('MONGODB_URI is not set');
	}

	await mongoose.connect(MONGODB_URI);
}

