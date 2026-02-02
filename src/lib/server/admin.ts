import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import pkg from 'firebase-admin';
import { FB_CLIENT_EMAIL, FB_PROJECT_ID } from '$env/static/private';
import { env } from '$env/dynamic/private';

let app: any = null;

function initializeAdmin() {
    if (!app) {
        const FB_PRIVATE_KEY = env.FB_PRIVATE_KEY;
        
        if (FB_PROJECT_ID && FB_CLIENT_EMAIL && FB_PRIVATE_KEY) {
            try {
                // Handle escaped newlines
                let privateKey = FB_PRIVATE_KEY;
                if (privateKey.includes('\\n')) {
                    privateKey = privateKey.replace(/\\n/g, '\n');
                }
                
                app = pkg.initializeApp({
                    credential: pkg.credential.cert({
                        projectId: FB_PROJECT_ID,
                        clientEmail: FB_CLIENT_EMAIL,
                        privateKey: privateKey,
                    }),
                });
            } catch (err: any) {
                if (!/already exists/u.test(err.message)) {
                    console.error('Firebase Admin Error: ', err.stack)
                }
            }
        } else {
            throw new Error('Firebase environment variables not set.');
        }
    }
}

export function getAdminDB() {
    initializeAdmin();
    return getFirestore();
}

export function getAdminAuth() {
    initializeAdmin();
    return getAuth();
}