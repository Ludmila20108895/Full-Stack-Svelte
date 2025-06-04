import { c as connectToDatabase } from "../../../../../../chunks/db.js";
import { r as redirect } from "../../../../../../chunks/index.js";
import { P as Poi } from "../../../../../../chunks/poi.js";
const POST = async ({ params, locals }) => {
  if (!locals.user) throw redirect(302, "/login");
  await connectToDatabase();
  const poi = await Poi.findOne({ _id: params.id, createdBy: locals.user.id });
  if (!poi) return new Response("Not found", { status: 404 });
  poi.favourite = !poi.favourite;
  await poi.save();
  return new Response(JSON.stringify({ success: true, favourite: poi.favourite }), {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    }
  });
};
export {
  POST
};
