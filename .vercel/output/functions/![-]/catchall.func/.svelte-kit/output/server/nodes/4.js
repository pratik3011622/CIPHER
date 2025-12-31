import * as server from '../entries/pages/play/_page.server.ts.js';

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/play/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/play/+page.server.ts";
export const imports = ["_app/immutable/nodes/4.DgsBt0NF.js","_app/immutable/chunks/BTUvMHCI.js","_app/immutable/chunks/BKXM17k7.js","_app/immutable/chunks/CmDCSf-I.js","_app/immutable/chunks/D3sEwrjq.js","_app/immutable/chunks/K_D5vqXA.js","_app/immutable/chunks/B3ZCuwX6.js","_app/immutable/chunks/DhmSQ-8C.js","_app/immutable/chunks/BSEAz-hq.js","_app/immutable/chunks/H4Nrfm6K.js","_app/immutable/chunks/ZCGuIuVz.js","_app/immutable/chunks/D2juwxT3.js","_app/immutable/chunks/BwLHjWef.js","_app/immutable/chunks/BMZmaodi.js","_app/immutable/chunks/dvQMuWL8.js"];
export const stylesheets = ["_app/immutable/assets/index.DREk1JWf.css"];
export const fonts = [];
