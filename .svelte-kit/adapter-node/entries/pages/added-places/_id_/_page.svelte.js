import { e as escape_html, d as attr, f as ensure_array_like, h as bind_props, c as pop, p as push } from "../../../../chunks/index2.js";
import { N as NavbarLoggedIn } from "../../../../chunks/NavbarLoggedIn.js";
import { F as Footer } from "../../../../chunks/Footer.js";
function _page($$payload, $$props) {
  push();
  let data = $$props["data"];
  const VITE_GOOGLE_MAPS_API_KEY = "AIzaSyB1N1JCngsMi56hlZiFRlAKCUOPbw0IhEk";
  console.log("Loaded Google Maps Key:", VITE_GOOGLE_MAPS_API_KEY);
  NavbarLoggedIn($$payload);
  $$payload.out += `<!----> <section class="section"><div class="container"><h1 class="title is-2 has-text-weight-bold has-text-primary has-text-centered">📍 ${escape_html(data.poi.name)}</h1> <div class="columns"><div class="column is-half"><div class="box has-background-light p-5"><h2 class="title is-4 has-text-primary">Details</h2> <p><strong>Category:</strong> ${escape_html(data.poi.category)}</p> <p><strong>Visited on:</strong> ${escape_html(data.poi.visitDate)}</p> <hr/> <h2 class="title is-5 has-text-primary">Upload Memory Pictures</h2> <form${attr("action", `/api/pois/${data.poi._id}/upload`)} method="POST" enctype="multipart/form-data"><div class="field"><label class="label" for="images">Choose images</label> <div class="control"><input type="file" id="images" name="images" multiple class="input"/></div></div> <button type="submit" class="button is-primary is-fullwidth">Upload</button></form></div></div> <div class="column is-half"><div class="box has-background-light p-5"><h2 class="title is-4 has-text-primary">Location</h2> `;
  if (data.poi.latitude) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<iframe title="Map showing POI location" width="100%" height="200" style="border: 0" loading="lazy" referrerpolicy="no-referrer-when-downgrade"${attr("src", `https://www.google.com/maps/embed/v1/place?key=${VITE_GOOGLE_MAPS_API_KEY}&q=${data.poi.latitude},${data.poi.longitude}`)} allowfullscreen></iframe> <p class="mt-3"><a${attr("href", `https://www.google.com/maps/search/?api=1&query=${data.poi.latitude},${data.poi.longitude}`)} target="_blank" class="button is-primary is-fullwidth" aria-label="Open in Google Maps">Open in Google Maps 🌍</a></p>`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<p class="has-text-danger">No location data available.</p>`;
  }
  $$payload.out += `<!--]--> `;
  if (data.weather) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="notification is-info mt-4 weather-box is-fullwidth svelte-1i0e5r6"><div class="weather-inline svelte-1i0e5r6"><span><strong>Current Weather:</strong> ${escape_html(data.weather.description)} – ${escape_html(data.weather.temperature)}°C</span> <img${attr("src", `https://openweathermap.org/img/wn/${data.weather.icon}@2x.png`)} alt="Weather icon" style="width: 30px; height: 30px; margin-left: 8px;"/></div></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--></div></div></div> <div class="box mt-5"><h2 class="title is-4 has-text-primary">Photo Album</h2> `;
  if (data.poi.images.length > 0) {
    $$payload.out += "<!--[-->";
    const each_array = ensure_array_like(data.poi.images);
    $$payload.out += `<div style="overflow-x: auto; white-space: nowrap; padding: 10px 0;"><!--[-->`;
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let img = each_array[$$index];
      $$payload.out += `<div style="display:inline-block; margin-right:15px; width:150px; height:150px; position:relative;"><a${attr("href", img)} target="_blank" title="View Full Image"><img${attr("src", img)} alt="" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;"/></a> <form method="GET"${attr("action", `/api/pois/${data.poi._id}/images/${encodeURIComponent(img)}/delete`)} style="position: absolute; bottom: 5px; right: 5px; margin: 0;"><button type="submit" class="button is-warning is-rounded is-small delete-button" title="Delete this image"><span class="icon is-small"><i class="fas fa-trash"></i></span></button></form></div>`;
    }
    $$payload.out += `<!--]--></div>`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<p class="has-text-grey-light">No images uploaded yet.</p>`;
  }
  $$payload.out += `<!--]--></div> <div class="has-text-centered mt-5"><a${attr("href", `/pois/add?category=${data.poi.category}`)} class="button is-primary" aria-label="Back to My Places">⬅ Back to My Places</a></div></div></section> `;
  Footer($$payload);
  $$payload.out += `<!---->`;
  bind_props($$props, { data });
  pop();
}
export {
  _page as default
};
