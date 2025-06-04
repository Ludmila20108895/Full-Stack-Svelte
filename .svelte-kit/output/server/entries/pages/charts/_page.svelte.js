import { f as ensure_array_like, d as attr, e as escape_html, h as bind_props, c as pop, p as push } from "../../../chunks/index2.js";
import { N as NavbarLoggedIn } from "../../../chunks/NavbarLoggedIn.js";
import { F as Footer } from "../../../chunks/Footer.js";
function _page($$payload, $$props) {
  push();
  let data = $$props["data"];
  data.pois;
  let uniqueYears = [];
  const each_array = ensure_array_like(uniqueYears);
  NavbarLoggedIn($$payload);
  $$payload.out += `<!----> <section class="section"><div class="container"><h1 class="title has-text-primary">📊 Analytics Dashboard</h1> <div class="box"><div id="chart-year"></div></div> <div class="box"><div class="field mb-4"><label class="label">Select Year</label> <div class="control"><div class="select"><select><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let year = each_array[$$index];
    $$payload.out += `<option${attr("value", year)}>${escape_html(year)}</option>`;
  }
  $$payload.out += `<!--]--></select></div></div></div> <div id="chart-month"></div></div></div></section> `;
  Footer($$payload);
  $$payload.out += `<!---->`;
  bind_props($$props, { data });
  pop();
}
export {
  _page as default
};
