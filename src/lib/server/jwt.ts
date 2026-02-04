import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '$env/dynamic/private';


interface JwtPayload {
	id: string;
	email: string;
}

export function createToken(payload: JwtPayload): string {
	if (!JWT_SECRET) {
		throw new Error('JWT_SECRET is not set');
	}

	return jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });
}

export function verifyToken(token: string): JwtPayload | null {
	if (!JWT_SECRET) return null;

	try {
		return jwt.verify(token, JWT_SECRET) as JwtPayload;
	} catch {
		return null;
	}
}
