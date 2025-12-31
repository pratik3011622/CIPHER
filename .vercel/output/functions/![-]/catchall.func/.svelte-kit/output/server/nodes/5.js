import * as server from '../entries/pages/ready/_page.server.ts.js';

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/ready/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/ready/+page.server.ts";
export const imports = ["_app/immutable/nodes/5.DOZEU5VX.js","_app/immutable/chunks/BTUvMHCI.js","_app/immutable/chunks/BKXM17k7.js","_app/immutable/chunks/D2juwxT3.js","_app/immutable/chunks/D3sEwrjq.js","_app/immutable/chunks/CmDCSf-I.js","_app/immutable/chunks/BSEAz-hq.js","_app/immutable/chunks/DhmSQ-8C.js","_app/immutable/chunks/H4Nrfm6K.js","_app/immutable/chunks/ZCGuIuVz.js","_app/immutable/chunks/CcLHD_pg.js","_app/immutable/chunks/BMZmaodi.js"];
export const stylesheets = ["_app/immutable/assets/index.DREk1JWf.css"];
export const fonts = [];
