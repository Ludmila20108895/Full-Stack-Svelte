import { e as escape_html, h as bind_props, c as pop, p as push } from "../../../chunks/index2.js";
import { N as Navbar } from "../../../chunks/Navbar.js";
import { F as Footer } from "../../../chunks/Footer.js";
function _page($$payload, $$props) {
  push();
  let data = $$props["data"];
  const message = data.message;
  Navbar($$payload);
  $$payload.out += `<!----> <section class="section"><div class="container"><div class="columns is-centered"><div class="column is-6"><h1 class="title">Sign up</h1> `;
  if (message) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="notification is-danger">${escape_html(message)}</div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <form method="POST" action="/signup"><div class="field"><label class="label" for="firstName">Name</label> <div class="field-body"><div class="field"><input id="firstName" class="input" type="text" name="firstName" placeholder="Enter first name" required/></div> <div class="field"><input id="lastName" class="input" type="text" name="lastName" placeholder="Enter last name" required/></div></div></div> <div class="field"><label class="label" for="email">Email</label> <input id="email" class="input" type="email" name="email" placeholder="Enter email" required/></div> <div class="field"><label class="label" for="password">Password</label> <input id="password" class="input" type="password" name="password" placeholder="Enter password" required/></div> <button class="button is-warning is-fullwidth">Sign Up</button></form></div></div></div></section> `;
  Footer($$payload);
  $$payload.out += `<!---->`;
  bind_props($$props, { data });
  pop();
}
export {
  _page as default
};
