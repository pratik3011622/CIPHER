import { error, json } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';
import { FieldValue } from 'firebase-admin/firestore';
import { adminDB } from '$lib/server/admin';

const timeLockedBonusesCollectionRef = adminDB.collection("/time_locked_bonuses");

export async function POST({ request, locals }: RequestEvent) {
    if (locals.userTeam === null || !locals.userExists || locals.userID === null) {
        return json({ error: "Not authenticated" }, { status: 401 });
    }

    let { bonusId, answer } = await request.json();

    if (!bonusId || !answer || answer.trim() === "") {
        return json({ error: "Bonus ID and answer are required" }, { status: 400 });
    }

    answer = answer.toLowerCase().trim();

    try {
        const bonusRef = timeLockedBonusesCollectionRef.doc(bonusId);
        const bonusDoc = await bonusRef.get();

        if (!bonusDoc.exists) {
            return json({ error: "Bonus not found" }, { status: 404 });
        }

        const bonusData = bonusDoc.data();
        if (!bonusData) {
            return json({ error: "Bonus data is empty" }, { status: 500 });
        }

        const now = new Date();
        const releaseTime = new Date(bonusData.release_time);
        const durationMs = (bonusData.duration_minutes || 30) * 60 * 1000;
        const endTime = new Date(releaseTime.getTime() + durationMs);

        if (now < releaseTime) {
            return json({
                error: "Bonus not yet released",
                releaseTime: bonusData.release_time,
                timeRemaining: releaseTime.getTime() - now.getTime()
            }, { status: 403 });
        }

        if (now > endTime) {
            return json({
                error: "Bonus expired",
                expired: true
            }, { status: 403 });
        }

        if (bonusData.winner_team_id) {
            return json({
                error: "Bonus already claimed by another team",
                winner: bonusData.winner_team_id,
                alreadyClaimed: true
            }, { status: 403 });
        }

        const userDoc = await adminDB.collection('/users').doc(locals.userID).get();
        const teamId = userDoc.data()?.team;
        if (!teamId) {
            return json({ error: "Team not found" }, { status: 404 });
        }

        const teamRef = adminDB.collection('/teams').doc(teamId);
        const teamDoc = await teamRef.get();
        const teamData = teamDoc.data();
        const completedBonuses = teamData?.time_locked_bonuses_completed || [];

        if (completedBonuses.includes(bonusId)) {
            return json({
                correct: true,
                message: "You already completed this bonus!",
                alreadyClaimed: true
            });
        }

        const correctAnswer = bonusData.answer?.toLowerCase().trim() || "";
        if (answer !== correctAnswer) {
            const logRef = adminDB.collection("logs").doc(teamId);
            await logRef.set({
                count: FieldValue.increment(1),
                logs: FieldValue.arrayUnion({
                    "timestamp": new Date().toLocaleString("en-IN", {
                        timeZone: "Asia/Kolkata",
                        hour12: true
                    }),
                    "bonusId": bonusId,
                    "type": "time_bonus_wrong",
                    "entered": answer,
                    "userId": locals.userID
                })
            }, { merge: true });

            return json({
                correct: false,
                message: "Wrong answer! Try again quickly!"
            });
        }

        await adminDB.runTransaction(async (transaction) => {
            const bonusSnapshot = await bonusRef.get();
            const currentBonusData = bonusSnapshot.data();

            if (currentBonusData?.winner_team_id) {
                throw new Error("Bonus already claimed");
            }

            transaction.update(bonusRef, {
                winner_team_id: teamId,
                winner_timestamp: FieldValue.serverTimestamp()
            });

            transaction.update(teamRef, {
                time_locked_bonuses_completed: FieldValue.arrayUnion(bonusId),
                total_bonus_points: FieldValue.increment(bonusData.points || 1000),
                level: FieldValue.increment(1)
            });

            const logRef = adminDB.collection("logs").doc(teamId);
            transaction.set(logRef, {
                count: FieldValue.increment(1),
                logs: FieldValue.arrayUnion({
                    "timestamp": new Date().toLocaleString("en-IN", {
                        timeZone: "Asia/Kolkata",
                        hour12: true
                    }),
                    "bonusId": bonusId,
                    "type": "time_bonus_won",
                    "answer": answer,
                    "userId": locals.userID
                })
            }, { merge: true });
        });

        return json({
            correct: true,
            message: "🚀 Lightning fast! You won the time-locked bonus!",
            points: bonusData.points || 1000
        });

    } catch (err: any) {
        console.error('Error submitting time-locked bonus:', err);

        if (err.message === "Bonus already claimed") {
            return json({
                error: "Another team was faster!",
                alreadyClaimed: true
            }, { status: 403 });
        }

        return json({ error: "Something went wrong" }, { status: 500 });
    }
}
