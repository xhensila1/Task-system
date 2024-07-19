import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { TaskType } from '../../types/taskTypes';
import { sortTasks, SortConfig } from '../../utils/utils';
import { useTranslation } from 'react-i18next';
import { selectFilteredTasks } from 'features/tasks/taskSelectors';

const TaskTable: React.FC = () => {
    const { t } = useTranslation();

    // Get the list of tasks from the Redux store
    const tasks = useSelector(selectFilteredTasks);

    // State for sorting configuration
    const [sortConfig, setSortConfig] = useState<SortConfig>({
        key: 'priority',
        direction: 'ascending'
    });

    // Sort tasks whenever the task list or sort configuration changes
    const sortedTasks = React.useMemo(() => {
        return sortTasks(tasks, sortConfig);
    }, [tasks, sortConfig]);

    // Request a sort change when the table header is clicked
    const requestSort = (key: keyof TaskType) => {
        let direction: 'ascending' | 'descending' = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    // Get the class name for the sort indicator
    const getClassNamesFor = (name: keyof TaskType) => {
        if (!sortConfig) {
            return;
        }
        return sortConfig.key === name ? sortConfig.direction : undefined;
    };

    return (
        <div className="overflow-x-auto">
            <div className="overflow-y-auto max-h-96">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr>
                            <th className="p-4 border-b-2 border-gray-200">{t('table.number')}</th>
                            <th className="p-4 border-b-2 border-gray-200">{t('table.created')}</th>
                            <th className="p-4 border-b-2 border-gray-200">{t('table.state')}</th>
                            <th
                                onClick={() => requestSort('priority')}
                                className={`p-4 border-b-2 border-gray-200 cursor-pointer ${getClassNamesFor('priority')}`}
                            >
                                {t('table.priority')} {sortConfig?.key === 'priority' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
                            </th>
                            <th className="p-4 border-b-2 border-gray-200">{t('table.shortDescription')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedTasks.map((task) => (
                            <tr key={task.id}>
                                <td className="p-4 border-b border-gray-200">{task.id}</td>
                                <td className="p-4 border-b border-gray-200">{task.startDate}</td>
                                <td className="p-4 border-b border-gray-200">{task.status}</td>
                                <td className="p-4 border-b border-gray-200">{task.priority}</td>
                                <td className="p-4 border-b border-gray-200">{task.description}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TaskTable;
