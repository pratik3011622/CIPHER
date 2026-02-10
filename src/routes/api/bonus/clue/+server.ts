import { json } from '@sveltejs/kit';
import { adminDB } from '$lib/server/admin';
import type { RequestEvent } from '@sveltejs/kit';

const bonusQuestionsRef = adminDB.collection("bonus_questions");

export async function GET({ url }: RequestEvent) {
    const token = url.searchParams.get("token");

    if (!token) {
        return json({ error: "Token is required" }, { status: 400 });
    }

    try {
        // Query bonus_questions for the matching token
        // Use a simple query. Assuming 'clue_qr_token' field exists.
        const snapshot = await bonusQuestionsRef
            .where("clue_qr_token", "==", token)
            .get();

        if (snapshot.empty) {
            return json({ error: "Invalid QR Token" }, { status: 404 });
        }

        const data = snapshot.docs[0].data();

        // Check if active
        if (!data.is_active) {
            return json({ error: "Bonus question is not active" }, { status: 403 });
        }

        // If solved by someone else, maybe we shouldn't show the clue? 
        // "Question invisible to other teams" implies the hunt is over.
        if (data.solved_by_team_id) {
            return json({
                error: "This bonus question has already been solved!",
                solved: true
            }, { status: 410 }); // 410 Gone
        }

        return json({
            clue: data.clue_text || "No clue text defined",
            relatedQuestionId: snapshot.docs[0].id // Optional: frontend could use this to highlight the question
        });

    } catch (err) {
        console.error('Error fetching QR clue:', err);
        return json({ error: "Something went wrong" }, { status: 500 });
    }
}
