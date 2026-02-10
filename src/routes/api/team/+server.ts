import { json } from '@sveltejs/kit';
import { adminDB } from '$lib/server/admin';
import type { RequestEvent } from '@sveltejs/kit';

export async function GET({ locals }: RequestEvent) {
    if (locals.userTeam === null || !locals.userExists || locals.userID === null) {
        return json({ error: "Not authenticated" }, { status: 401 });
    }

    try {
        const teamDoc = await adminDB.collection('/teams').doc(locals.userTeam).get();

        if (!teamDoc.exists) {
            return json({ error: "Team not found" }, { status: 404 });
        }

        const teamData = teamDoc.data();

        // Return only relevant data for the new system
        return json({
            teamId: teamDoc.id,
            teamName: teamData?.teamName,
            level: teamData?.level,
            total_bonus_points: teamData?.total_bonus_points || 0,
            members: teamData?.members || [],
            // bonus_codes_completed and time_locked_bonuses_completed are deprecated
            // We can add 'bonus_questions_solved' if we want to track that in the future
            gsv_verified: teamData?.gsv_verified || false
        });

    } catch (err) {
        console.error('Error fetching team data:', err);
        return json({ error: "Something went wrong" }, { status: 500 });
    }
}
