// src/features/auth/authActions.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { LoginResponse, LoginCredentials } from '../../types/authTypes';
import * as AuthService from '../../services/AuthService';

export const fetchUsers = createAsyncThunk(
  'auth/fetchUsers',
  async () => {
    const response = await AuthService.fetchUsers();
    return response;
  }
);

export const login = createAsyncThunk<LoginResponse, LoginCredentials>(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await AuthService.login(credentials);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async () => {
    AuthService.logout();
  }
);
