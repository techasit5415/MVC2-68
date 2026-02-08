import { initDB, seedDB } from '$lib/db/database';
import { UserModel } from '$lib/models/User';
import type { Handle } from '@sveltejs/kit';

// Initialize database
initDB();
seedDB();

// Authentication middleware
export const handle: Handle = async ({ event, resolve }) => {
	const sessionId = event.cookies.get('session');

	if (sessionId) {
		const user = UserModel.getById(parseInt(sessionId));
		if (user) {
	
			event.locals.user = {
				user_id: user.user_id,
				username: user.username,
				full_name: user.full_name,
				role: user.role
			};
		}
	}

	return resolve(event);
};
