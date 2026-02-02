import type { RequestHandler } from './$types';
import { error, json } from '@sveltejs/kit';
import { FieldValue } from 'firebase-admin/firestore';
import { getAdminDB } from '$lib/server/admin';

const bonusCodesCollectionRef = getAdminDB().collection("/bonus_codes");

export const POST: RequestHandler = async ({ request, locals }) => {
    if (locals.userTeam === null || !locals.userExists || locals.userID === null) {
        return json({ error: "Not authenticated" }, { status: 401 });
    }

    let { code } = await request.json();
    
    if (!code || code.trim() === "") {
        return json({ error: "Code is required" }, { status: 400 });
    }

    code = code.toUpperCase().trim();

    try {
        // Find the bonus code in database
        const querySnap = await bonusCodesCollectionRef.where("code", "==", code).get();
        
        if (querySnap.empty) {
            return json({ 
                correct: false, 
                message: "Invalid code" 
            });
        }

        const bonusDoc = querySnap.docs[0];
        const bonusData = bonusDoc.data();
        const bonusId = bonusDoc.id;

        // Get user's team
        const userDoc = await getAdminDB().collection('/users').doc(locals.userID).get();
        const teamId = userDoc.data()?.team;
        const teamRef = getAdminDB().collection('/teams').doc(teamId);
        const teamDoc = await teamRef.get();
        const teamData = teamDoc.data();

        // Check if this bonus is already completed by this team
        const completedBonuses = teamData?.bonus_codes_completed || [];
        if (completedBonuses.includes(bonusId)) {
            return json({ 
                correct: true, 
                message: "Bonus already claimed!",
                alreadyClaimed: true
            });
        }

        // Check if someone else already claimed this code
        if (bonusData.winner_team_id && bonusData.winner_team_id !== teamId) {
            return json({ 
                correct: false, 
                message: "This code has already been claimed by another team!",
                alreadyClaimed: true
            });
        }

        // Use transaction to ensure atomic winner assignment
        await getAdminDB().runTransaction(async (transaction) => {
            const bonusRef = bonusCodesCollectionRef.doc(bonusId);
            const bonusSnapshot = await bonusRef.get();
            const currentBonusData = bonusSnapshot.data();

            // Double-check no one claimed it during transaction
            if (currentBonusData?.winner_team_id && currentBonusData.winner_team_id !== teamId) {
                throw new Error("Code already claimed");
            }

            // Mark this team as the winner and add to their completed bonuses
            transaction.update(bonusRef, {
                winner_team_id: teamId,
                winner_timestamp: FieldValue.serverTimestamp()
            });

            transaction.update(teamRef, {
                bonus_codes_completed: FieldValue.arrayUnion(bonusId),
                total_bonus_points: FieldValue.increment(bonusData.points || 500),
                level: FieldValue.increment(1) // Bonus level completion
            });

            // Log the bonus win
            const logRef = getAdminDB().collection("logs").doc(teamId);
            transaction.set(logRef, {
                count: FieldValue.increment(1),
                logs: FieldValue.arrayUnion({
                    "timestamp": new Date().toLocaleString("en-IN", {
                        timeZone: "Asia/Kolkata",
                        hour12: true
                    }),
                    "bonusId": bonusId,
                    "type": "bonus_code_won",
                    "code": code,
                    "userId": locals.userID
                })
            }, { merge: true });
        });

        return json({ 
            correct: true, 
            message: `🎉 Congratulations! You claimed the bonus code ${code}!`,
            points: bonusData.points || 500
        });

    } catch (err: any) {
        console.error('Error submitting bonus code:', err);
        
        if (err.message === "Code already claimed") {
            return json({ 
                correct: false, 
                message: "This code has already been claimed by another team!",
                alreadyClaimed: true
            });
        }

        return json({ error: "Something went wrong" }, { status: 500 });
    }
};
