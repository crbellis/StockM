import express, { Request, Response, NextFunction } from "express";
import { User } from "./user.interfaces";
import { createUser, deleteToken, storeRefreshToken } from "./user.service";
import { hashSync, genSaltSync } from "bcryptjs";
import passport from "passport";
import jwt from "jsonwebtoken";

export const userRouter = express.Router();

export const authenticateToken = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const authHeader = req.headers["authorization"];
	const token: string | null = authHeader ? authHeader.split(" ")[1] : null;
	if (token === null) {
		return res.status(401);
	}
	jwt.verify(token!, process.env.ACCESS_TOKEN_SECRET!, (err, user) => {
		if (err) {
			return res.status(403).json({ error: err["message"] });
		}
		console.log("AUTHENTICATED: ", user);
		req.user = user;
		next();
	});
};

export const generateAccessToken = (user: Express.User) => {
	console.log("GEN USER", user);
	return jwt.sign(user as object, process.env.ACCESS_TOKEN_SECRET!, {
		expiresIn: "60s",
	});
};

export const generateRefreshToken = (user: Express.User) => {
	return jwt.sign(user as object, process.env.REFRESH_TOKEN_SECRET!, {
		expiresIn: "7d",
	});
};

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

userRouter.post(
	"/login",
	passport.authenticate("local"),
	async (req: Request, res: Response) => {
		console.log("POST /login");
		console.log("SENT USER", req.user);
		// create access token
		let accessToken = generateAccessToken(req.user!);
		// create refreshToken
		let refreshToken = generateRefreshToken(req.user!);
		try {
			const tokenStatus: "success" | "failed" = await storeRefreshToken(
				refreshToken
			);
			if (tokenStatus === "success") {
				res.cookie("accessToken", accessToken, {
					sameSite: "strict",
					secure: true,
				});
				res.cookie("refreshToken", refreshToken, {
					sameSite: "strict",
					secure: true,
				});
				return res.status(200).json({
					...req.user,
					accessToken,
					refreshToken,
				});
			}
			return res.status(400).sendStatus(400);
		} catch (e) {
			console.log(e);
			res.status(500);
		}
	}
);

userRouter.post(
	"/signout",
	async (req: Request, res: Response, next: NextFunction) => {
		console.log("SIGNOUT");
		try {
			res.clearCookie("accessToken");
			res.clearCookie("refreshToken");
			deleteToken(req.body["refreshToken"]);
			res.status(200).sendStatus(200);
		} catch (error) {
			console.log(error);
			res.status(400).sendStatus(400);
		}
	}
);

userRouter.get(
	"/settings",
	authenticateToken,
	(req: Request, res: Response, next: NextFunction) => {
		res.status(200).json({ msg: "CONGRATS" });
	}
);
