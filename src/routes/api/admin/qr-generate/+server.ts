import { json } from '@sveltejs/kit';
import { adminDB } from '$lib/server/admin';
import type { RequestEvent } from '@sveltejs/kit';

const bonusQuestionsRef = adminDB.collection("bonus_questions");

// GET - Generate QR code URL for a specific bonus question
export async function GET({ locals, url }: RequestEvent) {
    const isAdmin = locals.userID === "admin" || locals.userID === null;

    if (!isAdmin) {
        return json({ error: "Unauthorized" }, { status: 401 });
    }

    const baseUrl = url.searchParams.get("baseUrl") || `${url.protocol}//${url.host}`;
    const bonusId = url.searchParams.get("bonusId");

    if (!bonusId) {
        return json({ error: "Bonus ID is required" }, { status: 400 });
    }

    try {
        const doc = await bonusQuestionsRef.doc(bonusId).get();

        if (!doc.exists) {
            return json({ error: "Bonus question not found" }, { status: 404 });
        }

        const data = doc.data();
        const token = data?.clue_qr_token;

        if (!token) {
            return json({ error: "Bonus question has no QR token" }, { status: 500 });
        }

        const qrTargetUrl = `${baseUrl}/clue?token=${token}`;

        return json({
            qrUrl: qrTargetUrl,
            token,
            message: "QR Code should point to this URL"
        });

    } catch (err) {
        console.error('Error generating QR URL:', err);
        return json({ error: "Something went wrong" }, { status: 500 });
    }
}
