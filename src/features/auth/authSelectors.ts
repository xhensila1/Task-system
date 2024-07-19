// src/features/auth/authSelectors.ts
import { RootState } from '../../app/store';

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectToken = (state: RootState) => state.auth.token;
export const selectUsers = (state: RootState) => state.auth.users;
