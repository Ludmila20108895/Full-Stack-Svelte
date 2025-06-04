import { r as redirect, e as error } from "../../../../../../chunks/index.js";
import { c as connectToDatabase } from "../../../../../../chunks/db2.js";
import { P as Poi } from "../../../../../../chunks/poi.js";
import "../../../../../../chunks/cloudinary.js";
import { v2 } from "cloudinary";
const POST = async ({ params, request, locals }) => {
  if (!locals.user) throw redirect(302, "/login");
  await connectToDatabase();
  const formData = await request.formData();
  const files = formData.getAll("images");
  const poi = await Poi.findById(params.id);
  if (!poi || poi.createdBy.toString() !== locals.user.id) {
    throw error(403, "Unauthorized or POI not found");
  }
  const uploadedImages = [];
  for (const file of files) {
    if (file instanceof File) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const base64 = buffer.toString("base64");
      const dataURI = `data:${file.type};base64,${base64}`;
      const res = await v2.uploader.upload(dataURI, {
        folder: `explorer/${params.id}`
      });
      uploadedImages.push(res.secure_url);
    }
  }
  poi.images = [...poi.images || [], ...uploadedImages];
  await poi.save();
  throw redirect(303, `/added-places/${params.id}`);
};
export {
  POST
};
