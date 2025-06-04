import { r as redirect } from "../../../../chunks/index.js";
import { c as connectToDatabase } from "../../../../chunks/db.js";
import { P as Poi } from "../../../../chunks/poi.js";
const load = async ({ url, locals }) => {
  const category = url.searchParams.get("category") || "";
  if (!locals.user) throw redirect(302, "/login");
  await connectToDatabase();
  const pois = await Poi.find({
    createdBy: locals.user.id,
    category
    // Filter by category if provided
  }).lean();
  return {
    category,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    pois: pois.map((p) => ({
      _id: p._id.toString(),
      name: p.name,
      visitDate: new Date(p.visitDate).toLocaleDateString("en-GB"),
      favourite: p.favourite ?? false
    }))
  };
};
const actions = {
  /** Add new POI */
  add: async ({ request, locals }) => {
    if (!locals.user) throw redirect(302, "/login");
    await connectToDatabase();
    const formData = await request.formData();
    const newPoi = new Poi({
      name: formData.get("name"),
      visitDate: formData.get("visitDate"),
      latitude: parseFloat(formData.get("latitude")),
      longitude: parseFloat(formData.get("longitude")),
      category: formData.get("category"),
      createdBy: locals.user.id,
      favourite: false
    });
    await newPoi.save();
    throw redirect(303, `/pois/add?category=${formData.get("category")}`);
  },
  /** Delete POI */
  delete: async ({ request, locals }) => {
    if (!locals.user) throw redirect(302, "/login");
    await connectToDatabase();
    const formData = await request.formData();
    const id = formData.get("id");
    if (id) {
      await Poi.findOneAndDelete({ _id: id, createdBy: locals.user.id });
    }
    const referer = request.headers.get("referer") ?? "/pois";
    const url = new URL(referer);
    const category = url.searchParams.get("category") ?? "";
    throw redirect(303, `/pois/add?category=${category}`);
  }
};
export {
  actions,
  load
};
