import { j as json } from "../../../../../chunks/index.js";
import "../../../../../chunks/userSchema.js";
import { c as connectToDatabase } from "../../../../../chunks/db.js";
import { c as createToken } from "../../../../../chunks/jwt.js";
import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  // Firebase UID
  email: { type: String, required: true, unique: true },
  name: { type: String }
});
const User = mongoose.models.User || mongoose.model("User", userSchema);
const POST = async ({ request, cookies }) => {
  try {
    const { uid, email, name } = await request.json();
    if (!uid || !email) {
      return json({ error: "Missing fields" }, { status: 400 });
    }
    await connectToDatabase();
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        email,
        name,
        firebaseUid: uid
        // Optional field to track Firebase users
      });
      console.log("Created new user:", email);
    } else {
      console.log("User already existed, continuing login:", email);
    }
    const token = createToken({ id: user._id, email: user.email });
    cookies.set("jwt", token, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: false,
      // set to true in production
      maxAge: 60 * 60 * 24
    });
    return json({ success: true });
  } catch (err) {
    console.error("Failed to save user:", err);
    return json({ error: "Server error" }, { status: 500 });
  }
};
export {
  POST
};
