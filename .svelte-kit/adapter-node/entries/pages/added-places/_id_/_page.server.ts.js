import { r as redirect, e as error } from "../../../../chunks/index.js";
import { V as VITE_OPENWEATHER_API_KEY, c as connectToDatabase } from "../../../../chunks/db.js";
import { P as Poi } from "../../../../chunks/poi.js";
import "mongoose";
const API_KEY = VITE_OPENWEATHER_API_KEY;
async function getWeather(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch weather");
  }
  const data = await res.json();
  return {
    temperature: data.main.temp,
    description: data.weather[0].description,
    icon: data.weather[0].icon
  };
}
const load = async ({ params, locals }) => {
  if (!locals.user) throw redirect(302, "/login");
  await connectToDatabase();
  const poi = await Poi.findOne({
    _id: params.id,
    createdBy: locals.user.id
  }).lean();
  if (!poi) {
    throw error(404, "Place not found");
  }
  let weather = null;
  if (poi.latitude && poi.longitude) {
    try {
      weather = await getWeather(poi.latitude, poi.longitude);
    } catch (err) {
      console.error("Weather fetch failed:", err);
    }
  }
  return {
    poi: {
      ...poi,
      _id: poi._id.toString(),
      visitDate: new Date(poi.visitDate).toLocaleDateString("en-GB"),
      images: poi.images || []
    },
    weather: weather || null
  };
};
export {
  load
};
