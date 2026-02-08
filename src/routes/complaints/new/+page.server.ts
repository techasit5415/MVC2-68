import { ComplaintModel } from '$lib/models/Complaint';
import { StallModel } from '$lib/models/Stall';
import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) {
		throw redirect(303, '/login');
	}

	const stalls = StallModel.getAll();
	return { stalls };
};

export const actions: Actions = {
	default: async ({ request, locals }) => {
		if (!locals.user) {
			throw redirect(303, '/login');
		}

		const formData = await request.formData();
		const stall_id = formData.get('stall_id');
		const problem_type = formData.get('problem_type');
		const details = formData.get('details');

		if (!stall_id || !problem_type || !details) {
			return {
				success: false,
				error: 'กรุณากรอกข้อมูลให้ครบถ้วน'
			};
		}

		// create
		const complaintId = ComplaintModel.create({
			stall_id: parseInt(stall_id as string),
			complaint_date: new Date().toISOString(),
			problem_type: problem_type as string,
			details: details as string,
			status: 'รอตรวจสอบ'
		});

		throw redirect(303, `/complaints/${complaintId}`);
	}
};
