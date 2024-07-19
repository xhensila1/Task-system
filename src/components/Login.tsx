import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from '../app/store'; // adjust the path as necessary
// import * as AuthService from '../services/AuthService';
import { login } from '../features/auth/authActions';

const Login: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const navigate = useNavigate();
    const dispatch = useDispatch();  // using the typed dispatch

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        try {
            await dispatch(login({ username, password })).unwrap();
            navigate('/dashboard');
        } catch (error: any) {
            setLoading(false);
            setErrorMessage('Failed to login. Please check your credentials.');
        }
    };
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="p-6 max-w-md w-full bg-white rounded shadow-md">
                <h2 className="text-xl font-bold text-gray-900 mb-2">Welcome Back!</h2>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-sm font-semibold text-gray-700">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-semibold text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </div>
                    {errorMessage && (
                        <p className="text-red-500 text-sm">{errorMessage}</p>
                    )}
                    <div className="flex items-center justify-center">
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50" disabled={loading}>
                            {loading ? 'Logging in...' : 'Sign in'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
