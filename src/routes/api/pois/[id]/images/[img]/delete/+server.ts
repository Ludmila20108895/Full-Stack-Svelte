import { connectToDatabase } from '$lib/server/db';
import cloudinary from '$lib/server/cloudinary';
import { redirect } from '@sveltejs/kit';
import { Poi } from '$lib/server/models/poi';

export const GET = async ({
	params,
	locals
}: {
	params: { id: string; img: string };
	locals: App.Locals;
}) => {
	if (!locals.user) throw redirect(302, '/login');
	await connectToDatabase();

	const { id, img } = params;

	const poi = await Poi.findOne({ _id: id, createdBy: locals.user.id });
	if (!poi) return new Response('Not found', { status: 404 });

	const decodedUrl = decodeURIComponent(img);

	// Remove image from MongoDB
	poi.images = poi.images.filter((image: string) => image !== decodedUrl);
	await poi.save();

	// Remove image from Cloudinary
	try {
		const url = new URL(decodedUrl);
		const parts = url.pathname.split('/');
		const filename = parts.pop(); // get the last part of the path
		const folder = parts.slice(3).join('/'); // remove the first three segments (cloudinary, v1, and the folder name)
		const publicId = `${folder}/${filename?.split('.')[0]}`; // remove the file extension

		await cloudinary.uploader.destroy(publicId); // delete the image from Cloudinary
	} catch (err) {
		console.error('Cloudinary deletion failed:', err);
	}

	// Redirect back to the POI page
	return new Response(null, {
		status: 303,
		headers: {
			Location: `/added-places/${id}`
		}
	});
};
// This code handles the deletion of an image associated with a POI, ensuring the user is authenticated and the POI belongs to them.
