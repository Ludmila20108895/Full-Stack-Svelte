import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ cookies }) => {
	cookies.delete('jwt', { path: '/' });
	throw redirect(302, '/');
};
// This code handles user logout by deleting the JWT cookie and redirecting to the login page.
