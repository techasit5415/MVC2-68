import db from '../db/database';

export interface Complaint {
	complaint_id: number;
	stall_id: number;
	complaint_date: string;
	problem_type: string;
	details: string;
	status: string;
	stall_name?: string;
	canteen_name?: string;
}

export const ComplaintModel = {
	getAll(): Complaint[] {
		return db.prepare(`
			SELECT c.*, s.name as stall_name, ca.name as canteen_name
			FROM complaints c
			JOIN stalls s ON c.stall_id = s.stall_id
			JOIN canteens ca ON s.canteen_id = ca.canteen_id
			ORDER BY c.complaint_date DESC
		`).all() as Complaint[];
	},

	getById(id: number): Complaint | undefined {
		return db.prepare(`
			SELECT c.*, s.name as stall_name, ca.name as canteen_name
			FROM complaints c
			JOIN stalls s ON c.stall_id = s.stall_id
			JOIN canteens ca ON s.canteen_id = ca.canteen_id
			WHERE c.complaint_id = ?
		`).get(id) as Complaint | undefined;
	},

	create(complaint: Omit<Complaint, 'complaint_id'>): number {
		const result = db.prepare(`
			INSERT INTO complaints (stall_id, complaint_date, problem_type, details, status)
			VALUES (?, ?, ?, ?, ?)
		`).run(
			complaint.stall_id,
			complaint.complaint_date,
			complaint.problem_type,
			complaint.details,
			complaint.status
		);
		return result.lastInsertRowid as number;
	},

	updateStatus(id: number, status: string): void {
		db.prepare('UPDATE complaints SET status = ? WHERE complaint_id = ?').run(status, id);
	}
};
