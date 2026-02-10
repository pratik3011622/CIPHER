import { json } from '@sveltejs/kit';
import { adminDB } from '$lib/server/admin';
import type { RequestEvent } from '@sveltejs/kit';

const bonusQuestionsRef = adminDB.collection("bonus_questions");

export async function GET({ locals }: RequestEvent) {
    if (locals.userTeam === null || !locals.userExists || locals.userID === null) {
        return json({ error: "Not authenticated" }, { status: 401 });
    }

    try {
        const teamId = locals.userTeam;

        // Fetch active bonus questions
        // We only want questions that are:
        // 1. is_active: true
        // 2. Not solved by anyone (solved_by_team_id == null)
        // EXCEPT if WE are the winner, we should probably see it (optional, but requirement says "invisible to others")

        const snapshot = await bonusQuestionsRef
            .where("is_active", "==", true)
            .get();

        let visibleQuestions: any[] = [];

        snapshot.forEach(doc => {
            const data = doc.data();

            // "Instantly the question will be invisible to all other teams"
            // If it's solved, check if WE solved it.
            if (data.solved_by_team_id) {
                if (data.solved_by_team_id === teamId) {
                    visibleQuestions.push({
                        id: doc.id,
                        question: data.question,
                        points: data.points,
                        isSolvedByMe: true,
                        solvedAt: data.solved_at
                    });
                }
                // Else: It is solved by someone else -> Invisible.
                return;
            }

            // Not solved: Visible to everyone
            visibleQuestions.push({
                id: doc.id,
                question: data.question,
                points: data.points,
                isSolvedByMe: false
            });
        });

        // Current requirement implies usually only ONE active question? 
        // We return the list. Frontend can handle one or multiple.

        return json({
            questions: visibleQuestions
        });

    } catch (err) {
        console.error('Error fetching bonus questions:', err);
        return json({ error: "Something went wrong" }, { status: 500 });
    }
}

