import { ComplaintModel } from '$lib/models/Complaint';
import { ResponseModel } from '$lib/models/Response';
import { error, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals }) => {
	// ป้องกันเฉพาะ admin เท่านั้น
	if (!locals.user || locals.user.role !== 'admin') {
		throw redirect(303, '/login');
	}

	const complaint = ComplaintModel.getById(parseInt(params.id));
	
	if (!complaint) {
		throw error(404, 'ไม่พบข้อมูลการร้องเรียน');
	}
	
	return { complaint };
};

export const actions: Actions = {
	default: async ({ request, params, locals }) => {
		// ป้องกันเฉพาะ admin เท่านั้น
		if (!locals.user || locals.user.role !== 'admin') {
			throw redirect(303, '/login');
		}

		const formData = await request.formData();
		const responseMessage = formData.get('response_message') as string;

		if (!responseMessage || responseMessage.trim().length === 0) {
			return { success: false, error: 'กรุณากรอกข้อความตอบกลับ' };
		}

		const complaintId = parseInt(params.id);
		
		// สร้างการตอบกลับ
		ResponseModel.create({
			complaint_id: complaintId,
			response_date: new Date().toISOString(),
			response_message: responseMessage.trim()
		});

		// อัพเดทสถานะเป็น "ดำเนินการแล้ว"
		ComplaintModel.updateStatus(complaintId, 'ดำเนินการแล้ว');

		// กลับไปหน้ารายละเอียดการร้องเรียน
		throw redirect(303, `/complaints/${complaintId}`);
	}
};
