// src/features/tasks/selectors.ts

import { RootState } from '../../app/store';

export const selectTasks = (state: RootState) => state.tasks.tasks;
export const selectFilteredTasks = (state: RootState) => state.tasks.filteredTasks;
export const selectTaskStatus = (state: RootState) => state.tasks.status;
export const selectTaskColumns = (state: RootState) => state.tasks.columns;
