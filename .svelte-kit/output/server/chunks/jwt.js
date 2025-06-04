import jwt from "jsonwebtoken";
import { d as private_env } from "./shared-server.js";
const JWT_SECRET = private_env.JWT_SECRET || "fallback-secret";
function createToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
}
function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}
export {
  createToken as c,
  verifyToken as v
};
