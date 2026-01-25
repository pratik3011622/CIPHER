import type { RequestHandler } from '../$types';
import { getAdminAuth, getAdminDB } from '$lib/server/admin';
import { FieldValue } from 'firebase-admin/firestore';
import { error, json } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request, cookies, locals }) => {
    if (locals.userID === null || !locals.userExists) {
        return error(401, 'Unauthorized');
    }

    const body = await request.json();
    let { inviteCode } = body;
    if (inviteCode === undefined || inviteCode === null || inviteCode.trim() === "") return error(400, "Bad Request");
    inviteCode = inviteCode.toLowerCase();

    const indexRef = getAdminDB().collection("index").doc('nameIndex');
    const userIndexRef = getAdminDB().collection("index").doc("userIndex");

    await getAdminDB().runTransaction(async (transaction) => {
        const currData = (await transaction.get(indexRef)).data();
        if (!currData) return error(500, 'Index not found');
        const existingTeamCodes = new Map(Object.entries(currData.teamcodes || {}));
        const existingTeamMembers = new Map(Object.entries(currData.teamcounts || {}));

        if (!existingTeamCodes.has(inviteCode)) return error(404, "Not Found");
        if (existingTeamMembers.get(inviteCode)?.length >= 3) return error(419, "Team is full");
        if (existingTeamMembers.get(inviteCode)?.includes(locals.userID)) return error(418, "Already in this team");
        if (locals.userTeam !== null) return error(403, "Already in a team");

        const teamID = existingTeamCodes.get(inviteCode);
        const teamRef = getAdminDB().collection('teams').doc(teamID);
        const userRef = getAdminDB().collection('users').doc(locals.userID!);

        const userRecord = await getAdminAuth().getUser(locals.userID!);
        let teamData: any = {
            members: FieldValue.arrayUnion(locals.userID),
        };
        if (!(userRecord.email || "").endsWith("gsv.ac.in")) {
            teamData.gsv_verified = false;
        }
        await transaction.update(teamRef, teamData);
        await transaction.update(userRef, {
            team: teamID
        });

        const userIndexData: any = {};
        userIndexData[locals.userID] = teamID;
        await transaction.update(userIndexRef, userIndexData);

        const indexData: any = {};
        indexData[`teamcounts.${inviteCode}`] = FieldValue.arrayUnion(locals.userID);
        await transaction.update(indexRef, indexData);

        return json({ success: true, teamID });
    });

    return json({});
};