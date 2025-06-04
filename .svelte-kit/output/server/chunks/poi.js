import mongoose from "mongoose";
const PoiSchema = new mongoose.Schema({
  name: String,
  visitDate: Date,
  latitude: Number,
  longitude: Number,
  category: String,
  createdBy: String,
  favourite: Boolean,
  images: [String]
});
const Poi = mongoose.models.Poi || mongoose.model("Poi", PoiSchema);
export {
  Poi as P
};
