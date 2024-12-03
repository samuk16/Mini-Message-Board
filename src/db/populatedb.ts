import { Client } from "pg";
import { argv } from "node:process";

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
		connectionString: argv[2],
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
