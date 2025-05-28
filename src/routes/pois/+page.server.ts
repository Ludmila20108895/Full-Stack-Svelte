// src/routes/pois/+page.server.ts
import { redirect } from '@sveltejs/kit';
import { connectToDatabase } from '$lib/db';
import { Poi } from '$lib/server/models/poi';

export const load = async ({ locals }) => {
	if (!locals.user) {
		throw redirect(302, '/login');
	}

	await connectToDatabase();

	const pois = await Poi.find({ createdBy: locals.user.id }).lean();

	return {
		user: locals.user,
		pois: pois.map((p) => ({
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			_id: (p as { _id: any })._id.toString(),
			name: p.name,
			visitDate: new Date(p.visitDate).toISOString().split('T')[0],
			category: p.category,
			latitude: p.latitude,
			longitude: p.longitude
		}))
	};
};
