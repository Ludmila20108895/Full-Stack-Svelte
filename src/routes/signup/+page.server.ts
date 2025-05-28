import { fail, redirect } from '@sveltejs/kit';
import { connectToDatabase, userSchema } from '$lib';

import bcrypt from 'bcryptjs';

import mongoose from 'mongoose';
import type { RequestEvent } from '@sveltejs/kit';

const User =
	mongoose.models.User ||
	mongoose.model(
		'User',
		new mongoose.Schema({
			firstName: String,
			lastName: String,
			email: { type: String, unique: true },
			password: String
		})
	);

export const actions = {
	default: async ({ request }: RequestEvent) => {
		const formData = Object.fromEntries(await request.formData());

		// Validate input using Joi
		const { error, value } = userSchema.validate({
			name: formData.firstName + ' ' + formData.lastName,
			email: formData.email,
			password: formData.password
		});

		if (error) {
			return fail(400, {
				message: error.details[0].message, // Return the first validation error
				data: formData
			});
		}

		await connectToDatabase();

		// Check if user already exists
		const existing = await User.findOne({ email: value.email });
		if (existing) {
			return fail(400, {
				message: 'Email is already registered.',
				data: formData
			});
		}

		// Hash password
		const hashedPassword = await bcrypt.hash(value.password, 10);

		await User.create({
			firstName: formData.firstName,
			lastName: formData.lastName,
			email: value.email,
			password: hashedPassword
		});

		// Redirect to login after signup
		throw redirect(302, '/login');
	}
};

// This code handles the signup process, including form validation, user creation, and redirection to the login page after successful signup.
