import Cookies from "js-cookie";

const getAccessToken = async (token: string) => {
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
		console.log("RESETING ACCESS:", accessToken);
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
					console.log(res);
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

export const login = async (
	email: string,
	password: string
): Promise<Response | undefined> => {
	try {
		const res = fetch("http://localhost:3001/api/login", {
			method: "POST",
			mode: "cors",
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

export const getSettings = async () => {
	try {
		const res = await authFetch(
			"GET",
			"http://localhost:3001/api/settings"
		);
		console.log(res);
	} catch (error) {
		console.log(error);
		return;
	}
};