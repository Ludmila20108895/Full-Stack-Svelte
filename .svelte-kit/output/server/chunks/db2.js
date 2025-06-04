import "dotenv/config";
import mongoose from "mongoose";
async function connectToDatabase() {
  if (mongoose.connection.readyState >= 1) return;
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not set in .env");
  await mongoose.connect(uri);
}
export {
  connectToDatabase as c
};
