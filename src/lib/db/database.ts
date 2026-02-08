import Database from 'better-sqlite3';
import path from 'path';

const db = new Database(path.join(process.cwd(), 'canteen.db'));

export function initDB() {
	//Canteens
	db.exec(`
		CREATE TABLE IF NOT EXISTS canteens (
			canteen_id INTEGER PRIMARY KEY AUTOINCREMENT,
			name TEXT NOT NULL,
			location TEXT NOT NULL
		)
	`);

	//Stalls 
	db.exec(`
		CREATE TABLE IF NOT EXISTS stalls (
			stall_id INTEGER PRIMARY KEY AUTOINCREMENT,
			name TEXT NOT NULL,
			canteen_id INTEGER NOT NULL,
			FOREIGN KEY (canteen_id) REFERENCES canteens(canteen_id)
		)
	`);

	//Complaints
	db.exec(`
		CREATE TABLE IF NOT EXISTS complaints (
			complaint_id INTEGER PRIMARY KEY AUTOINCREMENT,
			stall_id INTEGER NOT NULL,
			complaint_date TEXT NOT NULL,
			problem_type TEXT NOT NULL,
			details TEXT NOT NULL,
			status TEXT NOT NULL DEFAULT 'รอตรวจสอบ',
			FOREIGN KEY (stall_id) REFERENCES stalls(stall_id)
		)
	`);

	//Responses
	db.exec(`
		CREATE TABLE IF NOT EXISTS responses (
			response_id INTEGER PRIMARY KEY AUTOINCREMENT,
			complaint_id INTEGER NOT NULL,
			response_date TEXT NOT NULL,
			response_message TEXT NOT NULL,
			FOREIGN KEY (complaint_id) REFERENCES complaints(complaint_id)
		)
	`);

	//Users
	db.exec(`
		CREATE TABLE IF NOT EXISTS users (
			user_id INTEGER PRIMARY KEY AUTOINCREMENT,
			username TEXT NOT NULL UNIQUE,
			password TEXT NOT NULL,
			full_name TEXT NOT NULL,
			role TEXT NOT NULL DEFAULT 'user',
			created_at TEXT NOT NULL
		)
	`);
}


export function seedDB() {
	const checkData = db.prepare('SELECT COUNT(*) as count FROM canteens').get() as { count: number };
	
	if (checkData.count > 0) {
		return; 
	}

	// example//
	const insertUser = db.prepare('INSERT INTO users (username, password, full_name, role, created_at) VALUES (?, ?, ?, ?, ?)');
	insertUser.run('admin', 'admin123', 'ผู้ดูแลระบบ', 'admin', new Date().toISOString());
	insertUser.run('user1', 'user123', 'นักศึกษา ทดสอบ', 'user', new Date().toISOString());
	insertUser.run('user2', 'user123', 'อาจารย์ ทดสอบ', 'user', new Date().toISOString());


	const insertCanteen = db.prepare('INSERT INTO canteens (name, location) VALUES (?, ?)');
	insertCanteen.run('โรงอาหารกลาง', 'อาคาร 1 ชั้น 1');
	insertCanteen.run('โรงอาหารคณะวิศวกรรมศาสตร์', 'อาคารวิศวกรรม ชั้น 2');
	insertCanteen.run('โรงอาหารหอพัก', 'หอพักนักศึกษา ชั้น 1');


	const insertStall = db.prepare('INSERT INTO stalls (name, canteen_id) VALUES (?, ?)');
	insertStall.run('ร้านข้าวราดแกง', 1);
	insertStall.run('ร้านก่วยเตี๋ยว', 1);
	insertStall.run('ร้านอาหารตามสั่ง', 1);
	insertStall.run('ร้านเครื่องดื่ม', 2);
	insertStall.run('ร้านข้าวมันไก่', 2);
	insertStall.run('ร้านอาหารญี่ปุ่น', 2);
	insertStall.run('ร้านชาบู', 3);
	insertStall.run('ร้านกาแฟ', 3);


	const insertComplaint = db.prepare(
		'INSERT INTO complaints (stall_id, complaint_date, problem_type, details, status) VALUES (?, ?, ?, ?, ?)'
	);
	
	insertComplaint.run(1, '2026-02-01', 'รสชาติ', 'อาหารรสชาติจืดเกินไป', 'รอตรวจสอบ');
	insertComplaint.run(2, '2026-02-02', 'สุขอนามัย', 'พบแมลงในน้ำซุป', 'ดำเนินการแล้ว');
	insertComplaint.run(3, '2026-02-03', 'คุณภาพ', 'เนื้อสัตว์ไม่สด', 'ดำเนินการแล้ว');
	insertComplaint.run(4, '2026-02-04', 'ปริมาณ', 'ปริมาณน้อยเกินไป', 'รอตรวจสอบ');
	insertComplaint.run(5, '2026-02-05', 'สุขอนามัย', 'จานไม่สะอาด', 'ดำเนินการแล้ว');
	insertComplaint.run(6, '2026-02-06', 'ราคา', 'ราคาแพงกว่าที่ติดป้าย', 'รอตรวจสอบ');
	insertComplaint.run(7, '2026-02-07', 'คุณภาพ', 'อาหารเย็นเกินไป', 'รอตรวจสอบ');
	insertComplaint.run(8, '2026-02-08', 'รสชาติ', 'กาแฟรสชาติไม่ถูกปาก', 'รอตรวจสอบ');
	insertComplaint.run(1, '2026-02-07', 'สุขอนามัย', 'พบผมในอาหาร', 'ดำเนินการแล้ว');
	insertComplaint.run(3, '2026-02-08', 'บริการ', 'พนักงานบริการไม่ดี', 'รอตรวจสอบ');


	const insertResponse = db.prepare(
		'INSERT INTO responses (complaint_id, response_date, response_message) VALUES (?, ?, ?)'
	);
	
	insertResponse.run(2, '2026-02-03', 'ขอบคุณสำหรับการแจ้ง เราได้ดำเนินการตรวจสอบและทำความสะอาดครัวแล้ว');
	insertResponse.run(3, '2026-02-04', 'เราได้เปลี่ยนซัพพลายเออร์เนื้อสัตว์แล้ว จะควบคุมคุณภาพให้ดีขึ้น');
	insertResponse.run(3, '2026-02-05', 'เราได้ทดลองปรุงตัวอย่างใหม่แล้ว กรุณาติดตามประเมินผลด้วย');
	insertResponse.run(5, '2026-02-06', 'ขอโทษในความไม่สะดวก เราได้เปลี่ยนระบบล้างจานใหม่แล้ว');
	insertResponse.run(9, '2026-02-08', 'ขอโทษอย่างยิ่ง เราได้เตือนพนักงานให้ใส่หมวกและตาข่ายผมทุกครั้ง');
}

export default db;
