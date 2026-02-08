import db from '../db/database';

export interface User {
	user_id: number;
	username: string;
	password: string;
	full_name: string;
	role: 'user' | 'admin';
	created_at: string;
}

export const UserModel = {
	getByUsername(username: string): User | undefined {
		return db.prepare('SELECT * FROM users WHERE username = ?').get(username) as User | undefined;
	},

	getById(id: number): User | undefined {
		return db.prepare('SELECT * FROM users WHERE user_id = ?').get(id) as User | undefined;
	},

	authenticate(username: string, password: string): User | undefined {
		const user = db.prepare('SELECT * FROM users WHERE username = ? AND password = ?')
			.get(username, password) as User | undefined;
		
		return user;
	},

	create(user: Omit<User, 'user_id' | 'created_at'>): number {
		const result = db.prepare(`
			INSERT INTO users (username, password, full_name, role, created_at)
			VALUES (?, ?, ?, ?, ?)
		`).run(
			user.username,
			user.password,
			user.full_name,
			user.role,
			new Date().toISOString()
		);
		return result.lastInsertRowid as number;
	}
};
