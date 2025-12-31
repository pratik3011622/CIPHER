import * as server from '../entries/pages/_layout.server.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/+layout.server.ts";
export const imports = ["_app/immutable/nodes/0.jT1LbipE.js","_app/immutable/chunks/BTUvMHCI.js","_app/immutable/chunks/DiJjCzxR.js","_app/immutable/chunks/GZczaOEM.js","_app/immutable/chunks/_RNEUA52.js","_app/immutable/chunks/Cz-kBZMA.js","_app/immutable/chunks/D4qq5KD3.js","_app/immutable/chunks/DhmSQ-8C.js","_app/immutable/chunks/DPOIDbx0.js","_app/immutable/chunks/BpDq2_1f.js","_app/immutable/chunks/BQzH3t6o.js"];
export const stylesheets = ["_app/immutable/assets/index.DREk1JWf.css","_app/immutable/assets/0.CuhNmmtv.css"];
export const fonts = [];
