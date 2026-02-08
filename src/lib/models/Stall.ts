import db from '../db/database';

export interface Stall {
	stall_id: number;
	name: string;
	canteen_id: number;
	canteen_name?: string;
}

export const StallModel = {
	getAll(): Stall[] {
		return db.prepare(`
			SELECT s.*, c.name as canteen_name
			FROM stalls s
			JOIN canteens c ON s.canteen_id = c.canteen_id
		`).all() as Stall[];
	},

	getById(id: number): Stall | undefined {
		return db.prepare(`
			SELECT s.*, c.name as canteen_name
			FROM stalls s
			JOIN canteens c ON s.canteen_id = c.canteen_id
			WHERE s.stall_id = ?
		`).get(id) as Stall | undefined;
	},

	getByCanteenId(canteenId: number): Stall[] {
		return db.prepare(`
			SELECT s.*, c.name as canteen_name
			FROM stalls s
			JOIN canteens c ON s.canteen_id = c.canteen_id
			WHERE s.canteen_id = ?
		`).all(canteenId) as Stall[];
	},

	getWithComplaintCounts(): Array<Stall & { complaint_count: number }> {
		return db.prepare(`
			SELECT s.*, c.name as canteen_name, COUNT(co.complaint_id) as complaint_count
			FROM stalls s
			JOIN canteens c ON s.canteen_id = c.canteen_id
			LEFT JOIN complaints co ON s.stall_id = co.stall_id
			GROUP BY s.stall_id
			ORDER BY complaint_count DESC
		`).all() as Array<Stall & { complaint_count: number }>;
	}
};
