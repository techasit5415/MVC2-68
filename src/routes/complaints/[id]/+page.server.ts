import { ComplaintModel } from '$lib/models/Complaint';
import { ResponseModel } from '$lib/models/Response';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals }) => {
	const complaint = ComplaintModel.getById(parseInt(params.id));
	
	if (!complaint) {
		throw error(404, 'ไม่พบข้อมูลการร้องเรียน');
	}

	const responses = ResponseModel.getByComplaintId(complaint.complaint_id);
	
	return { 
		complaint, 
		responses,
		user: locals.user 
	};
};
