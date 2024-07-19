// src/features/auth/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginResponse } from '../../types/authTypes';
import { fetchUsers, login, logout } from './authActions';

interface AuthState {
  user: any;
  token: string | null;
  isAuthenticated: boolean;
  users: any[];
}

const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),
  users: [],
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    hydrateAuthState: (state, action: PayloadAction<{ user: any, token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<any>) => {
        state.users = action.payload;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      });
  },
});

export const { hydrateAuthState } = authSlice.actions;
export default authSlice.reducer;
