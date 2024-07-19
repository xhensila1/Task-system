import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from '../../app/store';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { setFilteredTasks } from '../../features/tasks/taskSlice';
import { selectTasks } from 'features/tasks/taskSelectors';


const SearchBar: React.FC = () => {
    const { t } = useTranslation();
    const [query, setQuery] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const tasks = useSelector(selectTasks)

    useEffect(() => {
        setQuery('');
    }, [navigate]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const task = tasks.find(task => task.id === query);
            if (task) {
                navigate(`/task/${task.id}`);
            } else {
                dispatch(setFilteredTasks(query));
            }
        }
    };

    return (
        <input
            type="text"
            placeholder={t('header.searchTasks')}
            value={query}
            onChange={handleSearch}
            onKeyDown={handleKeyDown}
            className="px-4 py-2 border rounded text-sm"
        />
    );
};

export default SearchBar;
