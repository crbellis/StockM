import React from "react";
import finance from "../../assets/finance.svg";
import "./Login.css";
import { Redirect } from "react-router";
import { authenticate, selectUser, tokenAuthenticate } from "./loginSlice";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { getAccessToken } from "../API/API";
import { selectHistory } from "../History/historySlice";
import { NavLink } from "react-router-dom";

const Login = () => {
	const dispatch = useDispatch();
	const user = useSelector(selectUser);
	const history = useSelector(selectHistory);
	const [userCreds, setUserCreds] = React.useState<{
		email?: string;
		password?: string;
	}>({});
	const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
		let temp = userCreds;
		if (
			event.currentTarget.name === "email" ||
			event.currentTarget.name === "password"
		) {
			temp[event.currentTarget.name] = event.currentTarget.value;
			setUserCreds(temp);
		}
	};

	const handleSubmit = async (event: React.SyntheticEvent) => {
		setIsSubmitting(true);
		event.preventDefault();
		const target = event.currentTarget as typeof event.currentTarget & {
			email: { value: string };
			password: { value: string };
		};
		const email = target.email.value;
		const password = target.password.value;

		try {
			dispatch(authenticate({ email, password }));
			setIsSubmitting(false);
			return (
				<Redirect
					to={history.prevPath ? history.prevPath : "/dashboard"}
				/>
			);
		} catch (error) {
			console.log(error);
		}
	};

	// if new authentication, reset the cookies
	if (user.authed) {
		return (
			<Redirect to={history.prevPath ? history.prevPath : "/dashboard"} />
		);
	}

	const handleCookieAuth = async (refreshToken: string) => {
		const accessToken = await getAccessToken(refreshToken);
		if (accessToken) {
			Cookies.set("accessToken", accessToken!, {
				sameSite: "Strict",
				secure: true,
			});
			dispatch(tokenAuthenticate({ accessToken, refreshToken }));
			// bug doesnt redirect to incoming location
			console.log(history.prevPath);
			return (
				<Redirect
					to={history.prevPath ? history.prevPath : "/dashboard"}
				/>
			);
		}
	};

	const refreshToken = Cookies.get("refreshToken");
	if (refreshToken && refreshToken !== "undefined" && !user.authed) {
		handleCookieAuth(refreshToken);
		return (
			<div className="w-screen h-screen flex justify-center items-center">
				<div className="flex items-center">
					<svg
						className="animate-spin -ml-1 mr-3 h-8 w-8 text-green-500"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
					>
						<circle
							className="opacity-25"
							cx="12"
							cy="12"
							r="10"
							stroke="currentColor"
							strokeWidth="4"
						></circle>
						<path
							className="opacity-75"
							fill="currentColor"
							d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
						></path>
					</svg>
					<div className="opacity-75 text-lg">Authenticating...</div>
				</div>
			</div>
		);
	}

	return (
		<div className="w-screen h-screen flex justify-center items-center bg-[#f1f9f9]">
			<div className="hidden w-1/2 h-full items-center justify-center md:flex">
				<div className="custom-shape-divider-bottom-1630784087">
					<svg
						data-name="Layer 1"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 1200 120"
						preserveAspectRatio="none"
					>
						<path
							d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
							opacity=".25"
							className="shape-fill"
						></path>
						<path
							d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
							opacity=".5"
							className="shape-fill"
						></path>
						<path
							d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
							className="shape-fill"
						></path>
					</svg>
				</div>
				<img
					src={finance}
					alt="finance-chart"
					className="z-10 bg-[#f1f9f9]"
				/>
			</div>
			<div className="md:bg-white flex flex-col text-center md:h-full md:w-1/2 justify-center items-center">
				<div className="font-bold text-xl">Welcome to StockM</div>
				<div className="text-sm mb-2 mt-2">
					Don't have an account?
					<NavLink to="/signup" className="ml-1 text-[#12b376]">
						Sign up
					</NavLink>
				</div>
				<div className="p-5 w-96 h-[430px] rounded-lg">
					<form
						className="flex flex-col text-left"
						onSubmit={handleSubmit}
					>
						{user.status === "failed" && (
							<div className="text-sm text-red-500 text-center m-1 transition-all 200ms ease-in-out">
								Invalid email or password
							</div>
						)}
						<label className="mb-1">Email</label>
						<input
							type="email"
							name="email"
							autoComplete="email"
							className="bg-gray-100 border border-gray-300 rounded px-3 pb-1 pt-2 shadow-sm
							focus:outline-none focus:border-[#12b376] focus:ring-1 focus:ring-[#12b376]"
							onChange={handleChange}
						/>
						<label htmlFor="password" className="mb-1 mt-5">
							Password
						</label>
						<input
							type="password"
							name="password"
							autoComplete="password"
							className="bg-gray-100 border border-gray-300 rounded px-3 pb-1 pt-2 shadow-sm
							focus:outline-none focus:border-[#12b376] focus:ring-1 focus:ring-[#12b376]"
							onChange={handleChange}
						/>
						<a href="/" className="mt-3 text-sm text-[#12b376]">
							Forgot your password?
						</a>
						{/* <div className="mt-5 flex items-center">
							<input
								id="terms-and-privacy"
								type="checkbox"
								name="terms-and-privacy"
								className="h-5 w-5 rounded border-gray-300 text-[#12b376] focus:outline-none focus:ring-[#12b376]"
							/>
							<label className="ml-2 text-sm">
								I agree to the{" "}
								<a
									href="#"
									className="text-[#12b376] font-bold"
								>
									Terms
								</a>{" "}
								and{" "}
								<a
									href="#"
									className="text-[#12b376] font-bold"
								>
									Privacy Policy
								</a>
								.
							</label>
						</div> */}
						<input
							type="submit"
							value="Log in"
							disabled={isSubmitting}
							className="disabled:cursor-wait disabled:opacity-50 disabled:bg-[#0d4432] mt-8 bg-[#12b376] p-3 rounded text-white shadow-md hover:bg-[#1b8a65] transition 300ms ease-in-out"
						/>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;
