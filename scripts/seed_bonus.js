
import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

// Attempt to load service account from env or file
const serviceAccountPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
let serviceAccount;

try {
    if (serviceAccountPath) {
        serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));
    } else {
        // Fallback for local dev if SERVICE_ACCOUNT is in env as JSON string
        serviceAccount = JSON.parse(process.env.SERVICE_ACCOUNT || '{}');
    }
} catch (e) {
    console.warn("Could not load service account. Assuming implicit auth or emulator.");
}

const appConfig = serviceAccount ? { credential: cert(serviceAccount) } : {};

if (getApps().length === 0) {
    initializeApp(appConfig);
}

const db = getFirestore();

async function seed() {
    console.log("Seeding test bonus question...");

    const question = {
        question: "TEST QUESTION: What is the capital of the Moon?",
        answer: "Luna",
        answers: ["Luna", "The Moon"],
        points: 500,
        clue_text: "It orbits the Earth.",
        clue_qr_token: "test-moon-token",
        is_active: true,
        solved_by_team_id: null,
        solved_at: null,
        created_at: FieldValue.serverTimestamp()
    };

    try {
        const res = await db.collection('bonus_questions').add(question);
        console.log(`Successfully added bonus question with ID: ${res.id}`);
        console.log(`Test URL: http://localhost:5173/clue?token=test-moon-token`);
    } catch (err) {
        console.error("Error seeding database:", err);
    }
}

seed();
