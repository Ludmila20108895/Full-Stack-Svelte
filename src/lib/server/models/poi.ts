import mongoose from 'mongoose';

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

export const Poi = mongoose.models.Poi || mongoose.model('Poi', PoiSchema);
// This code defines a Mongoose schema for Points of Interest (POI) with fields for name, visit date, location, category, creator, favorite status, and images.
