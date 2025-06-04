import { d as attr, f as ensure_array_like, e as escape_html, i as attr_class, j as clsx, h as bind_props, c as pop, p as push } from "../../../../chunks/index2.js";
import { N as NavbarLoggedIn } from "../../../../chunks/NavbarLoggedIn.js";
import { F as Footer } from "../../../../chunks/Footer.js";
function _page($$payload, $$props) {
  push();
  let data = $$props["data"];
  NavbarLoggedIn($$payload);
  $$payload.out += `<!----> <section class="section"><div class="container"><h1 class="title is-2 has-text-weight-bold has-text-primary has-text-centered">🏙️ Add New Visited Place</h1> <div class="columns"><div class="column is-half"><div class="box has-background-light p-5"><h2 class="title is-4 has-text-primary">Place Details</h2> <form method="POST" action="?/add"><div class="field"><label class="label" for="name"><strong class="has-text-weight-bold">Place Name</strong></label> <div class="control"><input id="name" class="input" type="text" name="name" required/></div></div> <div class="field"><label class="label" for="visitDate"><strong class="has-text-weight-bold">Date of Visit</strong></label> <div class="control"><input id="visitDate" type="date" name="visitDate" class="input" required/></div></div> <div class="field"><label class="label" for="latitude"><strong class="has-text-weight-bold">Latitude</strong></label> <div class="control"><input id="latitude" class="input" type="number" step="any" name="latitude" required/></div></div> <div class="field"><label class="label" for="longitude"><strong class="has-text-weight-bold">Longitude</strong></label> <div class="control"><input id="longitude" class="input" type="number" step="any" name="longitude" required/></div></div> <input type="hidden" name="category"${attr("value", data.category)}/> <button class="button is-primary is-fullwidth">Add Place</button></form></div></div> <div class="column is-half"><div class="box has-background-light p-5"><h2 class="title is-4 has-text-primary">📍 Visited Places</h2> `;
  if (data.pois.length > 0) {
    $$payload.out += "<!--[-->";
    const each_array = ensure_array_like(data.pois);
    $$payload.out += `<div style="max-height: 400px; overflow-y: auto; border: 1px solid #ddd;"><table class="table is-fullwidth is-striped"><tbody><!--[-->`;
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let poi = each_array[$$index];
      $$payload.out += `<tr><td><strong class="has-text-weight-bold">${escape_html(poi.name)}</strong></td><td><strong class="has-text-weight-bold">${escape_html(poi.visitDate)}</strong></td><td class="has-text-right has-text-weight-semibold"><a class="button is-warning is-rounded mr-2"${attr("href", `/added-places/${poi._id}`)} aria-label="View details"><span class="icon"><i class="fa-solid fa-folder-open"></i></span></a> <form method="POST" action="?/delete" style="display:inline;"><input type="hidden" name="id"${attr("value", poi._id)}/> <button class="button is-warning is-rounded mr-2" aria-label="Delete place"><span class="icon"><i class="fas fa-trash"></i></span></button></form> <button class="button is-warning is-rounded" aria-label="Toggle favourite"><span class="icon"><i${attr_class(clsx(poi.favourite ? "fa-solid fa-heart has-text-danger" : "fa-regular fa-heart"))}></i></span></button></td></tr>`;
    }
    $$payload.out += `<!--]--></tbody></table></div>`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<p class="has-text-grey-light">No places added yet.</p>`;
  }
  $$payload.out += `<!--]--></div></div></div></div></section> `;
  Footer($$payload);
  $$payload.out += `<!---->`;
  bind_props($$props, { data });
  pop();
}
export {
  _page as default
};
