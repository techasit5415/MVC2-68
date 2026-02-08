import db from '../db/database';

export interface Canteen {
	canteen_id: number;
	name: string;
	location: string;
}

export const CanteenModel = {
	getAll(): Canteen[] {
		return db.prepare('SELECT * FROM canteens').all() as Canteen[];
	},

	getById(id: number): Canteen | undefined {
		return db.prepare('SELECT * FROM canteens WHERE canteen_id = ?').get(id) as Canteen | undefined;
	}
};
