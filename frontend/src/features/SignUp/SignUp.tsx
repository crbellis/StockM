import React from "react";
import account from "../../assets/Account.svg";
import "./SignUp.css";
import { useHistory } from "react-router";
import { NavLink } from "react-router-dom";
import { signUp } from "../API/API";

interface SignUpUser {
	firstName?: string;
	lastName?: string;
	email?: string;
	password?: string;
	confirmedPassword?: string;
	agreedToPrivacyAndTOS?: boolean;
}

const SignUp = () => {
	const history = useHistory();
	const [userCreds, setUserCreds] = React.useState<SignUpUser>({});
	const [showCriteria, setShowCriteria] = React.useState<boolean>(false);
	const [canSubmit, setCanSubmit] = React.useState<boolean>(false);
	const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);

	const handleBlur = () => {
		setShowCriteria(!showCriteria);
	};
	const handleChange = <T extends keyof SignUpUser>(
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const { name } = event.currentTarget;
		let value: string | boolean = event.currentTarget.value;
		if (name === "agreedToPrivacyAndTOS") {
			value = event.currentTarget.checked;
		}

		// setUserCreds(temp);
		let temp: SignUpUser = { ...userCreds, [name]: value };
		setUserCreds(temp as { [P in T]: SignUpUser[P] });
		if (
			Object.values(temp).indexOf(undefined) === -1 &&
			Object.values(temp).indexOf("") === -1 &&
			temp["password"] === temp["confirmedPassword"] &&
			temp["agreedToPrivacyAndTOS"] === true
		) {
			setCanSubmit(true);
		} else {
			setCanSubmit(false);
		}
	};

	const handleSubmit = async (event: React.SyntheticEvent) => {
		setIsSubmitting(true);
		event.preventDefault();
		const target = event.currentTarget as typeof event.currentTarget & {
			firstName: { value: string };
			lastName: { value: string };
			email: { value: string };
			password: { value: string };
			agreedToPrivacyAndTOS: { checked: boolean };
		};
		console.log(target);
		const { firstName, lastName, email, password, agreedToPrivacyAndTOS } =
			target;
		const payload = {
			first_name: firstName.value,
			last_name: lastName.value,
			email: email.value,
			password: password.value,
			agreedToPrivacyAndTOS: agreedToPrivacyAndTOS.checked,
		};
		try {
			const res = await signUp(payload);
			console.log(res?.status);
			setIsSubmitting(false);
			if (res?.status === 201) history.push("/login");
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className="w-screen h-screen flex justify-center items-center bg-[#f1f9f9]">
			<div className="hidden w-1/2 h-full items-center justify-center md:flex">
				<div className="custom-shape-divider-bottom-16307840872">
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
					src={account}
					alt="account"
					className="z-10 rounded-md bg-[#f1f9f9] w-96"
				/>
			</div>
			<div className="md:bg-white flex flex-col text-center md:h-full md:w-1/2 justify-center items-center">
				<div className="font-bold text-xl">Welcome to StockM</div>
				<div className="text-sm mb-2 mt-2">
					Already have an account?
					<NavLink to="/login" className="ml-1 text-[#12b376]">
						login
					</NavLink>
				</div>
				<div className="relative p-5 w-96 rounded-lg">
					<form
						className="flex flex-col text-left"
						onSubmit={handleSubmit}
					>
						<label className="mb-1">First name</label>
						<input
							type="text"
							name="firstName"
							placeholder="John"
							className="bg-gray-100 border border-gray-300 rounded px-3 pb-1 pt-2 shadow-sm
							focus:outline-none focus:border-[#12b376] focus:ring-1 focus:ring-[#12b376] placeholder-gray-400"
							onChange={handleChange}
						/>
						<label className="mb-1 mt-5">Last name</label>
						<input
							type="text"
							name="lastName"
							placeholder="Smith"
							className="bg-gray-100 border border-gray-300 rounded px-3 pb-1 pt-2 shadow-sm
							focus:outline-none focus:border-[#12b376] focus:ring-1 focus:ring-[#12b376] placeholder-gray-400"
							onChange={handleChange}
						/>
						<label className="mb-1 mt-5">Email</label>
						<input
							type="email"
							name="email"
							autoComplete="email"
							placeholder="john.smith@email.com"
							className="bg-gray-100 border border-gray-300 rounded px-3 pb-1 pt-2 shadow-sm
							focus:outline-none focus:border-[#12b376] focus:ring-1 focus:ring-[#12b376] placeholder-gray-400"
							onChange={handleChange}
						/>
						{userCreds["password"] !==
							userCreds["confirmedPassword"] && (
							<div className="mt-5 mb-0 text-sm text-red-500 text-center m-1 transition-all 200ms ease-in-out">
								Passwords don't match
							</div>
						)}
						<label htmlFor="password" className="mb-1 mt-5">
							Password
						</label>
						<div
							className={
								"absolute bottom-0 opacity-0 text-sm text-gray-400 mb-2 transition 800ms ease-in-out " +
								`${
									showCriteria
										? "relative visible opacity-100"
										: "invisible transform translate-y-5"
								}`
							}
						>
							Passwords must have 8 characters, 1 capital
							character, 1 number, 1 specicial character
						</div>

						<input
							type="password"
							name="password"
							autoComplete="password"
							placeholder="password"
							pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
							className="bg-gray-100 border border-gray-300 rounded px-3 pb-1 pt-2 shadow-sm
							focus:outline-none focus:border-[#12b376] focus:ring-1 focus:ring-[#12b376] placeholder-gray-400"
							onChange={handleChange}
							onFocus={handleBlur}
							onBlur={handleBlur}
						/>
						<label htmlFor="password" className="mb-1 mt-5">
							Confirm password
						</label>
						<input
							type="password"
							name="confirmedPassword"
							autoComplete="password"
							placeholder="confirm password"
							className="bg-gray-100 border border-gray-300 rounded px-3 pb-1 pt-2 shadow-sm
							focus:outline-none focus:border-[#12b376] focus:ring-1 focus:ring-[#12b376] placeholder-gray-400"
							onChange={handleChange}
						/>
						<div className="mt-5 flex items-center">
							<input
								id="terms-and-privacy"
								type="checkbox"
								name="agreedToPrivacyAndTOS"
								className="h-4 w-4 rounded-sm border-gray-300 text-[#12b376] focus:outline-none focus:ring-[#12b376] focus:ring-1"
								onChange={handleChange}
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
						</div>
						<input
							type="submit"
							value="Sign up"
							disabled={isSubmitting || !canSubmit}
							className="disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[#0d4432] mt-8 bg-[#12b376] p-3 rounded text-white shadow-md hover:bg-[#1b8a65] transition 300ms ease-in-out"
						/>
					</form>
				</div>
			</div>
		</div>
	);
};

export default SignUp;
