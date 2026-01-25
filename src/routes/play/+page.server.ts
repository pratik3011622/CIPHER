import { redirect } from '@sveltejs/kit';
import { getAdminDB } from '../../lib/server/admin';

export const load = async ({ locals }) => {
  try {
    if (
      !locals.userID ||
      !locals.userExists ||
      !locals.userTeam
    ) {
      return redirect(302, '/ready');
    }

    const userDoc = await getAdminDB().collection('/users').doc(locals.userID).get();
    const teamId = userDoc.data()?.team;
    const team = await getAdminDB().collection('/teams').doc(teamId).get();
    const level = team.data().level;

    const now = new Date();
    const startTime = new Date("2026-03-10T18:39:00Z");
    const endTime = new Date("2026-03-14T18:39:00Z");

    const questionsVisible = now >= startTime && now <= endTime;

    let questions = [];

    if (questionsVisible) {
      if (locals.banned) {
        return redirect(302, '/team');
      }

      const collectionRef = getAdminDB().collection('/levels').orderBy('level');
      const querySnapshot = await collectionRef.get();
      querySnapshot.docs.forEach((d) => {
        let data = d.data();
        data['answer'] = null;
        data['creator'] = null;
        questions.push(data);
      });
    }

    return {
      locals,
      questions: questions.slice(0, level),
    };
  } catch (err) {
    console.error('Error loading play page:', err);
    throw redirect(302, '/ready');
  }
};
