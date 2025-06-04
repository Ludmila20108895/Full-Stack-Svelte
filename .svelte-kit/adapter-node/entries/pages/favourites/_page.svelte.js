import { f as ensure_array_like, e as escape_html, d as attr, h as bind_props, c as pop, p as push } from "../../../chunks/index2.js";
/* empty css                      */
import { N as NavbarLoggedIn } from "../../../chunks/NavbarLoggedIn.js";
import { F as Footer } from "../../../chunks/Footer.js";
function _page($$payload, $$props) {
  push();
  let data = $$props["data"];
  NavbarLoggedIn($$payload);
  $$payload.out += `<!----> <section class="section"><div class="container"><h1 class="title is-2 has-text-weight-bold has-text-primary has-text-centered">❤️ My Favourite Places</h1> <div class="columns"><div class="column is-half"><div class="box has-background-light p-5"><h2 class="title is-4 has-text-primary">🗺️ Location on Map</h2> <div style="height: 400px;"></div></div></div> <div class="column is-half"><div class="box has-background-light p-5"><h2 class="title is-4 has-text-primary">📍 Favourite Places</h2> `;
  if (data.favourites.length > 0) {
    $$payload.out += "<!--[-->";
    const each_array = ensure_array_like(data.favourites);
    $$payload.out += `<div style="max-height: 400px; overflow-y: auto;"><table class="table is-fullwidth is-striped"><tbody><!--[-->`;
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let poi = each_array[$$index];
      $$payload.out += `<tr><td><strong>${escape_html(poi.name)}</strong></td><td><strong>${escape_html(poi.visitDate)}</strong></td><td class="has-text-right"><a${attr("href", `/added-places/${poi._id}`)} class="button is-warning is-rounded mr-2" title="View Details" aria-label="View Details"><span class="icon"><i class="fa-solid fa-folder-open"></i></span></a> <form method="POST"${attr("action", `/api/pois/${poi._id}/favourite`)} style="display:inline;"></form></td></tr>`;
    }
    $$payload.out += `<!--]--></tbody></table></div>`;
  } else {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<p class="has-text-grey-light">You haven't added any favourites yet.</p>`;
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
