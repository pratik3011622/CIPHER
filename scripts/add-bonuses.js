/**
 * Simple script to add bonus data to Firestore
 * Run: node scripts/add-bonuses.js
 */

const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore, FieldValue } = require('firebase-admin/firestore');

// Use existing service account
const serviceAccount = require('../service-account-key.json');

initializeApp({
    credential: cert(serviceAccount)
});

const db = getFirestore();

async function addBonuses() {
    console.log('Adding bonus data to Firestore...\n');

    // 1. Add Campus Codes
    console.log('1. Adding Campus Codes...');
    const bonusCodesRef = db.collection('bonus_codes');
    
    await bonusCodesRef.doc('bonus_1').set({
        code: 'CS-9X4A',
        clue: 'Look under the blue bench near the library entrance',
        location: 'Library Blue Bench',
        is_active: true,
        points: 500,
        winner_team_id: null,
        winner_timestamp: null,
        created_at: FieldValue.serverTimestamp()
    });
    console.log('   ✓ Added: CS-9X4A');

    await bonusCodesRef.doc('bonus_2').set({
        code: 'CIPHER-2024',
        clue: 'Check behind the statue in the main courtyard',
        location: 'Main Courtyard Statue',
        is_active: true,
        points: 500,
        winner_team_id: null,
        winner_timestamp: null,
        created_at: FieldValue.serverTimestamp()
    });
    console.log('   ✓ Added: CIPHER-2024');

    await bonusCodesRef.doc('bonus_3').set({
        code: 'HUNT-XYZ',
        clue: 'Find it in the computer lab drawer #7',
        location: 'Computer Lab Drawer 7',
        is_active: true,
        points: 300,
        winner_team_id: null,
        winner_timestamp: null,
        created_at: FieldValue.serverTimestamp()
    });
    console.log('   ✓ Added: HUNT-XYZ');

    // 2. Add Time-Locked Bonuses
    console.log('\n2. Adding Time-Locked Bonuses...');
    const timeBonusesRef = db.collection('time_locked_bonuses');
    
    const now = new Date();
    const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

    await timeBonusesRef.doc('time_bonus_1').set({
        question: 'What is the square root of 256?',
        answer: '16',
        release_time: now, // Active now
        duration_minutes: 30,
        is_active: true,
        points: 1000,
        winner_team_id: null,
        winner_timestamp: null,
        created_at: FieldValue.serverTimestamp()
    });
    console.log('   ✓ Added: Square root question (active now)');

    await timeBonusesRef.doc('time_bonus_2').set({
        question: 'Decode: ROT13("PBQR")',
        answer: 'CODE',
        release_time: tomorrow, // Releases tomorrow
        duration_minutes: 15,
        is_active: true,
        points: 1500,
        winner_team_id: null,
        winner_timestamp: null,
        created_at: FieldValue.serverTimestamp()
    });
    console.log('   ✓ Added: ROT13 question (releases tomorrow)');

    // 3. Add QR Bonuses
    console.log('\n3. Adding QR Bonuses...');
    const qrBonusesRef = db.collection('qr_bonuses');
    
    await qrBonusesRef.doc('qr_bonus_1').set({
        title: 'Library Secret QR',
        description: 'Find the hidden QR code in the library corner!',
        token: 'qr-lib-secret-2024',
        points: 400,
        stage_start_time: now, // Active now
        stage_end_time: nextWeek, // Expires in 7 days
        location_hint: 'Check near the science fiction section',
        is_active: true,
        claimed_by: null,
        claimed_at: null,
        claimed_by_user: null,
        created_at: FieldValue.serverTimestamp()
    });
    console.log('   ✓ Added: Library Secret QR (active now)');

    await qrBonusesRef.doc('qr_bonus_2').set({
        title: 'Cafeteria Challenge',
        description: 'Scan the QR code hidden in the cafeteria!',
        token: 'qr-cafeteria-2024',
        points: 300,
        stage_start_time: tomorrow,
        stage_end_time: nextWeek,
        location_hint: 'Near the vending machines',
        is_active: true,
        claimed_by: null,
        claimed_at: null,
        claimed_by_user: null,
        created_at: FieldValue.serverTimestamp()
    });
    console.log('   ✓ Added: Cafeteria Challenge (releases tomorrow)');

    // 4. Update teams with bonus fields
    console.log('\n4. Updating teams with bonus fields...');
    const teamsRef = db.collection('teams');
    const teamsSnap = await teamsRef.get();
    
    const batch = db.batch();
    teamsSnap.docs.forEach(doc => {
        const data = doc.data();
        if (!data.bonus_codes_completed) {
            batch.update(doc.ref, {
                bonus_codes_completed: [],
                time_locked_bonuses_completed: [],
                qr_bonuses_completed: [],
                total_bonus_points: 0
            });
        }
    });
    await batch.commit();
    console.log(`   ✓ Updated ${teamsSnap.size} teams`);

    console.log('\n✅ All bonus data added successfully!');
    console.log('\n📋 Summary:');
    console.log('   - 3 Campus Codes (CS-9X4A, CIPHER-2024, HUNT-XYZ)');
    console.log('   - 2 Time-Locked Bonuses (1 active now, 1 tomorrow)');
    console.log('   - 2 QR Bonuses (1 active now, 1 tomorrow)');
    console.log('\n🚀 Now run: npm run dev');
    console.log('   Then go to /play and click "Bonuses" button!');
}

addBonuses().catch(console.error);
