import { Pool } from "pg";

// Instantiating postgres connection
export const pool = new Pool({
	user: process.env.PSQL_USER,
	host: process.env.PSQL_HOST,
	database: "backend",
	password: process.env.PSQL_PW,
	port: parseInt(process.env.PSQL_PORT!),
});
