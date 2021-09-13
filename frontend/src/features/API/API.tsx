import Cookies from "js-cookie";

export const getAccessToken = async (token: string) => {
	try {
		const res = await fetch("http://localhost:3001/api/token", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				refreshToken: token,
			}),
		});
		const { accessToken } = await res.json();
		Cookies.set("accessToken", accessToken, {
			sameSite: "Strict",
			secure: true,
		});
		return accessToken;
	} catch (error) {
		console.log(error);
		return;
	}
};

const authFetch = async (
	method: "POST" | "GET" | "PUT" | "DELETE",
	uri: string,
	body: object = {}
) => {
	let accessToken = Cookies.get("accessToken");
	if (accessToken) {
		try {
			const request: {
				method: string;
				headers: HeadersInit;
				body?: string;
			} = {
				method,
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${accessToken}`,
				},
				body: JSON.stringify({ ...body }),
			};

			if (!Object.keys(body).length) {
				delete request.body;
			}

			let res = await fetch(uri, request);
			if (res.ok) return res;
			if (res.status === 403) {
				const refreshToken = Cookies.get("refreshToken");
				if (refreshToken) {
					accessToken = await getAccessToken(refreshToken);
					res = await fetch(uri, request);
				}
				return res.status;
			}
		} catch (error) {
			console.log(error);
			return;
		}
	}
	return;
};

export const signUp = async (user: {
	first_name: string;
	last_name: string;
	email: string;
	agreedToPrivacyAndTOS: boolean;
	password: string;
}) => {
	try {
		const res = fetch("http://localhost:3001/api/signup", {
			method: "POST",
			mode: "cors",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(user),
		});
		return res;
	} catch (error) {
		console.log(error);
		return;
	}
};

export const login = async (
	email: string,
	password: string
): Promise<Response | undefined> => {
	try {
		const res = fetch("http://localhost:3001/api/login", {
			method: "POST",
			mode: "cors",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email, password }),
		});
		return res;
	} catch (e) {
		console.log("ERROR:", e);
		return;
	}
};

export const signOutCall = async (): Promise<Response | undefined> => {
	console.log("SIGNOUT API");
	try {
		const refreshToken = Cookies.get("refreshToken");
		console.log(refreshToken);
		const res = fetch("http://localhost:3001/api/signout", {
			method: "POST",
			mode: "cors",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ refreshToken: refreshToken }),
		});
		return res;
	} catch (e) {
		console.log("ERROR:", e);
		return;
	}
};

export const getSettings = async () => {
	try {
		const res = await authFetch(
			"GET",
			"http://localhost:3001/api/settings"
		);
		return res;
	} catch (error) {
		console.log(error);
		return;
	}
};
