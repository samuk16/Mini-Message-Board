import dotenv from "dotenv";
import { Client } from "pg";
dotenv.config();

const date = new Date();
const SQL = `
CREATE TABLE IF NOT EXISTS records (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  text VARCHAR (255),
  username VARCHAR (25),
  added TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


`;

const insertQuery = `
INSERT INTO records (text,username,added) 
VALUES
  ('xd','lolplayer',$1),
  ('gg','logi',$1),
  ('hola','yassuo',$1);`;

async function main() {
	console.log("seeding...");
	const client = new Client({
		connectionString: process.env.CONNECTION_DB_URL,
	});
	try {
		await client.connect();
		await client.query(SQL);
		await client.query(insertQuery, [date]);
		console.log("done");
	} catch (err) {
		console.log(err);
	} finally {
		await client.end();
	}
}

main();
