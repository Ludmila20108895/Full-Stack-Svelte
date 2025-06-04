import { r as redirect } from "../../../chunks/index.js";
import { c as connectToDatabase } from "../../../chunks/db.js";
import { P as Poi } from "../../../chunks/poi.js";
const load = async ({ locals }) => {
  if (!locals.user) throw redirect(302, "/login");
  await connectToDatabase();
  const favourites = await Poi.find({
    createdBy: locals.user.id,
    favourite: true
  }).lean();
  const formatted = favourites.map((p) => ({
    _id: p._id?.toString() || "",
    name: p.name,
    visitDate: new Date(p.visitDate).toLocaleDateString("en-GB"),
    latitude: p.latitude,
    longitude: p.longitude,
    category: p.category
  }));
  return {
    favourites: formatted
  };
};
export {
  load
};
