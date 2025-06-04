import { c as connectToDatabase } from "../../../../../../../../chunks/db2.js";
import "../../../../../../../../chunks/cloudinary.js";
import { r as redirect } from "../../../../../../../../chunks/index.js";
import { P as Poi } from "../../../../../../../../chunks/poi.js";
import { v2 } from "cloudinary";
const GET = async ({
  params,
  locals
}) => {
  if (!locals.user) throw redirect(302, "/login");
  await connectToDatabase();
  const { id, img } = params;
  const poi = await Poi.findOne({ _id: id, createdBy: locals.user.id });
  if (!poi) return new Response("Not found", { status: 404 });
  const decodedUrl = decodeURIComponent(img);
  poi.images = poi.images.filter((image) => image !== decodedUrl);
  await poi.save();
  try {
    const url = new URL(decodedUrl);
    const parts = url.pathname.split("/");
    const filename = parts.pop();
    const folder = parts.slice(3).join("/");
    const publicId = `${folder}/${filename?.split(".")[0]}`;
    await v2.uploader.destroy(publicId);
  } catch (err) {
    console.error("Cloudinary deletion failed:", err);
  }
  return new Response(null, {
    status: 303,
    headers: {
      Location: `/added-places/${id}`
    }
  });
};
export {
  GET
};
