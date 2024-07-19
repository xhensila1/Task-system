import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from '../../app/store';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { addTask, fetchTasks, updateTask } from '../../features/tasks/taskSlice';
import { fetchUsers } from '../../features/auth/authActions';
import { TaskType, TaskStatus, TaskPriority, CommentType, FileAttachment } from '../../types/taskTypes';


import TaskForm from './TaskForm';
import CommentsSection from './CommentsSection';
import AttachmentsSection from './AttachmentsSection';

import { selectTaskColumns, selectTasks } from 'features/tasks/taskSelectors';
import { selectCurrentUser, selectUsers } from 'features/auth/authSelectors';

const TaskDetailsPage: React.FC<{ mode: 'add' | 'edit' }> = ({ mode }) => {
    const { taskId } = useParams<{ taskId: string }>(); // Getting the taskId from URL parameters
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const tasks = useSelector(selectTasks)
    const users = useSelector(selectUsers); 
    const columns = useSelector(selectTaskColumns); 
    const currentUser = useSelector(selectCurrentUser); 
    const { t } = useTranslation(); // Using i18next for translations

    const task = tasks.find((task: TaskType) => task.id === taskId); // Finding the task by ID

    const initialFormData: TaskType = {
        id: '',
        description: '',
        startDate: '',
        estimation: 0,
        status: TaskStatus.NEW,
        assignee: '',
        priority: TaskPriority.LOW,
        comments: [],
        attachments: []
    };

    const [formData, setFormData] = useState<TaskType>(initialFormData);

    useEffect(() => {
        if (!tasks.length) {
            dispatch(fetchTasks()); // Fetching tasks if not already fetched
        }
        dispatch(fetchUsers()); // Fetching users
    }, [dispatch, tasks.length]);

    useEffect(() => {
        initializeFormData(); // Initializing form data when the task or mode changes
    }, [task, mode]);

    const initializeFormData = () => {
        if (task && mode === 'edit') {
            setFormData({ ...task, comments: task.comments || [], attachments: task.attachments || [] }); // Setting form data for edit mode
        } else if (mode === 'add') {
            setFormData(initialFormData); // Setting form data for add mode
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value }); // Handling input changes
    };

    const handleAddComment = (newComment: CommentType) => {
        setFormData({
            ...formData,
            comments: [...(formData.comments || []), newComment] // Adding a new comment to the form data
        });
    };

    const handleAddAttachment = (newAttachment: FileAttachment) => {
        setFormData({
            ...formData,
            attachments: [...(formData.attachments || []), newAttachment] // Adding a new attachment to the form data
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (mode === 'add') {
            dispatch(addTask(formData)).then(() => {
                navigate('/timesheet'); // Redirecting to the timesheet page after adding a task
            });
        } else if (mode === 'edit') {
            dispatch(updateTask(formData)).then(() => {
                navigate('/timesheet'); // Redirecting to the timesheet page after updating a task
            });
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-4 bg-white rounded shadow-md">
            <h1 className="text-xl font-bold mb-4">{mode === 'add' ? t('taskDetailsPage.addNewTask') : t('taskDetailsPage.taskDetails')}</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <TaskForm
                    formData={formData}
                    handleChange={handleChange}
                    users={users}
                    columns={columns} 
                />

                <CommentsSection
                    comments={formData.comments}
                    addComment={handleAddComment}
                    users={users}
                    currentUser={currentUser}
                />

                <AttachmentsSection
                    attachments={formData.attachments || []}
                    addAttachment={handleAddAttachment}
                />

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                    {mode === 'add' ? t('taskDetailsPage.addTask') : t('taskDetailsPage.saveChanges')}
                </button>
            </form>
        </div>
    );
};

export default TaskDetailsPage;
