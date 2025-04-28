import { User } from "@/types";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { QueryStatus } from "./types";
import { toResponseData } from "@/transformers/toResponseData";
import { toUser } from "@/transformers/toUser";
import { LoginForm } from "@/forms/Login/schema";
import { SignupForm } from "@/forms/Signup/schema";
import { RootState } from "@/store";

export const auth = createAsyncThunk(
  "auth",
  async (_, { dispatch }) => {
    dispatch(setRequestSent());

    const response = await fetch("/codex/auth", {
      method: "GET",
    });

    const data = await response.json();

    if (!response.ok || "error" in data) {
      throw new Error(data.error.message || data.error);
    }

    return toUser(toResponseData(data));
  },
  {
    condition: (_, { getState }) => {
      const state = getState() as RootState;
      const isRequestSent = state.auth.isRequestSent;
      if (isRequestSent) {
        return false;
      }
    },
  }
);

export const login = createAsyncThunk("login", async (values: LoginForm) => {
  const response = await fetch("/codex/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });

  const data = await response.json();
  const user = toUser(toResponseData(data));

  if (!response.ok || "error" in data || !user) {
    throw new Error(
      data.error.message || data.error || "Неизвестный пользователь!"
    );
  }

  return user;
});

export const register = createAsyncThunk(
  "register",
  async (values: SignupForm) => {
    const response = await fetch("/codex/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const data = await response.json();
    const user = toUser(toResponseData(data));

    if (!response.ok || "error" in data || !user) {
      throw new Error(
        data.error.message || data.error || "Неизвестный пользователь!"
      );
    }

    return user;
  }
);

export const logout = createAsyncThunk("logout", async () => {
  const response = await fetch("/codex/logout", {
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
  isRequestSent: boolean;
}

const initialState: AuthSliceState = {
  user: null,
  isAuthenticated: false,
  status: "idle",
  error: null,
  isRequestSent: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setRequestSent: (state) => {
      state.isRequestSent = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(auth.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(auth.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(auth.rejected, (state, action) => {
        state.status = "failed";
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload;
      })
      .addCase(logout.pending, (state) => {
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.status = "succeeded";
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(login.pending, (state) => {
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload;
      })
      .addCase(register.pending, (state) => {
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "failed";
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload;
      });
  },
});

export const { setRequestSent } = authSlice.actions;
export default authSlice.reducer;
