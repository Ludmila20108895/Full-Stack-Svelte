import { connectToDatabase } from '$lib/server/db'; // Import the database connection utility
import { verifyToken } from '$lib/jwt'; // Import the JWT verification utility
import type { Handle } from '@sveltejs/kit'; // Import the Handle type from SvelteKit for type safety
import 'dotenv/config';

export const handle: Handle = async ({ event, resolve }) => {
	// Connect to the database before handling the request
	await connectToDatabase();

	const token = event.cookies.get('jwt'); // Retrieve the JWT from cookies

	if (token) {
		const user = verifyToken(token); // Verify the JWT and extract user information
		if (user) {
			event.locals.user = user; // Attach the user information to the event locals for later use
		}
	}

	return resolve(event); // Proceed with resolving the request
};
