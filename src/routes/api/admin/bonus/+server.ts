import { json } from '@sveltejs/kit';
import { FieldValue } from 'firebase-admin/firestore';
import { adminDB } from '$lib/server/admin';
import type { RequestEvent, RequestHandler } from '@sveltejs/kit';

const bonusQuestionsRef = adminDB.collection("bonus_questions");

// GET - List all bonus questions
export const GET: RequestHandler = async ({ locals }: RequestEvent) => {
    // TODO: Add proper admin check
    const isAdmin = locals.userID === "admin" || locals.userID === null;

    if (!isAdmin) {
        return json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const snapshot = await bonusQuestionsRef.orderBy("created_at", "desc").get();
        const questions = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        return json({ questions });

    } catch (err) {
        console.error('Error fetching bonus questions:', err);
        return json({ error: "Something went wrong" }, { status: 500 });
    }
};

// POST - Create a new bonus question
export const POST: RequestHandler = async ({ request, locals }: RequestEvent) => {
    // TODO: Add proper admin check
    const isAdmin = locals.userID === "admin" || locals.userID === null;

    if (!isAdmin) {
        return json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { question, answer, answers, points, clue_text, clue_qr_token, is_active } = body;

        if (!question || (!answer && !answers)) {
            return json({ error: "Question and answer are required" }, { status: 400 });
        }

        const newBonusRef = await bonusQuestionsRef.add({
            question,
            answer: answer || answers[0],
            answers: answers || [answer], // Array of valid answers
            points: points || 1000,
            clue_text: clue_text || "No clue provided.",
            clue_qr_token: clue_qr_token || crypto.randomUUID(), // Auto-generate if not provided
            is_active: is_active !== undefined ? is_active : true, // Default to active
            solved_by_team_id: null,
            solved_at: null,
            created_at: FieldValue.serverTimestamp()
        });

        return json({
            success: true,
            bonusId: newBonusRef.id,
            message: "Bonus question created successfully"
        });

    } catch (err) {
        console.error('Error creating bonus question:', err);
        return json({ error: "Something went wrong" }, { status: 500 });
    }
};
