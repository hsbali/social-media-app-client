import {
  createAsyncThunk,
  createSlice,
  isAnyOf,
  SerializedError,
} from "@reduxjs/toolkit";
import { RootState } from "../../store";

import {
  signupUser,
  loadUser,
  loginUser,
  refreshAccessToken,
  updateUser,
  logoutUser,
} from "./auth.api";

import { IUser } from "../../interfaces/server/user.interface";

export const signupUserThunk = createAsyncThunk("auth/signupUser", signupUser);
export const loginUserThunk = createAsyncThunk("auth/loginUser", loginUser);
export const loadUserThunk = createAsyncThunk("auth/loadUser", loadUser);
export const refreshAccessTokenThunk = createAsyncThunk(
  "auth/refreshAccessToken",
  refreshAccessToken
);
export const updateUserThunk = createAsyncThunk("auth/updateUser", updateUser);
export const logoutUserThunk = createAsyncThunk("auth/logoutUser", logoutUser);

export interface IAuthState {
  isAuthenticated: boolean;
  isLoggedOut: boolean;
  doRefresh: boolean;
  user: IUser | null;
  accessTokenExpiresIn: number;
  refreshTokenExpiresIn: number;
  fetching: boolean;
  error: SerializedError | null;
}

const initialState: IAuthState = {
  isAuthenticated: false,
  isLoggedOut: false,
  doRefresh: false,
  user: null,
  accessTokenExpiresIn: 0,
  refreshTokenExpiresIn: 0,
  fetching: false,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // // Use the PayloadAction type to declare the contents of `action.payload`
    // payloadAction: (state, action: PayloadAction<number>) => {
    //     state = action.payload
    //   },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadUserThunk.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.isLoggedOut = false;
        state.doRefresh = true;
        state.user = action.payload;
        state.fetching = false;
        state.error = null;
      })
      .addCase(refreshAccessTokenThunk.pending, (state) => {
        state.error = null;
      })
      .addCase(refreshAccessTokenThunk.fulfilled, (state, action) => {
        state.isLoggedOut = false;
        state.doRefresh = true;
        state.accessTokenExpiresIn = action.payload.accessTokenExpiresIn;
        state.refreshTokenExpiresIn = action.payload.refreshTokenExpiresIn;
        state.error = null;
      })
      .addCase(updateUserThunk.fulfilled, (state, action) => {
        if (state.user !== null) {
          state.user = { ...state.user, ...action.payload };
        }
      })
      .addCase(logoutUserThunk.fulfilled, () => ({
        ...initialState,
        isLoggedOut: true,
      }))
      .addMatcher(
        isAnyOf(signupUserThunk.fulfilled, loginUserThunk.fulfilled),
        (state, action) => {
          state.isAuthenticated = true;
          state.isLoggedOut = false;
          state.doRefresh = true;
          state.user = action.payload.user;
          state.accessTokenExpiresIn = action.payload.accessTokenExpiresIn;
          state.refreshTokenExpiresIn = action.payload.refreshTokenExpiresIn;
          state.fetching = false;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          signupUserThunk.pending,
          loginUserThunk.pending,
          loadUserThunk.pending,
          logoutUserThunk.pending
        ),
        (state) => {
          state.fetching = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          signupUserThunk.rejected,
          loginUserThunk.rejected,
          refreshAccessTokenThunk.rejected,
          loadUserThunk.rejected,
          logoutUserThunk.rejected
        ),
        (_, action) => ({ ...initialState, error: action.error })
      );
  },
});

// Other code such as selectors can use the imported `RootState` type
export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
