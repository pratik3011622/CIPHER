import * as server from '../entries/pages/_layout.server.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/+layout.server.ts";
export const imports = ["_app/immutable/nodes/0.BZ5oWxpM.js","_app/immutable/chunks/BTUvMHCI.js","_app/immutable/chunks/BKXM17k7.js","_app/immutable/chunks/D3sEwrjq.js","_app/immutable/chunks/CmDCSf-I.js","_app/immutable/chunks/CcLHD_pg.js","_app/immutable/chunks/B3ZCuwX6.js","_app/immutable/chunks/DhmSQ-8C.js","_app/immutable/chunks/BwLHjWef.js","_app/immutable/chunks/BMZmaodi.js","_app/immutable/chunks/dvQMuWL8.js"];
export const stylesheets = ["_app/immutable/assets/index.DREk1JWf.css","_app/immutable/assets/0.CuhNmmtv.css"];
export const fonts = [];
