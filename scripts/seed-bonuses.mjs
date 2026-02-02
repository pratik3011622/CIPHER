/**
 * Seed script for bonus stages
 * Run this script to add sample bonus codes and time-locked bonuses to Firestore
 * 
 * Usage: node scripts/seed-bonuses.mjs
 */

import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';
import serviceAccount from '../service-account-key.json' assert { type: 'json' };

// Initialize Firebase Admin
initializeApp({
    credential: cert(serviceAccount)
});

const db = getFirestore();

// Sample bonus codes for campus locations
const bonusCodes = [
    {
        code: "CS-9X4A",
        clue: "Look under the blue bench near the library entrance",
        location: "Library Blue Bench",
        is_active: true,
        points: 500
    },
    {
        code: "CIPHER-2024",
        clue: "Check behind the statue in the main courtyard",
        location: "Main Courtyard Statue",
        is_active: true,
        points: 500
    },
    {
        code: "HUNT-XYZ",
        clue: "Find it in the computer lab drawer #7",
        location: "Computer Lab Drawer 7",
        is_active: true,
        points: 300
    }
];

// Sample time-locked bonuses
const timeLockedBonuses = [
    {
        question: "What is the square root of 256?",
        answer: "16",
        release_time: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow same time
        duration_minutes: 30,
        points: 1000
    },
    {
        question: "Decode: ROT13('PBQR')",
        answer: "CODE",
        release_time: new Date(Date.now() + 48 * 60 * 60 * 1000), // 2 days from now
        duration_minutes: 15,
        points: 1500
    }
];

async function seedBonusCodes() {
    console.log('🌱 Seeding bonus codes...');
    const bonusCodesRef = db.collection('bonus_codes');
    
    for (const bonus of bonusCodes) {
        try {
            const docRef = await bonusCodesRef.add({
                ...bonus,
                winner_team_id: null,
                winner_timestamp: null,
                created_at: FieldValue.serverTimestamp(),
                expires_at: null
            });
            console.log(`✅ Added bonus code: ${bonus.code} (${docRef.id})`);
        } catch (err) {
            console.error(`❌ Error adding bonus code ${bonus.code}:`, err);
        }
    }
}

async function seedTimeLockedBonuses() {
    console.log('🌱 Seeding time-locked bonuses...');
    const timeBonusesRef = db.collection('time_locked_bonuses');
    
    for (const bonus of timeLockedBonuses) {
        try {
            const docRef = await timeBonusesRef.add({
                ...bonus,
                is_active: true,
                winner_team_id: null,
                winner_timestamp: null,
                created_at: FieldValue.serverTimestamp()
            });
            console.log(`✅ Added time-locked bonus: "${bonus.question.substring(0, 30)}..." (${docRef.id})`);
        } catch (err) {
            console.error('❌ Error adding time-locked bonus:', err);
        }
    }
}

async function updateTeamSchema() {
    console.log('🌱 Updating team schema...');
    const teamsRef = db.collection('teams');
    
    try {
        const snapshot = await teamsRef.get();
        const batch = db.batch();
        
        snapshot.docs.forEach(doc => {
            const teamData = doc.data();
            
            // Add bonus fields if they don't exist
            if (!teamData.bonus_codes_completed) {
                batch.update(doc.ref, {
                    bonus_codes_completed: [],
                    time_locked_bonuses_completed: [],
                    qr_bonuses_completed: [],
                    total_bonus_points: 0
                });
            }
        });
        
        await batch.commit();
        console.log('✅ Updated team schema');
    } catch (err) {
        console.error('❌ Error updating team schema:', err);
    }
}

async function seedQRBonuses() {
    console.log('🌱 Seeding QR bonuses...');
    const qrBonusesRef = db.collection('qr_bonuses');
    
    const qrBonuses = [
        {
            title: "Library Secret QR",
            description: "Find the hidden QR code in the library corner!",
            token: "qr-lib-secret-2024",
            points: 400,
            stage_start_time: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
            stage_end_time: new Date(Date.now() + 26 * 60 * 60 * 1000), // 26 hours from now
            location_hint: "Check near the science fiction section",
            is_active: true
        },
        {
            title: "Cafeteria Challenge",
            description: "Scan the QR code hidden in the cafeteria!"
        }
    ];
    
    for (const bonus of qrBonuses) {
        try {
            const docRef = await qrBonusesRef.add({
                ...bonus,
                claimed_by: null,
                claimed_at: null,
                claimed_by_user: null,
                created_at: FieldValue.serverTimestamp()
            });
            console.log(`✅ Added QR bonus: ${bonus.title} (${docRef.id})`);
        } catch (err) {
            console.error(`❌ Error adding QR bonus ${bonus.title}:`, err);
        }
    }
}

async function main() {
    console.log('🚀 Starting bonus seed...\n');
    
    await seedBonusCodes();
    console.log('');
    await seedTimeLockedBonuses();
    console.log('');
    await seedQRBonuses();
    console.log('');
    await updateTeamSchema();
    
    console.log('\n✨ Bonus seeding complete!');
    console.log('\n📝 Next steps:');
    console.log('1. Go to the admin panel to manage bonuses');
    console.log('2. Or manually add/edit bonuses in Firestore console');
    console.log('3. Remember to set proper security rules for bonus collections');
}

main().catch(console.error);
