import { StallModel } from '$lib/models/Stall';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {

	if (!locals.user) {
		throw redirect(303, '/login');
	}

	const stalls = StallModel.getWithComplaintCounts();
	return { stalls };
};
