import React from 'react';
import { TaskType } from '../../types/taskTypes';
import { PRIORITIES } from '../../const';
import { useTranslation } from 'react-i18next';

interface TaskFormProps {
    formData: TaskType;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    users: any[];
    columns: string[];
}

const TaskForm: React.FC<TaskFormProps> = ({ formData, handleChange, users, columns }) => {
    const { t } = useTranslation(); // Using i18next for translations

    return (
        <>
            <div className="mb-4">
                {/* Description input field */}
                <label className="block text-gray-700">{t('taskForm.description')}</label>
                <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded"
                />
            </div>
            <div className="mb-4">
                {/* Start Date input field */}
                <label className="block text-gray-700">{t('taskForm.startDate')}</label>
                <input
                    type="date"
                    name="startDate"
                    value={formData.startDate || ''}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded"
                />
            </div>
            <div className="mb-4">
                {/* Estimation input field */}
                <label className="block text-gray-700">{t('taskForm.estimation')}</label>
                <input
                    type="number"
                    name="estimation"
                    value={formData.estimation || ''}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded"
                />
            </div>
            <div className="mb-4">
                {/* Assignee select field */}
                <label className="block text-gray-700">{t('taskForm.assignee')}</label>
                <select
                    name="assignee"
                    value={formData.assignee}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded"
                >
                    <option value="" disabled>{t('taskForm.selectAssignee')}</option>
                    {users.map((user: any) => (
                        <option key={user.id} value={user.id}>
                            {user.username}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-4">
                {/* Status select field */}
                <label className="block text-gray-700">{t('taskForm.status')}</label>
                <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded"
                >
                    {columns.map((status) => (
                        <option key={status} value={status}>
                            {t(status)}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-4">
                {/* Priority select field */}
                <label className="block text-gray-700">{t('taskForm.priority')}</label>
                <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded"
                >
                    {PRIORITIES.map((priority) => (
                        <option key={priority} value={priority}>
                            {t(priority)}
                        </option>
                    ))}
                </select>
            </div>
        </>
    );
};

export default TaskForm;
