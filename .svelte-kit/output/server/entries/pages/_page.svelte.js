import "clsx";
import { F as Footer } from "../../chunks/Footer.js";
function _page($$payload) {
  $$payload.out += `<section class="hero is-primary is-fullheight"><div class="hero-body"><div class="container"><div class="columns is-centered"><div class="column is-8-tablet is-5-desktop has-text-centered"><img src="/images/explorer-logo1.png" alt="Explorer Logo" width="200" height="200" class="mb-4"/> <h1 class="title is-1 has-text-white">Welcome to <span class="has-text-warning">Explorer</span></h1> <h2 class="subtitle is-4 has-text-white"><strong>Discover and share amazing places across the world!</strong></h2> <div class="buttons is-centered mt-5"><a href="/signup" class="button is-warning is-large is-rounded is-fullwidth-mobile"><strong>Sign Up</strong></a> <a href="/login" class="button is-warning is-large is-rounded is-fullwidth-mobile"><strong>Log In</strong></a></div> `;
  Footer($$payload);
  $$payload.out += `<!----></div></div></div></div></section>`;
}
export {
  _page as default
};
