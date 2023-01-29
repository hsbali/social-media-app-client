import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/auth.slice";
import alertReducer from "./features/alert/alert.slice";

export const store = configureStore({
  reducer: {
    alerts: alertReducer,
    auth: authReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
