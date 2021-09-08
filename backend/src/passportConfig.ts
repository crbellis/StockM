import passportLocal from "passport-local";
import passport from "passport";
import { findUser } from "./user/user.service";
import { compareSync } from "bcryptjs";
import { User } from "./user/user.interfaces";
const LocalStrategy = passportLocal.Strategy;

export const initializePassport = (passport: any) => {
	const authenticateUser = async (email: any, password: any, done: any) => {
		console.log("HIT");
		const user: User | undefined = await findUser(email);
		console.log(user);
		if (user !== undefined) {
			const { id, email, first_name, last_name } = user;
			try {
				const doesPasswordMatch = compareSync(password, user.password);
				if (doesPasswordMatch) {
					console.log("MATCH");
					return done(
						null,
						{ id, email, first_name, last_name },
						{ message: "Log in successful" }
					);
				} else {
					return done(null, false, { message: "Password incorrect" });
				}
			} catch (error) {
				console.log(error);
			}
		}
		return done(null, false, { message: "No user with that email" });
	};
	passport.use(
		new LocalStrategy(
			{
				usernameField: "email",
			},
			authenticateUser
		)
	);
	passport.serializeUser((user: any, done: any) => done(null, user.id));
	passport.deserializeUser((id: any, done: any) => done(null, id));
};
