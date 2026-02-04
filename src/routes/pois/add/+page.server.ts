import { redirect } from '@sveltejs/kit';

import type { Actions, PageServerLoad } from './$types';
import { connectToDatabase } from '$lib/server/db';
import { Poi } from '$lib/server/models/poi';

export const load: PageServerLoad = async ({ url, locals }) => {
	const category = url.searchParams.get('category') || '';
	if (!locals.user) throw redirect(302, '/login');

	await connectToDatabase();

	// Fetch POIs based on the category and user
	const pois = await Poi.find({
		createdBy: locals.user.id,
		category // Filter by category if provided
	}).lean();

	return {
		category,
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		pois: pois.map((p: any) => ({
			_id: p._id.toString(),
			name: p.name,
			visitDate: new Date(p.visitDate).toLocaleDateString('en-GB'),
			favourite: p.favourite ?? false
		}))
	};
};

export const actions: Actions = {
	/** Add new POI */
	add: async ({ request, locals }) => {
		if (!locals.user) throw redirect(302, '/login');
		await connectToDatabase();

		const formData = await request.formData();

		const newPoi = new Poi({
			name: formData.get('name'),
			visitDate: formData.get('visitDate'),
			latitude: parseFloat(formData.get('latitude') as string),
			longitude: parseFloat(formData.get('longitude') as string),
			category: formData.get('category'),
			createdBy: locals.user.id,
			favourite: false
		});

		await newPoi.save();
		throw redirect(303, `/pois/add?category=${formData.get('category')}`);
	},

	/** Delete POI */
	delete: async ({ request, locals }) => {
		if (!locals.user) throw redirect(302, '/login');
		await connectToDatabase();

		const formData = await request.formData();
		const id = formData.get('id');

		if (id) {
			await Poi.findOneAndDelete({ _id: id, createdBy: locals.user.id });
		}

		// Redirect to the referer or default to /pois
		const referer = request.headers.get('referer') ?? '/pois';
		const url = new URL(referer);
		const category = url.searchParams.get('category') ?? '';
		throw redirect(303, `/pois/add?category=${category}`);
	}
};
// This code handles the addition and deletion of Points of Interest (POIs) in a SvelteKit application.
