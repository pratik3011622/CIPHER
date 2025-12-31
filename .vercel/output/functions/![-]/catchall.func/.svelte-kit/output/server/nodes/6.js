import * as server from '../entries/pages/team/_page.server.ts.js';

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/team/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/team/+page.server.ts";
export const imports = ["_app/immutable/nodes/6.CxwJtz-t.js","_app/immutable/chunks/BTUvMHCI.js","_app/immutable/chunks/BKXM17k7.js","_app/immutable/chunks/CmDCSf-I.js","_app/immutable/chunks/BMZmaodi.js","_app/immutable/chunks/D2juwxT3.js","_app/immutable/chunks/D3sEwrjq.js","_app/immutable/chunks/K_D5vqXA.js","_app/immutable/chunks/B3ZCuwX6.js","_app/immutable/chunks/DhmSQ-8C.js","_app/immutable/chunks/RLMMBX5B.js","_app/immutable/chunks/H4Nrfm6K.js"];
export const stylesheets = ["_app/immutable/assets/index.DREk1JWf.css"];
export const fonts = [];
