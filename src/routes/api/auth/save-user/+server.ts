import { json } from '@sveltejs/kit';
import { connectToDatabase, createToken } from '$lib';
import { User } from '$lib/server/models/user';

export const POST = async ({ request, cookies }) => {
	try {
		const { uid, email, name } = await request.json();

		if (!uid || !email) {
			return json({ error: 'Missing fields' }, { status: 400 });
		}

		await connectToDatabase();

		let user = await User.findOne({ email });

		if (!user) {
			user = await User.create({
				email,
				name,
				firebaseUid: uid // Optional field to track Firebase users
			});
			console.log('Created new user:', email);
		} else {
			console.log('User already existed, continuing login:', email);
		}

		// Generate JWT token
		const token = createToken({ id: user._id, email: user.email });

		// Set token as cookie
		cookies.set('jwt', token, {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: process.env.NODE_ENV === 'production',
			maxAge: 60 * 60 * 24
		});

		return json({ success: true });
	} catch (err) {
		console.error('Failed to save user:', err);
		return json({ error: 'Server error' }, { status: 500 });
	}
};
