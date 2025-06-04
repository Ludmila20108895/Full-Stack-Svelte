

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.DaBNiGIR.js","_app/immutable/chunks/Cne19o6N.js","_app/immutable/chunks/BJmXy5sT.js"];
export const stylesheets = [];
export const fonts = [];
