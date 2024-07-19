import { TaskType } from '../types/taskTypes';

type StatusCounts = {
    [key: string]: number;
};

export const countTaskStatuses = (tasks: TaskType[]): StatusCounts => {
    return tasks.reduce((acc: StatusCounts, task) => {
        const { status } = task;
        acc[status] = acc[status] ? acc[status] + 1 : 1;
        return acc;
    }, {});
};

export type SortConfig = { key: keyof TaskType; direction: 'ascending' | 'descending' } | null;

export const sortTasks = (tasks: TaskType[], sortConfig: SortConfig): TaskType[] => {
    if (!sortConfig) return tasks;

    const sortedTasks = [...tasks];
    sortedTasks.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (aValue === undefined || bValue === undefined) {
            return 0;
        }

        if (aValue < bValue) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
    });

    return sortedTasks;
};