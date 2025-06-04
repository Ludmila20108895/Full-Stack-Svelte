import { f as fail, r as redirect } from "../../../chunks/index.js";
import bcrypt from "bcryptjs";
import "../../../chunks/userSchema.js";
import { c as connectToDatabase } from "../../../chunks/db.js";
import { c as createToken } from "../../../chunks/jwt.js";
import mongoose from "mongoose";
const User = mongoose.models.User || mongoose.model(
  "User",
  new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String
  })
);
const actions = {
  default: async ({ request, cookies }) => {
    const formData = await request.formData();
    const email = formData.get("email");
    const password = formData.get("password");
    if (!email || !password) {
      return fail(400, { message: "Email and password are required" });
    }
    await connectToDatabase();
    const user = await User.findOne({ email });
    if (!user) {
      return fail(400, { message: "Invalid credentials" });
    }
    const valid = await bcrypt.compare(password.toString(), user.password);
    if (!valid) {
      return fail(400, { message: "Invalid credentials" });
    }
    const token = createToken({ id: user._id, email: user.email });
    cookies.set("jwt", token, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: false,
      // change to true in production
      maxAge: 60 * 60 * 24
      // 1 day
    });
    throw redirect(302, "/pois");
  }
};
export {
  actions
};
