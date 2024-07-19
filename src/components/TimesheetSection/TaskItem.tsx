// src/components/TimesheetSection/TaskItem.tsx
import React from 'react';
import { TaskType } from '../../types/taskTypes';

const TaskItem: React.FC<{ task: TaskType }> = ({ task }) => {
    return (
        <div className="task-item">
            <p>{task.description}</p>
            <p>Estimation: {task.estimation} hours</p>
            <p>Status: {task.status}</p>
        </div>
    );
};

export default TaskItem;
