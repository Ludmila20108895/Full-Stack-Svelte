import * as server from '../entries/pages/pois/_page.server.ts.js';

export const index = 7;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/pois/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/pois/+page.server.ts";
export const imports = ["_app/immutable/nodes/7.CUJMn8jC.js","_app/immutable/chunks/Dp1pzeXC.js","_app/immutable/chunks/Cne19o6N.js","_app/immutable/chunks/BJmXy5sT.js","_app/immutable/chunks/faPC8McD.js","_app/immutable/chunks/Bzwl_pXD.js","_app/immutable/chunks/DtBVwIPO.js","_app/immutable/chunks/CS5AdW1K.js","_app/immutable/chunks/BNuQNzG_.js","_app/immutable/chunks/vxbBvgOj.js","_app/immutable/chunks/Cv8AHZ5B.js","_app/immutable/chunks/nFlSyP-m.js","_app/immutable/chunks/Dzz7srfG.js"];
export const stylesheets = ["_app/immutable/assets/7.96XhalEG.css","_app/immutable/assets/leaflet.CIGW-MKW.css"];
export const fonts = [];
