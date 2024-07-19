import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../app/store';
import { fetchTasks } from '../../features/tasks/taskSlice';
import { METRICS_DATA } from '../../const';
import { countTaskStatuses } from '../../utils/utils';
import { useTranslation } from 'react-i18next';
import { selectCurrentUser } from '../../features/auth/authSelectors';

const Metrics: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const tasks = useSelector((state: RootState) => state.tasks.tasks);
    const currentUser = useSelector(selectCurrentUser);
    const { t } = useTranslation();

    // Fetch tasks when the component is mounted
    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);

    // Function to count the statuses based on the user's role
    const countStatuses = (tasks: any[], user: any) => {
        if (user?.role === 'admin') {
            return countTaskStatuses(tasks);
        } else {
            const userTasks = tasks.filter(task => task.assignee === user?.id);
            return countTaskStatuses(userTasks);
        }
    };

    // Get the status counts based on the user's role
    const statusCounts = currentUser ? countStatuses(tasks, currentUser) : {};

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4">
            {METRICS_DATA.map(metric => (
                <div key={metric.label} className="bg-white rounded-lg shadow p-4 flex items-center space-x-2">
                    <FontAwesomeIcon icon={metric.icon} className={`text-3xl ${metric.color}`} />
                    <div>
                        <h3 className={`text-xl font-bold ${metric.color}`}>{statusCounts[metric.status] || 0}</h3>
                        <p className="text-sm text-gray-600">{t(metric.label)}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Metrics;
