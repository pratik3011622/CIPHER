import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { FieldValue } from 'firebase-admin/firestore';
import { adminDB } from '$lib/server/admin';

const bonusQuestionsRef = adminDB.collection("bonus_questions");

export const POST: RequestHandler = async ({ request, locals }) => {
    if (locals.userTeam === null || !locals.userExists || locals.userID === null) {
        return json({ error: "Not authenticated" }, { status: 401 });
    }

    let { questionId, answer } = await request.json();

    if (!questionId || !answer || answer.trim() === "") {
        return json({ error: "Answer is required" }, { status: 400 });
    }

    answer = answer.trim().toLowerCase();

    try {
        const teamId = locals.userTeam;

        // Run transaction to ensure atomic solve
        const result = await adminDB.runTransaction(async (transaction) => {
            const questionRef = bonusQuestionsRef.doc(questionId);
            const questionDoc = await transaction.get(questionRef);

            if (!questionDoc.exists) {
                throw new Error("Question not found");
            }

            const data = questionDoc.data();

            if (!data?.is_active) {
                throw new Error("Question is not active");
            }

            // Check if already solved
            if (data.solved_by_team_id) {
                if (data.solved_by_team_id === teamId) {
                    return { alreadySolvedByUs: true };
                }
                throw new Error("Question already solved by another team");
            }

            // Verify answer
            // Allow for multiple valid answers if 'answers' array exists, else check 'answer' string
            const correctAnswers = data.answers ? data.answers.map((a: string) => a.toLowerCase()) : [data.answer.toLowerCase()];

            if (!correctAnswers.includes(answer)) {
                return { correct: false };
            }

            // Mark as solved
            transaction.update(questionRef, {
                solved_by_team_id: teamId,
                solved_at: FieldValue.serverTimestamp()
            });

            // Award points to team
            const teamRef = adminDB.collection('/teams').doc(teamId);
            transaction.update(teamRef, {
                bonus_questions_solved: FieldValue.arrayUnion(questionId),
                total_bonus_points: FieldValue.increment(data.points || 1000)
            });

            // Log
            const logRef = adminDB.collection("logs").doc(teamId);
            transaction.set(logRef, {
                count: FieldValue.increment(1),
                logs: FieldValue.arrayUnion({
                    timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
                    type: "bonus_question_solved",
                    questionId: questionId,
                    points: data.points
                })
            }, { merge: true });

            return { correct: true, points: data.points };
        });

        if (result.alreadySolvedByUs) {
            return json({
                correct: true,
                message: "You have already solved this question!",
                alreadySolved: true
            });
        }

        if (!result.correct) {
            return json({
                correct: false,
                message: "Incorrect answer. Try again!"
            });
        }

        return json({
            correct: true,
            message: `🎉 Correct! You won ${result.points} points!`,
            points: result.points
        });

    } catch (err: any) {
        console.error('Error submitting bonus answer:', err);

        if (err.message === "Question already solved by another team") {
            return json({
                correct: false,
                message: "Too late! Another team just solved it.",
                gone: true // Frontend should refresh to hide it
            });
        }

        return json({ error: err.message || "Something went wrong" }, { status: 500 });
    }
};
