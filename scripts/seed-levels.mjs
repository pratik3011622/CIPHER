/**
 * Seed script for levels/questions
 * Run this script to add sample levels to Firestore
 * 
 * Usage: node scripts/seed-levels.mjs
 */

import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import serviceAccount from '../service-account-key.json' assert { type: 'json' };

// Initialize Firebase Admin
initializeApp({
    credential: cert(serviceAccount)
});

const db = getFirestore();

// Sample levels
const levels = [
    {
        level: 1,
        prompt: "What is the output of: print(type([]))?",
        answer: "<class 'list'>",
        hint: "Think about Python data types",
        files: [],
        points: 100,
        creator: "admin"
    },
    {
        level: 2,
        prompt: "Decode this Base64: SGVsbG8gV29ybGQ=",
        answer: "Hello World",
        hint: "Use any online Base64 decoder",
        files: [],
        points: 150,
        creator: "admin"
    },
    {
        level: 3,
        prompt: "What does SQL stand for?",
        answer: "Structured Query Language",
        hint: "It's a programming language for databases",
        files: [],
        points: 200,
        creator: "admin"
    },
    {
        level: 4,
        prompt: "Find the sum of first 10 natural numbers",
        answer: "55",
        hint: "Use the formula n(n+1)/2",
        files: [],
        points: 250,
        creator: "admin"
    },
    {
        level: 5,
        prompt: "What is the binary representation of 10?",
        answer: "1010",
        hint: "Divide by 2 repeatedly",
        files: [],
        points: 300,
        creator: "admin"
    }
];

async function seedLevels() {
    console.log('🌱 Seeding levels...');
    const levelsRef = db.collection('levels');
    
    for (const level of levels) {
        try {
            const docRef = await levelsRef.add(level);
            console.log(`✅ Added level ${level.level}: "${level.prompt.substring(0, 40)}..." (${docRef.id})`);
        } catch (err) {
            console.error(`❌ Error adding level ${level.level}:`, err);
        }
    }
    console.log('\n✨ Levels seeding complete!');
}

seedLevels().catch(console.error);
