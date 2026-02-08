import db from '../db/database';

export interface Response {
	response_id: number;
	complaint_id: number;
	response_date: string;
	response_message: string;
}

export const ResponseModel = {
	getByComplaintId(complaintId: number): Response[] {
		return db.prepare(`
			SELECT * FROM responses
			WHERE complaint_id = ?
			ORDER BY response_date DESC
		`).all(complaintId) as Response[];
	},

	create(response: Omit<Response, 'response_id'>): number {
		const result = db.prepare(`
			INSERT INTO responses (complaint_id, response_date, response_message)
			VALUES (?, ?, ?)
		`).run(
			response.complaint_id,
			response.response_date,
			response.response_message
		);
		return result.lastInsertRowid as number;
	}
};
