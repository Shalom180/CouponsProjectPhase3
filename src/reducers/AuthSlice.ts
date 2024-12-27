import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import { JwtUser } from "../models/JwtUser";

// The structure of what's actually saved in the state (in the cache)
interface AuthState {
    clientType: string;
    username: string;
    id: number;
    email: string;
    expiresAt: Date | null;  // Change to nullable Date
    token: string;
}

const initialState: AuthState = {
    clientType: "",
    username: "",
    id: 0,
    email: "",
    expiresAt: null,
    token: ""
};

// Function to decode the token
const decodeToken = (token: string): JwtUser => {
    try {
        return jwtDecode<JwtUser>(token);
    } catch (error) {
        throw new Error("Invalid token format");
    }
};

export const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        // Login action
        login: (state: AuthState, action: PayloadAction<string>) => {
            const token = action.payload;
            state.token = token;
            const decodedToken: JwtUser = decodeToken(token);
            state.clientType = decodedToken.clientType;
            state.id = decodedToken.id;
            state.username = decodedToken.username;
            state.email = decodedToken.email;
            state.expiresAt = new Date(decodedToken.expiresAt); // Convert expiresAt to Date
            localStorage.setItem("token", token); // Save the token in localStorage
        },

        // Logout action
        logout: (state: AuthState) => {
            state.clientType = "";
            state.username = "";
            state.email = "";
            state.expiresAt = null;
            state.token = "";
            localStorage.removeItem('token');
        }
    }
});

// Export actions and reducer
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
