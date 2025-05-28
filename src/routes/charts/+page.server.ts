// This file initializes Firebase and exports the auth and GitHub provider instances
import { connectToDatabase } from '$lib/db';
import { Poi } from '$lib/server/models/poi';
import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	if (!locals.user) {
		throw redirect(302, '/login');
	}

	await connectToDatabase();
	const pois = await Poi.find({ createdBy: locals.user.id }).lean();

	return {
		pois: pois.map((p) => ({
			name: p.name,
			visitDate: p.visitDate,
			category: p.category
		}))
	};
};
