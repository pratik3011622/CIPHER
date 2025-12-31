import * as server from '../entries/pages/ready/_page.server.ts.js';

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/ready/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/ready/+page.server.ts";
export const imports = ["_app/immutable/nodes/5.Wrxkxg8V.js","_app/immutable/chunks/BTUvMHCI.js","_app/immutable/chunks/DiJjCzxR.js","_app/immutable/chunks/D-cLx2GB.js","_app/immutable/chunks/GZczaOEM.js","_app/immutable/chunks/_RNEUA52.js","_app/immutable/chunks/C1ga8Zcp.js","_app/immutable/chunks/DhmSQ-8C.js","_app/immutable/chunks/Bww4oMDO.js","_app/immutable/chunks/BwfKOnHn.js","_app/immutable/chunks/Cz-kBZMA.js","_app/immutable/chunks/BpDq2_1f.js"];
export const stylesheets = ["_app/immutable/assets/index.DREk1JWf.css"];
export const fonts = [];
