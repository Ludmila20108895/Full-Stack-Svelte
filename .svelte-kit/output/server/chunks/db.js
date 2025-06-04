import mongoose from "mongoose";
const MONGODB_URI = "mongodb+srv://explorerUser:MyPassword123@cluster0.x9dqzbj.mongodb.net/explorer?retryWrites=true&w=majority&appName=Cluster0";
const VITE_OPENWEATHER_API_KEY = "4977adfd49f60f08e25e4a043454a50f";
let isConnected = false;
async function connectToDatabase() {
  if (isConnected) return;
  await mongoose.connect(MONGODB_URI);
  isConnected = true;
}
export {
  VITE_OPENWEATHER_API_KEY as V,
  connectToDatabase as c
};
