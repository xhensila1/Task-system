import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';

import { useDispatch } from './app/store';

import Login from './components/Login';
import Header from './components/common/Header';
import Home from './components/Home/Homepage';
import Dashboard from './components/DashboardSection/DashboardPage';
import Timesheet from './components/TimesheetSection/TimesheetPage';
import TaskDetailsPage from './components/TaskSection/TaskDetails';
import { logout } from './features/auth/authActions';
import {hydrateAuthState} from './features/auth/authSlice';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (token && user) {
      dispatch(hydrateAuthState({ user, token })); // Update state with user and token
    } else {
      dispatch(logout());
    }
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Navigate replace to="/dashboard" />} />
          <Route path="/" element={<HeaderLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="timesheet" element={<Timesheet />} />
            <Route path="task/:taskId" element={<TaskDetailsPage mode="edit" />} />
            <Route path="add-task" element={<TaskDetailsPage mode="add" />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

// This component includes the Header and renders nested routes
const HeaderLayout = () => (
  <>
    <Header />
    <Outlet />
  </>
);

export default App;
