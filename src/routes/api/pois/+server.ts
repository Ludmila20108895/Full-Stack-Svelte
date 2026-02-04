import type { RequestHandler } from '@sveltejs/kit';
import { connectToDatabase } from '$lib/server/db';
import { Poi } from '$lib/server/models/poi';

// Define the Poi model schema

export const GET: RequestHandler = async () => {
	await connectToDatabase(); // Ensure the database connection is established
	const pois = await Poi.find().lean(); // Fetch all POIs from the database

	return new Response(JSON.stringify(pois), {
		status: 200, // HTTP status code for OK
		headers: {
			'Content-Type': 'application/json' // Set the content type to JSON
		}
	});
};
