import express, { Request, Response } from "express";
import { User } from "./user.interfaces";
import { findUser, createUser } from "./user.service";
import fetch from "node-fetch";
import { hashSync, compareSync, genSaltSync, compare } from "bcryptjs";

export const userRouter = express.Router();

userRouter.post("/signup", async (req: Request, res: Response) => {
	try {
		const user: User = req.body;
		user.password = hashSync(user.password, genSaltSync());
		const resCode: number = await createUser(user);
		if (resCode === 201) {
			res.status(resCode).send({
				status: "successful",
				email: req.body.email,
			});
		}
		res.status(resCode).sendStatus(resCode);
	} catch (e) {
		console.log(e);
	}
});

userRouter.post("/login", async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;
		const user: User | undefined = await findUser(email);
		console.log(user);
		if (user !== undefined) {
			const doesPasswordMatch = compareSync(password, user.password);
			console.log(doesPasswordMatch);
			if (doesPasswordMatch) {
				res.status(200).json({ message: "successfully logged in" });
				return;
			}
		}
		res.status(400).sendStatus(400);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: error });
	}
});
