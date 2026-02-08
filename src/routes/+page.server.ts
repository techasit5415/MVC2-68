import { ComplaintModel } from '$lib/models/Complaint';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) {
		throw redirect(303, '/login');
	}

	const complaints = ComplaintModel.getAll();
	return { complaints };
};
