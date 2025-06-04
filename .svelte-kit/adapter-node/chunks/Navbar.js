import { i as attr_class, d as attr } from "./index2.js";
function Navbar($$payload) {
  let isActive = false;
  $$payload.out += `<nav class="navbar is-primary" style="margin-bottom: 20px; padding: 15px;"><div class="container"><div class="navbar-brand"><a class="navbar-item" href="/"><img src="/images/explorer-logo1.png" alt="Explorer Logo" width="50" height="50"/> <strong class="ml-2 has-text-white">Explorer</strong></a> <button${attr_class("navbar-burger", void 0, { "is-active": isActive })} aria-label="menu"${attr("aria-expanded", isActive)} aria-controls="navMenu" tabindex="0"><span aria-hidden="true"></span> <span aria-hidden="true"></span> <span aria-hidden="true"></span></button></div> <div id="navMenu"${attr_class("navbar-menu", void 0, { "is-active": isActive })}><div class="navbar-end"><div class="navbar-item"><a href="/logout" class="button is-warning is-rounded"><strong class="has-text-weight-bold">Logout</strong></a></div></div></div></div></nav>`;
}
export {
  Navbar as N
};
