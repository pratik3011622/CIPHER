import type { RequestHandler } from './$types';
import { json, error, redirect } from '@sveltejs/kit';
import { FieldValue } from 'firebase-admin/firestore';
import { adminDB } from '$lib/server/admin';
import type { RequestEvent } from '@sveltejs/kit';

const qrBonusesCollectionRef = adminDB.collection("/qr_bonuses");

// GET - Verify and claim QR bonus
export async function GET({ locals, url }: RequestEvent) {
    const token = url.searchParams.get("token");

    if (!token) {
        return json({ error: "Invalid QR code" }, { status: 400 });
    }

    if (locals.userTeam === null || !locals.userExists || locals.userID === null) {
        // Return info that authentication is needed
        return json({
            needsAuth: true,
            redirectUrl: `/ready?redirect=/api/qr-bonus/claim?token=${token}`
        });
    }

    const userId = locals.userID;
    const teamId = locals.userTeam;

    try {
        // Find the QR bonus by token
        const querySnap = await qrBonusesCollectionRef.where("token", "==", token).get();

        if (querySnap.empty) {
            return json({ error: "Invalid QR code" }, { status: 404 });
        }

        const qrDoc = querySnap.docs[0];
        const qrData = qrDoc.data();
        const qrId = qrDoc.id;

        // Check if stage is active
        const now = new Date();
        const stageStartTime = new Date(qrData.stage_start_time);
        const stageEndTime = new Date(qrData.stage_end_time);

        if (now < stageStartTime) {
            return json({
                error: "This QR bonus is not yet active",
                stageStartsAt: qrData.stage_start_time,
                timeRemaining: stageStartTime.getTime() - now.getTime()
            }, { status: 403 });
        }

        if (now > stageEndTime) {
            return json({
                error: "This QR bonus has expired",
                expired: true
            }, { status: 403 });
        }

        // Get team data
        const teamRef = adminDB.collection('/teams').doc(teamId);
        const teamDoc = await teamRef.get();
        const teamData = teamDoc.data();
        const completedQRBonuses = teamData?.qr_bonuses_completed || [];

        // Check if this team already claimed this QR bonus
        if (completedQRBonuses.includes(qrId)) {
            return json({
                error: "You have already claimed this QR bonus",
                alreadyClaimed: true
            }, { status: 409 });
        }

        // Check if someone else already claimed this QR
        if (qrData.claimed_by && qrData.claimed_by !== teamId) {
            return json({
                error: "This QR bonus has already been claimed by another team",
                claimedBy: qrData.claimed_by,
                alreadyClaimed: true
            }, { status: 409 });
        }

        // Use transaction for atomic claim
        await adminDB.runTransaction(async (transaction) => {
            const qrSnapshot = await qrBonusesCollectionRef.doc(qrId).get();
            const currentQRData = qrSnapshot.data();

            // Double-check no one claimed it during transaction
            if (currentQRData?.claimed_by && currentQRData.claimed_by !== teamId) {
                throw new Error("QR bonus already claimed");
            }

            // Mark as claimed
            transaction.update(qrBonusesCollectionRef.doc(qrId), {
                claimed_by: teamId,
                claimed_at: FieldValue.serverTimestamp(),
                claimed_by_user: userId
            });

            // Update team stats
            transaction.update(teamRef, {
                qr_bonuses_completed: FieldValue.arrayUnion(qrId),
                total_bonus_points: FieldValue.increment(qrData.points || 300),
                level: FieldValue.increment(1)
            });

            // Log the claim
            const logRef = adminDB.collection("logs").doc(teamId);
            transaction.set(logRef, {
                count: FieldValue.increment(1),
                logs: FieldValue.arrayUnion({
                    "timestamp": new Date().toLocaleString("en-IN", {
                        timeZone: "Asia/Kolkata",
                        hour12: true
                    }),
                    "qrBonusId": qrId,
                    "type": "qr_bonus_claimed",
                    "token": token,
                    "userId": userId
                })
            }, { merge: true });
        });

        return json({
            success: true,
            message: `🎉 QR Bonus Claimed! + ${qrData.points || 300} points!`,
            points: qrData.points || 300,
            bonus: {
                id: qrId,
                title: qrData.title,
                description: qrData.description
            }
        });

    } catch (err: any) {
        console.error('Error claiming QR bonus:', err);

        if (err.message === "QR bonus already claimed") {
            return json({
                error: "Another team was faster!",
                alreadyClaimed: true
            }, { status: 409 });
        }

        return json({ error: "Something went wrong" }, { status: 500 });
    }
}

// POST - Alternative POST endpoint for claiming
export async function POST({ locals, request }: RequestEvent) {
    if (locals.userTeam === null || !locals.userExists || locals.userID === null) {
        return json({ error: "Not authenticated" }, { status: 401 });
    }

    try {
        const { token } = await request.json();

        if (!token) {
            return json({ error: "Token is required" }, { status: 400 });
        }

        // Same logic as GET but using POST
        const userId = locals.userID;
        const teamId = locals.userTeam;

        const querySnap = await qrBonusesCollectionRef.where("token", "==", token).get();

        if (querySnap.empty) {
            return json({ error: "Invalid QR code" }, { status: 404 });
        }

        const qrDoc = querySnap.docs[0];
        const qrData = qrDoc.data();
        const qrId = qrDoc.id;

        // Check stage timing
        const now = new Date();
        const stageStartTime = new Date(qrData.stage_start_time);
        const stageEndTime = new Date(qrData.stage_end_time);

        if (now < stageStartTime || now > stageEndTime) {
            return json({ error: "QR bonus not active" }, { status: 403 });
        }

        // Check if already claimed
        if (qrData.claimed_by && qrData.claimed_by !== teamId) {
            return json({
                error: "Already claimed",
                alreadyClaimed: true
            }, { status: 409 });
        }

        // Atomic claim using transaction
        await adminDB.runTransaction(async (transaction) => {
            const qrSnapshot = await qrBonusesCollectionRef.doc(qrId).get();
            const currentQRData = qrSnapshot.data();

            if (currentQRData?.claimed_by && currentQRData.claimed_by !== teamId) {
                throw new Error("Already claimed");
            }

            transaction.update(qrBonusesCollectionRef.doc(qrId), {
                claimed_by: teamId,
                claimed_at: FieldValue.serverTimestamp(),
                claimed_by_user: userId
            });

            const teamRef = adminDB.collection('/teams').doc(teamId);
            transaction.update(teamRef, {
                qr_bonuses_completed: FieldValue.arrayUnion(qrId),
                total_bonus_points: FieldValue.increment(qrData.points || 300),
                level: FieldValue.increment(1)
            });
        });

        return json({
            success: true,
            message: "QR Bonus Claimed!",
            points: qrData.points || 300
        });

    } catch (err: any) {
        console.error('Error claiming QR bonus:', err);
        return json({ error: "Something went wrong" }, { status: 500 });
    }
}
