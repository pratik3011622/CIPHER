import { json } from '@sveltejs/kit';
import { FieldValue } from 'firebase-admin/firestore';
import { getAdminDB } from '$lib/server/admin';
import type { RequestEvent, RequestHandler } from '@sveltejs/kit';
import crypto from 'crypto';

const qrBonusesCollectionRef = getAdminDB().collection("/qr_bonuses");

// Generate unique token
function generateToken(length = 32): string {
    return crypto.randomBytes(length).toString('hex').substring(0, length);
}

// GET - Generate QR code URL
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
        const bonusDoc = await qrBonusesCollectionRef.doc(bonusId).get();
        
        if (!bonusDoc.exists) {
            return json({ error: "QR bonus not found" }, { status: 404 });
        }

        const bonusData = bonusDoc.data();
        const token = bonusData?.token || generateToken();
        
        // If token doesn't exist, update the document with new token
        if (!bonusData?.token) {
            await qrBonusesCollectionRef.doc(bonusId).update({ token });
        }

        const qrUrl = `${baseUrl}/api/qr-bonus/claim?token=${token}`;
        
        return json({
            qrUrl,
            token,
            claimUrl: qrUrl
        });

    } catch (err) {
        console.error('Error generating QR URL:', err);
        return json({ error: "Something went wrong" }, { status: 500 });
    }
}

// POST - Create new QR bonus with auto-generated token
export async function POST({ locals, request }: RequestEvent) {
    const isAdmin = locals.userID === "admin" || locals.userID === null;
    
    if (!isAdmin) {
        return json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { title, description, points, stage_start_time, stage_end_time, location_hint } = body;

        if (!title || !stage_start_time || !stage_end_time) {
            return json({ error: "Title, stage_start_time, and stage_end_time are required" }, { status: 400 });
        }

        const token = generateToken();
        const baseUrl = process.env.BASE_URL || "http://localhost:5173";
        const claimUrl = `${baseUrl}/api/qr-bonus/claim?token=${token}`;

        const newBonusRef = await qrBonusesCollectionRef.add({
            title,
            description: description || "",
            token,
            claim_url: claimUrl,
            points: points || 300,
            stage_start_time: new Date(stage_start_time),
            stage_end_time: new Date(stage_end_time),
            location_hint: location_hint || "",
            is_active: true,
            claimed_by: null,
            claimed_at: null,
            claimed_by_user: null,
            created_at: FieldValue.serverTimestamp()
        });

        return json({
            success: true,
            bonusId: newBonusRef.id,
            token,
            claimUrl,
            message: "QR bonus created successfully"
        });

    } catch (err) {
        console.error('Error creating QR bonus:', err);
        return json({ error: "Something went wrong" }, { status: 500 });
    }
}
