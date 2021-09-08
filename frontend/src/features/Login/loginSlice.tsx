import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { login } from "../API/API";

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
		const response = await login(email, password);
		return response?.json();
	}
);

export const userSlice = createSlice({
	name: "login",
	initialState,
	reducers: {
		signOut: (state) => {
			state = initialState;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(authenticate.pending, (state) => {
				state.status = "loading";
			})
			.addCase(authenticate.fulfilled, (state, action) => {
				console.log(action.payload);
				state.status = "idle";
				state.authed = action.payload.email ? true : false;
				state.email = action.payload.email;
				state.firstName = action.payload.first_name;
				state.lastName = action.payload.last_name;
				state.accessToken = action.payload.accessToken;
				state.refreshToken = action.payload.refreshToken;
			})
			.addCase(authenticate.rejected, (state) => {
				state.status = "failed";
			});
	},
});

export const { signOut } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
