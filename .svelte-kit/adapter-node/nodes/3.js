import * as server from '../entries/pages/added-places/_id_/_page.server.ts.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/added-places/_id_/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/added-places/[id]/+page.server.ts";
export const imports = ["_app/immutable/nodes/3.rSH9cYem.js","_app/immutable/chunks/Cne19o6N.js","_app/immutable/chunks/BJmXy5sT.js","_app/immutable/chunks/faPC8McD.js","_app/immutable/chunks/DtBVwIPO.js","_app/immutable/chunks/CS5AdW1K.js","_app/immutable/chunks/DAoz8sdF.js","_app/immutable/chunks/BNuQNzG_.js","_app/immutable/chunks/vxbBvgOj.js","_app/immutable/chunks/Cv8AHZ5B.js","_app/immutable/chunks/nFlSyP-m.js","_app/immutable/chunks/Ctq9ZN9f.js","_app/immutable/chunks/Dzz7srfG.js"];
export const stylesheets = ["_app/immutable/assets/3.HfQt_KtL.css"];
export const fonts = [];
