import { UserModel } from '$lib/models/User';
import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	// if login
	if (locals.user) {
		throw redirect(303, '/');
	}
	return {};
};

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const formData = await request.formData();
		const username = formData.get('username') as string;
		const password = formData.get('password') as string;

		if (!username || !password) {
			return {
				success: false,
				error: 'กรุณากรอก username และ password'
			};
		}

		const user = UserModel.authenticate(username, password);

		if (!user) {
			return {
				success: false,
				error: 'username หรือ password ไม่ถูกต้อง'
			};
		}

		cookies.set('session', user.user_id.toString(), {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			maxAge: 60 * 60 * 24 * 7 // 7 days
		});

		// redirect ตาม role
		if (user.role === 'admin') {
			throw redirect(303, '/');
		} else {
			throw redirect(303, '/');
		}
	}
};
