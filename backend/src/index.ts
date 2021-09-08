// Modules
import * as dotenv from "dotenv";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import { generateAccessToken, userRouter } from "./user/user.router";
import { iexRouter } from "./iex/iex.router";
import { initializePassport } from "./passportConfig";
import passport from "passport";
import session from "express-session";
import { getToken } from "./user/user.service";
import jwt from "jsonwebtoken";

initializePassport(passport);

const routerWrapper = (router: express.Router) => {
	app.use("/api/", router);
};

dotenv.config();

if (!process.env.PORT) {
	process.exit(1);
}

const PORT: number = parseInt(process.env.PORT);

const app = express();
app.use(helmet());
app.use(cors());
app.use(function (req: Request, res: Response, next: NextFunction) {
	res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	next();
});
app.use(express.json());
app.use(
	session({
		secret: process.env.SESSION_SECRET!,
		resave: false,
		saveUninitialized: false,
		cookie: {
			maxAge: parseInt(process.env.SESSION_LIFETIME!),
			sameSite: true,
		},
	})
);
app.use(passport.initialize());
app.use(passport.session());

routerWrapper(userRouter);
routerWrapper(iexRouter);

app.post("/api/token", async (req: Request, res: Response) => {
	const refreshToken = req.body.refreshToken;
	if (refreshToken === null) return res.send(401);
	// check database for refresh token
	const token = await getToken(refreshToken);
	if (!token) {
		return res.status(403).sendStatus(403);
	}
	jwt.verify(token!, process.env.REFRESH_TOKEN_SECRET!, (err, user) => {
		if (err) {
			return res.status(403).json({ error: err["message"] });
		}
		const accessToken = generateAccessToken({
			id: user?.id,
			email: user?.email,
			first_name: user?.first_name,
			last_name: user?.last_name,
		});
		return res.status(200).json({ accessToken });
	});
});

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});
