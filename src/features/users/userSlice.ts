import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { User } from '../../types/authTypes'; // Define User type in authTypes
import { URL } from '../../const';

// Fetch all users
export const fetchUsers = createAsyncThunk<User[]>(
  'users/fetchUsers',
  async () => {
    const response = await axios.get(`${URL}/users`);
    return response.data;
  }
);

interface UsersState {
  users: User[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: UsersState = {
  users: [],
  status: 'idle',
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default userSlice.reducer;
