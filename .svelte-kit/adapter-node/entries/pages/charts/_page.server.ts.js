import { c as connectToDatabase } from "../../../chunks/db.js";
import { P as Poi } from "../../../chunks/poi.js";
import { r as redirect } from "../../../chunks/index.js";
const load = async ({ locals }) => {
  if (!locals.user) {
    throw redirect(302, "/login");
  }
  await connectToDatabase();
  const pois = await Poi.find({ createdBy: locals.user.id }).lean();
  return {
    pois: pois.map((p) => ({
      name: p.name,
      visitDate: p.visitDate,
      category: p.category
    }))
  };
};
export {
  load
};
