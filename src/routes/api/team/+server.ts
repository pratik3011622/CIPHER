import { json } from '@sveltejs/kit';
import { getAdminDB } from '$lib/server/admin';
import type { RequestEvent } from '@sveltejs/kit';

export async function GET({ locals }: RequestEvent) {
    if (locals.userTeam === null || !locals.userExists || locals.userID === null) {
        return json({ error: "Not authenticated" }, { status: 401 });
    }

    try {
        const teamDoc = await getAdminDB().collection('/teams').doc(locals.userTeam).get();
        
        if (!teamDoc.exists) {
            return json({ error: "Team not found" }, { status: 404 });
        }

        const teamData = teamDoc.data();
        
        return json({
            teamId: teamDoc.id,
            teamName: teamData?.teamName,
            level: teamData?.level,
            total_bonus_points: teamData?.total_bonus_points || 0,
            bonus_codes_completed: teamData?.bonus_codes_completed || [],
            time_locked_bonuses_completed: teamData?.time_locked_bonuses_completed || [],
            members: teamData?.members || [],
            gsv_verified: teamData?.gsv_verified || false
        });

    } catch (err) {
        console.error('Error fetching team data:', err);
        return json({ error: "Something went wrong" }, { status: 500 });
    }
}
