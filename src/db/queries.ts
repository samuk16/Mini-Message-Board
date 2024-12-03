import { pool } from "./pool";

async function getAllMessages() {
	const { rows } = await pool.query("SELECT * FROM records");
	return rows;
}

async function getMessage(id: number) {
	const { rows } = await pool.query("SELECT * FROM records WHERE id = $1", [
		id,
	]);
	return rows;
}

async function createMessage(username: string, text: string, date: Date) {
	const { rows } = await pool.query(
		"INSERT INTO records (text,username,added) VALUES ($1,$2,$3)",
		[text, username, date],
	);
	return rows;
}

export { getAllMessages, getMessage, createMessage };
