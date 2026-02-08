declare module 'better-sqlite3' {
	interface Database {
		prepare(sql: string): Statement;
		exec(sql: string): void;
	}

	interface Statement {
		run(...params: any[]): RunResult;
		get(...params: any[]): any;
		all(...params: any[]): any[];
	}

	interface RunResult {
		changes: number;
		lastInsertRowid: number | bigint;
	}

	function Database(filename: string, options?: any): Database;
	
	export = Database;
}
