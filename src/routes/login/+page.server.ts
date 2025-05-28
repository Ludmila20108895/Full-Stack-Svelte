import { fail, redirect } from '@sveltejs/kit';
import bcrypt from 'bcryptjs';
import { connectToDatabase, createToken } from '$lib';

import mongoose from 'mongoose';
import type { RequestEvent } from '@sveltejs/kit';

const User =
	mongoose.models.User ||
	mongoose.model(
		'User',
		new mongoose.Schema({
			firstName: String,
			lastName: String,
			email: String,
			password: String
		})
	);

export const actions = {
	default: async ({ request, cookies }: RequestEvent) => {
		const formData = await request.formData();
		const email = formData.get('email');
		const password = formData.get('password');

		if (!email || !password) {
			return fail(400, { message: 'Email and password are required' });
		}

		await connectToDatabase();

		const user = await User.findOne({ email });
		if (!user) {
			return fail(400, { message: 'Invalid credentials' });
		}

		const valid = await bcrypt.compare(password.toString(), user.password);
		if (!valid) {
			return fail(400, { message: 'Invalid credentials' });
		}

		const token = createToken({ id: user._id, email: user.email });

		cookies.set('jwt', token, {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: false, // change to true in production
			maxAge: 60 * 60 * 24 // 1 day
		});

		throw redirect(302, '/pois');
	}
};
// This code handles user login by validating credentials, creating a JWT token, and setting it in cookies.
