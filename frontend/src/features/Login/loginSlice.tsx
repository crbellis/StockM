import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";
import { RootState } from "../../app/store";
import { login, signOutCall } from "../API/API";

export interface UserState {
	authed: boolean;
	firstName?: string;
	lastName?: String;
	email?: string;
	accessToken?: string;
	refreshToken?: string;
	status: "idle" | "loading" | "failed";
}

const initialState: UserState = {
	authed: false,
	status: "idle",
};

export const authenticate = createAsyncThunk(
	"login/authenticate",
	async ({ email, password }: { email: string; password: string }) => {
		const res = await login(email, password);
		return res?.json();
	}
);

export const signOut = createAsyncThunk("login/signout", async () => {
	console.log("SIGNOUT CREATOR");
	const res = await signOutCall();
	return res?.status;
});

export const userSlice = createSlice({
	name: "login",
	initialState,
	reducers: {
		tokenAuthenticate: (state, action) => {
			try {
				const user: {
					email: string;
					first_name: string;
					last_name: string;
					accessToken: string;
					refreshToken: string;
				} = jwt_decode(action.payload.accessToken);
				state.status = "idle";
				state.authed = user?.email ? true : false;
				state.email = user?.email;
				state.firstName = user.first_name;
				state.lastName = user.last_name;
			} catch (error) {
				console.log(error);
			}
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(authenticate.pending, (state) => {
				state.status = "loading";
			})
			.addCase(authenticate.fulfilled, (state, action) => {
				state.status = "idle";
				state.authed = action.payload.email ? true : false;
				state.email = action.payload.email;
				state.firstName = action.payload.first_name;
				state.lastName = action.payload.last_name;
			})
			.addCase(authenticate.rejected, (state) => {
				state.status = "failed";
			})
			.addCase(signOut.pending, (state) => {
				state.status = "loading";
			})
			.addCase(signOut.fulfilled, (state) => {
				return { ...initialState };
			})
			.addCase(signOut.rejected, (state) => {
				state.status = "failed";
			});
	},
});

export const { tokenAuthenticate } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
