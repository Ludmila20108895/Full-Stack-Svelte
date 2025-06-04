import { c as connectToDatabase } from "../../../../chunks/db.js";
import { P as Poi } from "../../../../chunks/poi.js";
const GET = async () => {
  await connectToDatabase();
  const pois = await Poi.find().lean();
  return new Response(JSON.stringify(pois), {
    status: 200,
    // HTTP status code for OK
    headers: {
      "Content-Type": "application/json"
      // Set the content type to JSON
    }
  });
};
export {
  GET
};
