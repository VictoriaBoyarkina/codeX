import { User } from "@/types";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { QueryStatus } from "./types";
import { toResponseData } from "@/transformers/toResponseData";
import { toUser } from "@/transformers/toUser";

export const fetchUser = createAsyncThunk("auth/fetchUser", async () => {
  const response = await fetch("/codex/auth/user", {
    method: "GET",
  });

  const data = await response.json();

  if (!response.ok || "error" in data) {
    throw new Error(data.error.message || data.error);
  }

  return toUser(toResponseData(data));
});

export const logout = createAsyncThunk("auth/logout", async () => {
  const response = await fetch("/codex/auth/logout", {
    method: "POST",
  });

  const data = await response.json();

  if (!response.ok || "error" in data) {
    throw new Error(data.error.message || data.error);
  }
});

interface AuthSliceState {
  user: null | User;
  isAuthenticated: boolean;
  status: QueryStatus;
  error: any;
}

const initialState: AuthSliceState = {
  user: null,
  isAuthenticated: false,
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.status = "succeeded";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = "failed";
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload;
      })
      .addCase(logout.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.status = "succeeded";
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { login } = authSlice.actions;
export default authSlice.reducer;
