import { e as escape_html, h as bind_props, c as pop, p as push } from "../../../chunks/index2.js";
import { N as Navbar } from "../../../chunks/Navbar.js";
import { F as Footer } from "../../../chunks/Footer.js";
import { getAuth, GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyBeAbOBgrYZo4Fw9H2D7w0XsiKf4XcWvEk",
  authDomain: "explorer-2025.firebaseapp.com",
  projectId: "explorer-2025",
  storageBucket: "explorer-2025.appspot.com",
  messagingSenderId: "40597717004",
  appId: "1:40597717004:web:d00c4e351f57a5826b2e29",
  measurementId: "G-CL9HN970H4"
};
const app = initializeApp(firebaseConfig);
getAuth(app);
new GithubAuthProvider();
new GoogleAuthProvider();
function _page($$payload, $$props) {
  push();
  let data = $$props["data"];
  const message = data.message;
  Navbar($$payload);
  $$payload.out += `<!----> <section class="section"><div class="container"><div class="columns is-centered"><div class="column is-6"><h1 class="title">Log in</h1> `;
  if (message) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="notification is-danger">${escape_html(message)}</div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <form method="POST" action="/login"><div class="field"><label class="label" for="email">Email</label> <input id="email" class="input" type="email" placeholder="Enter email" name="email" required/></div> <div class="field"><label class="label" for="password">Password</label> <input id="password" class="input" type="password" placeholder="Enter password" name="password" required/></div> <button class="button is-warning is-fullwidth">Log In</button></form> <div class="has-text-centered mt-4"><button class="button is-primary is-medium"><span class="icon"><i class="fab fa-github"></i></span> <span>Sign in with GitHub</span></button> <button class="button is-primary is-medium"><span class="icon"><i class="fab fa-google"></i></span> <span>Sign in with Google</span></button></div></div></div></div></section> `;
  Footer($$payload);
  $$payload.out += `<!---->`;
  bind_props($$props, { data });
  pop();
}
export {
  _page as default
};
