import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { TaskType } from '../../types/taskTypes';
import { URL } from '../../const';

// Thunks
export const fetchTasks = createAsyncThunk<TaskType[]>('tasks/fetchTasks', async () => {
  const response = await axios.get(`${URL}/tasks`);
  return response.data;
});

export const addTask = createAsyncThunk<TaskType, TaskType>('tasks/addTask', async (task) => {
  const response = await axios.post(`${URL}/tasks`, task);
  return response.data;
});

export const updateTask = createAsyncThunk<TaskType, TaskType>('tasks/updateTask', async (task) => {
  const response = await axios.put(`${URL}/tasks/${task.id}`, task);
  return response.data;
});

export const deleteTask = createAsyncThunk<number, number>('tasks/deleteTask', async (id) => {
  await axios.delete(`${URL}/tasks/${id}`);
  return id;
});

interface TaskState {
  tasks: TaskType[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  columns: string[];
  filteredTasks: TaskType[];
}

const initialState: TaskState = {
  tasks: [],
  status: 'idle',
  columns: ['New', 'Work in Progress', 'Ready for Testing', 'Done'], // default columns
  filteredTasks: []
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setFilteredTasks: (state, action: PayloadAction<string>) => {
      const query = action.payload.toLowerCase();
      state.filteredTasks = state.tasks.filter(task =>
        task.description.toLowerCase().includes(query) ||
        task.assignee?.toLowerCase().includes(query) ||
        task.status.toLowerCase().includes(query) ||
        task.priority.toLowerCase().includes(query)
      );
    },
    addColumn: (state, action: PayloadAction<string>) => {
      state.columns.push(action.payload);
    },
    removeColumn: (state, action: PayloadAction<string>) => {
      state.columns = state.columns.filter(column => column !== action.payload);
    },
    setColumns: (state, action: PayloadAction<string[]>) => {
      state.columns = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<TaskType[]>) => {
        state.tasks = action.payload;
        state.filteredTasks = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchTasks.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(addTask.fulfilled, (state, action: PayloadAction<TaskType>) => {
        state.tasks.push(action.payload);
        state.filteredTasks.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action: PayloadAction<TaskType>) => {
        const index = state.tasks.findIndex(task => task.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
          const filteredIndex = state.filteredTasks.findIndex(task => task.id === action.payload.id);
          if (filteredIndex !== -1) {
            state.filteredTasks[filteredIndex] = action.payload;
          }
        }
      })
  },
});

export const { setFilteredTasks, addColumn, removeColumn, setColumns } = tasksSlice.actions;
export default tasksSlice.reducer;
