import jwt from 'jsonwebtoken';
import { env } from '$env/dynamic/private';

interface JwtPayload {
	id: string;
	email: string;
}

export function createToken(payload: JwtPayload): string {
	const secret = env.JWT_SECRET;

	if (!secret) {
		throw new Error('JWT_SECRET is not set');
	}

	return jwt.sign(payload, secret, { expiresIn: '1d' });
}

export function verifyToken(token: string): JwtPayload | null {
	const secret = env.JWT_SECRET;
	if (!secret) return null;

	try {
		return jwt.verify(token, secret) as JwtPayload;
	} catch {
		return null;
	}
}
