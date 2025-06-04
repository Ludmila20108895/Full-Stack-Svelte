import { f as fail, r as redirect } from "../../../chunks/index.js";
import { u as userSchema } from "../../../chunks/userSchema.js";
import { c as connectToDatabase } from "../../../chunks/db.js";
import "../../../chunks/jwt.js";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
const User = mongoose.models.User || mongoose.model(
  "User",
  new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    password: String
  })
);
const actions = {
  default: async ({ request }) => {
    const formData = Object.fromEntries(await request.formData());
    const { error, value } = userSchema.validate({
      name: formData.firstName + " " + formData.lastName,
      email: formData.email,
      password: formData.password
    });
    if (error) {
      return fail(400, {
        message: error.details[0].message,
        // Return the first validation error
        data: formData
      });
    }
    await connectToDatabase();
    const existing = await User.findOne({ email: value.email });
    if (existing) {
      return fail(400, {
        message: "Email is already registered.",
        data: formData
      });
    }
    const hashedPassword = await bcrypt.hash(value.password, 10);
    await User.create({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: value.email,
      password: hashedPassword
    });
    throw redirect(302, "/login");
  }
};
export {
  actions
};
