import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import pkg from 'firebase-admin';

const FB_CLIENT_EMAIL = process.env.FB_CLIENT_EMAIL;
const FB_PRIVATE_KEY = process.env.FB_PRIVATE_KEY;
const FB_PROJECT_ID = process.env.FB_PROJECT_ID;

let app: any = null;

function initializeAdmin() {
    if (!app) {
        if (FB_PROJECT_ID && FB_CLIENT_EMAIL && FB_PRIVATE_KEY) {
            try {
                app = pkg.initializeApp({
                    credential: pkg.credential.cert({
                        projectId: FB_PROJECT_ID,
                        clientEmail: FB_CLIENT_EMAIL,
                        privateKey: FB_PRIVATE_KEY.replace(/\\n/g, '\n'),
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