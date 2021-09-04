import express, { Request, Response } from "express";
import { User } from "../psql/psql.interfaces";
import { findUser, createUser } from "../psql/psql.service";
const fetch = require("node-fetch");

export const iexRouter = express.Router();
const baseURL = `https://cloud.iexapis.com/stable/`;

iexRouter.get("/aapl", async (req: Request, res: Response) => {
	try {
		const test: User = {
			email: "test@gmail.com",
			firstName: "test",
			lastName: "0",
			password: "123",
		};
		const result: number = await createUser(test);
		console.log(result);
		const results = await findUser("bellischase@gmail.com");
		// console.log(results);
		// const json = await fetch(
		// 	baseURL + "/stock/aapl/quote" + `?token=${process.env.TOKEN}`
		// ).then((res: Response) => res.json());
		// console.log(json);
		res.status(200).send("success");
	} catch (e) {
		console.log(e);
	}
});
