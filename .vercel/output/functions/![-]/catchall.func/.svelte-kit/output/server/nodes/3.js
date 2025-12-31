import * as server from '../entries/pages/leaderboard/_page.server.ts.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/leaderboard/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/leaderboard/+page.server.ts";
export const imports = ["_app/immutable/nodes/3.BHloKghw.js","_app/immutable/chunks/BTUvMHCI.js","_app/immutable/chunks/DiJjCzxR.js","_app/immutable/chunks/_RNEUA52.js","_app/immutable/chunks/Bww4oMDO.js","_app/immutable/chunks/BwfKOnHn.js"];
export const stylesheets = [];
export const fonts = [];
