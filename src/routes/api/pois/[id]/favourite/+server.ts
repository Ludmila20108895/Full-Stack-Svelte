import { connectToDatabase } from '$lib/db';
import type { RequestHandler } from './$types';
import { redirect } from '@sveltejs/kit';
import { Poi } from '$lib/server/models/poi';

export const POST: RequestHandler = async ({ params, locals }) => {
	if (!locals.user) throw redirect(302, '/login');
	await connectToDatabase();

	const poi = await Poi.findOne({ _id: params.id, createdBy: locals.user.id });
	if (!poi) return new Response('Not found', { status: 404 });

	poi.favourite = !poi.favourite;
	await poi.save();

	return new Response(JSON.stringify({ success: true, favourite: poi.favourite }), {
		status: 200,
		headers: {
			'Content-Type': 'application/json'
		}
	});
};
// This code toggles the favourite status of a POI and redirects to the favourites page.
