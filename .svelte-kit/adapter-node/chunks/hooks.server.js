import { c as connectToDatabase } from "./db2.js";
import { v as verifyToken } from "./jwt.js";
import "dotenv/config";
const handle = async ({ event, resolve }) => {
  await connectToDatabase();
  const token = event.cookies.get("jwt");
  if (token) {
    const user = verifyToken(token);
    if (user) {
      event.locals.user = user;
    }
  }
  return resolve(event);
};
export {
  handle
};
