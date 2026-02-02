import { json } from '@sveltejs/kit';
import { getAdminDB } from '$lib/server/admin';
import type { RequestEvent } from '@sveltejs/kit';

const bonusCodesCollectionRef = getAdminDB().collection("/bonus_codes");
const timeLockedBonusesCollectionRef = getAdminDB().collection("/time_locked_bonuses");
const qrBonusesCollectionRef = getAdminDB().collection("/qr_bonuses");

export async function GET({ locals, url }: RequestEvent) {
    if (locals.userTeam === null || !locals.userExists || locals.userID === null) {
        return json({ error: "Not authenticated" }, { status: 401 });
    }

    const userId = locals.userID;
    const teamId = locals.userTeam!;

    const bonusType = url.searchParams.get("type") || "all";

    const result: any = {
        bonusCodes: [],
        timeLockedBonuses: [],
        qrBonuses: []
    };

    try {
        const userDoc = await getAdminDB().collection('/users').doc(userId).get();
        const teamRef = getAdminDB().collection('/teams').doc(teamId);
        const teamDoc = await teamRef.get();
        const teamData = teamDoc.data();
        const completedBonusCodes = teamData?.bonus_codes_completed || [];
        const completedTimeBonuses = teamData?.time_locked_bonuses_completed || [];
        const completedQRBonuses = teamData?.qr_bonuses_completed || [];

        // Get active bonus codes
        if (bonusType === "all" || bonusType === "bonus_codes") {
            const bonusCodesSnap = await bonusCodesCollectionRef
                .where("is_active", "==", true)
                .get();
            
            bonusCodesSnap.docs.forEach((doc) => {
                const data = doc.data();
                const isWonByOther = data.winner_team_id && data.winner_team_id !== teamId;
                
                result.bonusCodes.push({
                    id: doc.id,
                    ...data,
                    clue: isWonByOther ? "This code has been claimed" : data.clue,
                    isClaimed: isWonByOther || completedBonusCodes.includes(doc.id)
                });
            });
        }

        // Get time-locked bonuses
        if (bonusType === "all" || bonusType === "time_locked") {
            const timeBonusesSnap = await timeLockedBonusesCollectionRef
                .orderBy("release_time", "asc")
                .get();
            
            timeBonusesSnap.docs.forEach((doc) => {
                const data = doc.data();
                const now = new Date();
                const releaseTime = new Date(data.release_time);
                const durationMs = (data.duration_minutes || 30) * 60 * 1000;
                const endTime = new Date(releaseTime.getTime() + durationMs);
                
                const isExpired = now > endTime;
                const isWon = data.winner_team_id !== null;
                const isReleased = now >= releaseTime;
                
                result.timeLockedBonuses.push({
                    id: doc.id,
                    ...data,
                    isReleased,
                    isExpired,
                    isWon,
                    isCompleted: completedTimeBonuses.includes(doc.id),
                    answer: undefined
                });
            });
        }

        // Get QR bonuses
        if (bonusType === "all" || bonusType === "qr") {
            const qrBonusesSnap = await qrBonusesCollectionRef
                .where("is_active", "==", true)
                .orderBy("created_at", "desc")
                .get();
            
            const now = new Date();
            
            qrBonusesSnap.docs.forEach((doc) => {
                const data = doc.data();
                const stageStartTime = new Date(data.stage_start_time);
                const stageEndTime = new Date(data.stage_end_time);
                
                const isActive = now >= stageStartTime && now <= stageEndTime;
                const isExpired = now > stageEndTime;
                const isClaimed = data.claimed_by !== null;
                const isClaimedByTeam = data.claimed_by === teamId;
                
                result.qrBonuses.push({
                    id: doc.id,
                    title: data.title,
                    description: data.description,
                    location_hint: data.location_hint,
                    points: data.points,
                    token: data.token,
                    stage_start_time: data.stage_start_time,
                    stage_end_time: data.stage_end_time,
                    isActive,
                    isExpired,
                    isClaimed,
                    isClaimedByTeam,
                    isCompleted: completedQRBonuses.includes(doc.id),
                    claimedBy: data.claimed_by,
                    claimedAt: data.claimed_at
                });
            });
        }

        return json(result);

    } catch (err) {
        console.error('Error fetching bonuses:', err);
        return json({ error: "Something went wrong" }, { status: 500 });
    }
}
