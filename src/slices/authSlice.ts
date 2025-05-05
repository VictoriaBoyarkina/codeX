import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { QueryStatus } from "./types";
import { toResponseData } from "@/transformers/toResponseData";
import { toUser, User } from "@/transformers/toUser";
import { RootState } from "@/store";
import { AuthForm } from "@/components/forms/Auth/schema";

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

export const login = createAsyncThunk("login", async (values: AuthForm) => {
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
      data.error.message || data.error || "Не удалось зарегистрироваться!"
    );
  }

  return user;
});

export const register = createAsyncThunk(
  "register",
  async (values: AuthForm) => {
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
        data.error.message || data.error || "Не удалось выполнить вход!"
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
  isSubmitting: boolean;
}

const initialState: AuthSliceState = {
  user: null,
  isAuthenticated: false,
  status: "idle",
  error: null,
  isRequestSent: false,
  isSubmitting: false,
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
      .addCase(login.pending, (state) => {
        state.error = null;
        state.isSubmitting = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isSubmitting = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload;
        state.isSubmitting = false;
      })
      .addCase(register.pending, (state) => {
        state.error = null;
        state.isSubmitting = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isSubmitting = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "failed";
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload;
        state.isSubmitting = false;
      })
      .addCase(logout.pending, (state) => {
        state.error = null;
        state.isSubmitting = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.status = "succeeded";
        state.user = null;
        state.isAuthenticated = false;
        state.isSubmitting = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.isSubmitting = false;
      });
  },
});

export const { setRequestSent } = authSlice.actions;
export default authSlice.reducer;
