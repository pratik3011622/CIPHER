/** @type {import('./$types').PageLoad} */
import {getAdminDB} from "../../lib/server/admin";
import { error } from '@sveltejs/kit';

export const prerender = false;

export const load = async ({ locals, params }) => {
    try {
        console.log('Loading leaderboard...');
        const queryDef = getAdminDB().collection("teams").orderBy("level", "desc").orderBy("last_change");
        console.log('Query defined');
        const qSnap = await queryDef.get();
        console.log('Query executed, docs count:', qSnap.docs.length);
        const leaderboard = [];
        qSnap.docs.forEach((e) => {
            const data = e.data();
            console.log('Processing doc:', e.id, data);
            leaderboard.push({
                teamName: data.teamName,
                score: (data.level - 1) * 100,
                members: data.members ? data.members.length : 0,
                gsv: data.gsv_verified
            });
        });
        console.log('Leaderboard loaded:', leaderboard);
        return {
            leaderboard
        };
    } catch (err) {
        console.error('Error loading leaderboard:', err);
        throw error(500, `Failed to load leaderboard: ${err.message}`);
    }
};
