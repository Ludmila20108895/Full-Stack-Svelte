import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { connectToDatabase } from '$lib/server/db';
import { Poi } from '$lib/server/models/poi';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) throw redirect(302, '/login');

	await connectToDatabase();

	const favourites = await Poi.find({
		createdBy: locals.user.id,
		favourite: true
	}).lean();

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const formatted = favourites.map((p: any) => ({
		_id: p._id?.toString() || '',
		name: p.name,
		visitDate: new Date(p.visitDate).toLocaleDateString('en-GB'),
		latitude: p.latitude,
		longitude: p.longitude,
		category: p.category
	}));

	return {
		favourites: formatted
	};
};
