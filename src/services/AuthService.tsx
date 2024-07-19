import axios from 'axios';
import { LoginCredentials, LoginResponse, User } from '../types/authTypes';
import { URL } from '../const';

export const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await axios.post(`${URL}/login`, credentials);
    localStorage.setItem('user', JSON.stringify(response.data.user));
    localStorage.setItem('token', response.data.token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
    return response.data;
};

export const logout = (): void => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
};

export const getCurrentUser = (): LoginResponse | null => {
    const userJson = localStorage.getItem('user');
    return userJson ? JSON.parse(userJson) : null;
};
export const fetchUsers = async (): Promise<User[]> => {
    const response = await axios.get(`${URL}/users`);
    return response.data;
};
