import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import authService from "@/app/services/auth.service";
import { GET } from "@/app/api/http";
import { API } from "@/app/api/endpoints";

type User = any;

type AuthState = {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
};

// Try to hydrate token from localStorage on the client so UI can render immediately.
const clientToken = typeof window !== "undefined" ? localStorage.getItem("token") : null;
const initialState: AuthState = {
  user: null,
  token: clientToken,
  loading: false,
  error: null,
  isAuthenticated: !!clientToken,
};

export const login = createAsyncThunk(
  "auth/login",
  async (payload: { email: string; password: string }, thunkAPI) => {
    try {
      const res = await authService.login(payload);
      // Expecting { success, message, data: { token, user } }
      return res;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err?.message || "Login failed");
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await authService.logout();
  } catch (e) {
    // ignore logout errors
  }
});

export const fetchProfile = createAsyncThunk("auth/fetchProfile", async (_, thunkAPI) => {
  try {
    const res = await GET(API.USER.PROFILE);
    return res;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err?.message || "Failed to fetch profile");
  }
});

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(state, action: PayloadAction<{ user: User; token: string }>) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = !!action.payload.token;
      state.error = null;
    },
    clearAuth(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        const payload = action.payload;
        if (payload && payload.data) {
          state.token = payload.data.token ?? null;
          state.user = payload.data.user ?? null;
          state.isAuthenticated = !!payload.data.token;
          try {
            if (typeof window !== "undefined" && payload.data.token) {
              localStorage.setItem("token", payload.data.token);
            }
          } catch (e) {
            // ignore storage errors
          }
        } else {
          state.error = "Invalid login response";
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error.message || "Login failed";
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        try {
          if (typeof window !== "undefined") localStorage.removeItem("token");
        } catch (e) {}
      })
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        const payload = action.payload;
        if (payload) {
          // Expecting payload to be user object or { data: user }
          state.user = payload.data ?? payload ?? null;
        }
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error.message || "Failed to fetch profile";
        // If fetching profile failed (e.g. token invalid), clear token
        state.token = null;
        state.isAuthenticated = false;
        try {
          if (typeof window !== "undefined") localStorage.removeItem("token");
        } catch (e) {}
      });
  },
});

export const { setCredentials, clearAuth } = slice.actions;

export default slice.reducer;
