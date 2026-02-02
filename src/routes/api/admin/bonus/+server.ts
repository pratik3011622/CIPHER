import { json } from '@sveltejs/kit';
import { FieldValue } from 'firebase-admin/firestore';
import { getAdminDB } from '$lib/server/admin';
import type { RequestEvent, RequestHandler } from '@sveltejs/kit';

const bonusCodesCollectionRef = getAdminDB().collection("/bonus_codes");
const timeLockedBonusesCollectionRef = getAdminDB().collection("/time_locked_bonuses");

// GET - List all bonuses
export const GET: RequestHandler = async ({ locals, url }: RequestEvent) => {
    // TODO: Add proper admin check
    const isAdmin = locals.userID === "admin" || locals.userID === null;
    
    if (!isAdmin) {
        return json({ error: "Unauthorized" }, { status: 401 });
    }

    const bonusType = url.searchParams.get("type") || "all";
    const result: any = {};

    try {
        if (bonusType === "all" || bonusType === "bonus_codes") {
            const bonusCodesSnap = await bonusCodesCollectionRef.orderBy("created_at", "desc").get();
            result.bonusCodes = bonusCodesSnap.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        }

        if (bonusType === "all" || bonusType === "time_locked") {
            const timeBonusesSnap = await timeLockedBonusesCollectionRef.orderBy("release_time", "desc").get();
            result.timeLockedBonuses = timeBonusesSnap.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        }

        return json(result);

    } catch (err) {
        console.error('Error fetching bonuses:', err);
        return json({ error: "Something went wrong" }, { status: 500 });
    }
};

// POST - Create a new bonus
export const POST: RequestHandler = async ({ request, locals }: RequestEvent) => {
    // TODO: Add proper admin check
    const isAdmin = locals.userID === "admin" || locals.userID === null;
    
    if (!isAdmin) {
        return json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { type, ...bonusData } = body;

        if (type === "bonus_code") {
            const newBonusRef = await bonusCodesCollectionRef.add({
                code: bonusData.code.toUpperCase(),
                clue: bonusData.clue,
                location: bonusData.location || "",
                is_active: true,
                winner_team_id: null,
                winner_timestamp: null,
                points: bonusData.points || 500,
                created_at: FieldValue.serverTimestamp(),
                expires_at: bonusData.expires_at ? new Date(bonusData.expires_at) : null
            });

            return json({ 
                success: true, 
                bonusId: newBonusRef.id,
                message: "Bonus code created successfully"
            });

        } else if (type === "time_locked") {
            const newBonusRef = await timeLockedBonusesCollectionRef.add({
                question: bonusData.question,
                answer: bonusData.answer,
                release_time: new Date(bonusData.release_time),
                duration_minutes: bonusData.duration_minutes || 30,
                is_active: true,
                winner_team_id: null,
                winner_timestamp: null,
                points: bonusData.points || 1000,
                created_at: FieldValue.serverTimestamp()
            });

            return json({ 
                success: true, 
                bonusId: newBonusRef.id,
                message: "Time-locked bonus created successfully"
            });

        } else {
            return json({ error: "Invalid bonus type" }, { status: 400 });
        }

    } catch (err) {
        console.error('Error creating bonus:', err);
        return json({ error: "Something went wrong" }, { status: 500 });
    }
};
