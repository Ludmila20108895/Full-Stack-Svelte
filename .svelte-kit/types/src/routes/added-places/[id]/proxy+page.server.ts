// @ts-nocheck
import type { PageServerLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';
import { connectToDatabase } from '$lib/db';

import { Poi } from '$lib/server/models/poi';
import { getWeather } from '$lib/server/weather';

import mongoose from 'mongoose';

type PoiData = {
	_id: mongoose.Types.ObjectId | string;
	name: string;
	visitDate: Date | string;
	latitude: number;
	longitude: number;
	category: string;
	createdBy: string;
	favourite: boolean;
	images?: string[];
};

export const load = async ({ params, locals }: Parameters<PageServerLoad>[0]) => {
	if (!locals.user) throw redirect(302, '/login');

	await connectToDatabase();

	const poi = (await Poi.findOne({
		_id: params.id,
		createdBy: locals.user.id
	}).lean()) as PoiData | null;

	if (!poi) {
		throw error(404, 'Place not found');
	}
	let weather = null;
	if (poi.latitude && poi.longitude) {
		try {
			weather = await getWeather(poi.latitude, poi.longitude);
		} catch (err) {
			console.error('Weather fetch failed:', err);
		}
	}

	return {
		poi: {
			...poi,
			_id: poi._id.toString(),
			visitDate: new Date(poi.visitDate).toLocaleDateString('en-GB'),
			images: poi.images || []
		},
		weather: weather || null
	};
};
// This code retrieves a specific place (POI) by its ID, ensuring the user is authenticated and the place belongs to them.
