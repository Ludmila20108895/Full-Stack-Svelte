import { i as attr_class, d as attr, f as ensure_array_like, e as escape_html, h as bind_props, c as pop, p as push } from "../../../chunks/index2.js";
import { F as Footer } from "../../../chunks/Footer.js";
/* empty css                      */
function PoiNavbar($$payload) {
  let isActive = false;
  $$payload.out += `<nav class="navbar is-primary" style="margin-bottom: 20px; padding: 15px;"><div class="container"><div class="navbar-brand"><a class="navbar-item" href="/"><img src="/images/explorer-logo1.png" alt="Explorer Logo" width="50" height="50"/> <strong class="ml-2 has-text-white">Explorer</strong></a> <button${attr_class("navbar-burger", void 0, { "is-active": isActive })} aria-label="menu"${attr("aria-expanded", isActive)} aria-controls="navMenu" tabindex="0"><span aria-hidden="true"></span> <span aria-hidden="true"></span> <span aria-hidden="true"></span></button></div> <div id="navMenu"${attr_class("navbar-menu", void 0, { "is-active": isActive })}><div class="navbar-end"><div class="navbar-item"><a href="/charts" class="button is-warning is-rounded"><strong class="has-text-weight-bold">Charts</strong></a></div> <div class="navbar-item"><a href="/logout" class="button is-warning is-rounded"><strong class="has-text-weight-bold">Logout</strong></a></div></div></div></div></nav>`;
}
function _page($$payload, $$props) {
  push();
  let data = $$props["data"];
  data.user;
  data.pois;
  const categories = [
    { name: "Caves", image: "/images/caves.png" },
    {
      name: "Mountains",
      image: "/images/mountains.png"
    },
    { name: "Cities", image: "/images/cities.png" },
    { name: "Beaches", image: "/images/beaches.png" },
    { name: "Parks", image: "/images/parks.png" },
    {
      name: "Waterfalls",
      image: "/images/waterfall.png"
    },
    {
      name: "Restaurants",
      image: "/images/restaurants.jpg"
    }
  ];
  const each_array = ensure_array_like(categories);
  PoiNavbar($$payload);
  $$payload.out += `<!----> <section class="section"><div class="container has-text-centered"><h1 class="title is-2 has-text-weight-bold has-text-primary"><span style="border-bottom: 5px solid #ffdd57; padding-bottom: 5px;">🌍 Discover Amazing Places</span></h1> <p class="subtitle is-5 has-text-info mt-3"><strong>Explore and add your favorite Points of Interest!</strong></p> <div class="category-bar svelte-1mex64o"><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let category = each_array[$$index];
    $$payload.out += `<a${attr("href", `/pois/add?category=${category.name}`)} class="category-card svelte-1mex64o"><img${attr("src", category.image)}${attr("alt", category.name)} class="svelte-1mex64o"/> <p class="svelte-1mex64o">${escape_html(category.name)}</p></a>`;
  }
  $$payload.out += `<!--]--></div> <div class="columns is-centered mt-6"><div class="column is-half"><h2 class="title is-3 has-text-weight-bold has-text-primary">🗺️ Map of Visited Places</h2> <div id="map" class="svelte-1mex64o"></div></div> <div class="column is-half"><h2 class="title is-3 has-text-weight-bold has-text-primary">📊 Category Chart</h2> <div id="chart"></div></div></div></div></section> `;
  Footer($$payload);
  $$payload.out += `<!---->`;
  bind_props($$props, { data });
  pop();
}
export {
  _page as default
};
