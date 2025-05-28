import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	uid: { type: String, required: true, unique: true }, // Firebase UID
	email: { type: String, required: true, unique: true },
	name: { type: String }
});

export const User = mongoose.models.User || mongoose.model('User', userSchema);
