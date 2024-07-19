import React, { useState } from 'react';
import { useDispatch } from '../../app/store';
import { useNavigate, NavLink } from 'react-router-dom';
import { logout } from '../../features/auth/authActions';
import SearchBar from './SearchBar';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from 'react-i18next';

const Header: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showConfirmLogout, setShowConfirmLogout] = useState(false);
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation();

    const handleLogout = async () => {
        setLoading(true);
        await dispatch(logout());
        setLoading(false);
        navigate('/login');
    };

    const goToAddTask = () => {
        navigate('/add-task');
    };

    return (
        <header className="bg-white shadow py-4 px-5 text-xl font-semibold text-gray-800 mb-4 flex justify-between items-center">
            <div className="flex items-center">
                <NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'text-blue-500 mr-6' : 'mr-6')}>
                    {t('header.dashboard')}
                </NavLink>
                <NavLink to="/timesheet" className={({ isActive }) => (isActive ? 'text-blue-500 mr-6' : 'mr-6')}>
                    {t('header.timesheet')}
                </NavLink>
                <button
                    onClick={goToAddTask}
                    className="bg-green-500 text-white px-4 py-2 rounded ml-4 text-sm"
                >
                    {t('header.addNewTask')}
                </button>
            </div>
            <div className="flex items-center space-x-4">
                <SearchBar />
                <LanguageSwitcher />
                <button
                    onClick={() => setShowConfirmLogout(true)}
                    className="bg-blue-500 text-white px-4 py-2 rounded text-sm"
                >
                    {t('header.logout')}
                </button>
            </div>
            {showConfirmLogout && (
                <div className="absolute top-16 right-4 bg-white border border-gray-300 shadow-md rounded p-4 text-sm">
                    <p>{t('header.confirmLogout')}</p>
                    <div className="flex space-x-4 mt-4">
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 text-white px-4 py-2 rounded flex items-center"
                            disabled={loading}
                        >
                            {loading ? <div className="spinner" /> : t('header.yes')}
                        </button>
                        <button
                            onClick={() => setShowConfirmLogout(false)}
                            className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                            disabled={loading}
                        >
                            {t('header.no')}
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
