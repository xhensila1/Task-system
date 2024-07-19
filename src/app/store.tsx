import { configureStore } from '@reduxjs/toolkit';
import { useDispatch as reduxUseDispatch, TypedUseSelectorHook, useSelector as reduxUseSelector } from 'react-redux';
import authReducer from '../features/auth/authSlice';
import taskReducer from '../features/tasks/taskSlice'

export const store = configureStore({
    reducer: {
        tasks: taskReducer,
        auth: authReducer,
    },
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useDispatch = () => reduxUseDispatch<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = reduxUseSelector;

export type { RootState, AppDispatch };
