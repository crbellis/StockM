/**
 * Schema definitions for User objects in the backend/users table.
 *
 */

/**
 * @interface User
 * Contains all information pertaining to a given user.
 * @field id - serially generated id, unique for each user
 * @field first_name - user's first name
 * @field last_name - user's last name
 * @field email - user's email
 * @field password - hashed user password
 * @field portfolio_id - unique portfolio id owned by the user
 */
export interface User {
	id?: number;
	first_name: string;
	last_name: string;
	email: string;
	password: string;
	portfolioId?: number;
}

export interface Users {
	[index: number]: User;
}
