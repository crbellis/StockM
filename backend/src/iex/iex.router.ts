import express, { Request, Response } from "express";
const fetch = require("node-fetch");

export const iexRouter = express.Router();
const baseURL = `https://cloud.iexapis.com/stable/`;

iexRouter.get("/aapl", async (req: Request, res: Response) => {
	try {
		const json = await fetch(
			baseURL + "/stock/aapl/quote" + `?token=${process.env.TOKEN}`
		).then((res: Response) => res.json());
		console.log(json);
		res.status(200).send("success");
	} catch (e) {
		console.log(e);
	}
});
