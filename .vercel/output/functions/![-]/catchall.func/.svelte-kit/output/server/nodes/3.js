import * as server from '../entries/pages/leaderboard/_page.server.ts.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/leaderboard/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/leaderboard/+page.server.ts";
export const imports = ["_app/immutable/nodes/3.Ctdjb7y4.js","_app/immutable/chunks/BTUvMHCI.js","_app/immutable/chunks/BKXM17k7.js","_app/immutable/chunks/CmDCSf-I.js","_app/immutable/chunks/H4Nrfm6K.js","_app/immutable/chunks/ZCGuIuVz.js"];
export const stylesheets = [];
export const fonts = [];
