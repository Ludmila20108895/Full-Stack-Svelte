import { User } from './models/user';

export const generateIdFromUserInfo = (email: string) => {
	return email.split('@')[0]; // Generates a simple ID based on the email prefix
};
export const getExistingUser = async (githubId: string) => {
	return await User.findOne({ githubId });
};

export const createUser = async ({
	githubId,
	email,
	name
}: {
	githubId: string;
	email: string;
	name: string;
}) => {
	const user = new User({
		id: crypto.randomUUID(), // or your custom ID generator
		githubId,
		email,
		name
	});
	await user.save();
	return user;
};
