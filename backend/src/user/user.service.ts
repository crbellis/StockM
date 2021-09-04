import * as dotenv from "dotenv";
import { QueryResult } from "pg";
import { pool } from "../psql/psqlConfig";
import { User } from "./user.interfaces";
dotenv.config();

/**
 * This function creates a user by adding the passed {@link User User} object
 * to the postgres database.
 *
 * @param user - parameter of type {@link User User}.
 * This User object is used to create a new user in the database.
 * For more info on what is required by a User type object,
 * refer to {@link User User}
 * @returns - A Promise resolving to a number. Similar to http requests,
 * this function returns numeric codes:
 * 201 on successful creation
 * 409 if there is an existing user with the same email address
 * 400 on error
 */
export const createUser = async ({
	email,
	firstName,
	lastName,
	password,
}: User): Promise<number> => {
	try {
		email = email.toLowerCase();
		const res: User | undefined = await findUser(email);
		if (res !== undefined) {
			return 409;
		}
		await pool.query(
			"INSERT INTO users (email, first_name, last_name, password)" +
				"VALUES ($1, $2, $3, $4) RETURNING ID;",
			[email, firstName, lastName, password]
		);
		return 201;
	} catch (error) {
		console.log("CREATE USER ERROR: ", error);
		return 400;
	}
};

/**
 * Function to find a user by user by id or email.
 * id is preferential and will be selected if both params are present.
 *
 *
 * @param email - user email to query for in backend database
 * @param id - user id to query for in backend database
 * @returns - Promise resolving to a {@link User User} object
 * or undefined on error
 */
export const findUser = async (
	email: string,
	id?: number
): Promise<User | undefined> => {
	try {
		let queryParameter = undefined;
		if (id) queryParameter = `id = ${id}`;
		else {
			queryParameter = `email = '${email.toLowerCase()}'`;
		}
		const { rows }: QueryResult = await pool.query(
			`SELECT * FROM users where ${queryParameter};`
		);
		const user: User = rows[0];
		return user;
	} catch (error) {
		console.log(error);
		return;
	}
};
