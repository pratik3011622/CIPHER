
import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';
import dotenv from 'dotenv';
import fs from 'fs';
import readline from 'readline';

dotenv.config();

// Attempt to load service account from env or file
const serviceAccountPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
let serviceAccount;

try {
    if (serviceAccountPath && fs.existsSync(serviceAccountPath)) {
        serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));
    } else {
        // Fallback for local dev if SERVICE_ACCOUNT is in env as JSON string
        // Also handle the case where we fixed the newlines in the code but here we read raw env
        // The FB_PRIVATE_KEY is in .env
        if (process.env.FB_PRIVATE_KEY) {
            serviceAccount = {
                projectId: process.env.FB_PROJECT_ID,
                clientEmail: process.env.FB_CLIENT_EMAIL,
                privateKey: process.env.FB_PRIVATE_KEY.replace(/\\n/g, '\n'),
            }
        }
    }
} catch (e) {
    console.warn("Could not load service account. Assuming implicit auth or emulator.", e);
}

const appConfig = serviceAccount ? { credential: cert(serviceAccount) } : {};

if (getApps().length === 0) {
    initializeApp(appConfig);
}

const db = getFirestore();
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const ask = (query) => new Promise((resolve) => rl.question(query, resolve));

async function setup() {
    console.log("\n=== 🚀 Setup New QR Bonus Question ===\n");

    const questionText = await ask("Enter Question: ");
    const answer = await ask("Enter Answer: ");
    const clue = await ask("Enter Clue (revealed by QR): ");
    const pointsStr = await ask("Enter Points (default 500): ");

    const points = parseInt(pointsStr) || 500;
    const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    const question = {
        question: questionText,
        answer: answer,
        points: points,
        clue_text: clue,
        clue_qr_token: token,
        is_active: true,
        solved_by_team_id: null,
        solved_at: null,
        created_at: FieldValue.serverTimestamp()
    };

    console.log("\nCreating bonus question...");

    try {
        const res = await db.collection('bonus_questions').add(question);
        console.log(`\n✅ Success! Question ID: ${res.id}`);
        console.log(`\n🖨️  QR CODE LINK:`);
        console.log(`http://localhost:5173/bonus/scan?token=${token}`);
        console.log(`(Replace 'localhost:5173' with your deployed domain)`);
    } catch (err) {
        console.error("Error creating question:", err);
    } finally {
        rl.close();
        process.exit(0); // Force exit firestore connection
    }
}

setup();
