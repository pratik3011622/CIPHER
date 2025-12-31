import * as server from '../entries/pages/team/_page.server.ts.js';

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/team/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/team/+page.server.ts";
export const imports = ["_app/immutable/nodes/6.C7Dbtu35.js","_app/immutable/chunks/BTUvMHCI.js","_app/immutable/chunks/DiJjCzxR.js","_app/immutable/chunks/_RNEUA52.js","_app/immutable/chunks/BpDq2_1f.js","_app/immutable/chunks/D-cLx2GB.js","_app/immutable/chunks/GZczaOEM.js","_app/immutable/chunks/Bmj0sIhi.js","_app/immutable/chunks/D4qq5KD3.js","_app/immutable/chunks/DhmSQ-8C.js","_app/immutable/chunks/XjBNncT7.js","_app/immutable/chunks/Bww4oMDO.js"];
export const stylesheets = ["_app/immutable/assets/index.DREk1JWf.css"];
export const fonts = [];
