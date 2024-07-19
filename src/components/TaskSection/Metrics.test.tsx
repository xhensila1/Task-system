// // src/components/TaskSection/Metrics.test.tsx

// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import '@testing-library/jest-dom';
// import { Provider } from 'react-redux';
// import { BrowserRouter } from 'react-router-dom';
// import configureStore from 'redux-mock-store';
// import { RootState } from '../../app/store';
// import Metrics from './Metrics';
// import { TaskStatus, TaskPriority } from '../../types/taskTypes';
// import { METRICS_DATA } from '../../const';

// const mockStore = configureStore([]);

// describe('Metrics', () => {
//   let store: ReturnType<typeof mockStore>;

//   beforeEach(() => {
//     const initialState: RootState = {
//       tasks: {
//         tasks: [
//           { id: '1', status: TaskStatus.NEW, description: '', startDate: '', estimation: 0, assignee: '', priority: TaskPriority.LOW, comments: [], attachments: [] },
//           { id: '2', status: TaskStatus.WORK_IN_PROGRESS, description: '', startDate: '', estimation: 0, assignee: '', priority: TaskPriority.LOW, comments: [], attachments: [] },
//           { id: '3', status: TaskStatus.READY_FOR_TESTING, description: '', startDate: '', estimation: 0, assignee: '', priority: TaskPriority.LOW, comments: [], attachments: [] },
//           { id: '4', status: TaskStatus.DONE, description: '', startDate: '', estimation: 0, assignee: '', priority: TaskPriority.LOW, comments: [], attachments: [] },
//         ],
//         columns: [],
//         status: 'idle',
//         filteredTasks: [],
//       },
//       auth: {
//         user: null,
//         token: null,
//         isAuthenticated: false,
//         users: [],
//       },
//     };
//     store = mockStore(initialState);
//   });

//   test('renders Metrics component with correct data', () => {
//     render(
//       <Provider store={store}>
//         <BrowserRouter>
//           <Metrics />
//         </BrowserRouter>
//       </Provider>
//     );

//     // Cast the return value of getState to RootState
//     const state = store.getState() as RootState;

//     // Check if metrics data is rendered correctly
//     METRICS_DATA.forEach(metric => {
//       const count = state.tasks.tasks.filter(task => task.status === metric.status.replace('statuses.', '')).length;
//       expect(screen.getByText(count.toString())).toBeInTheDocument();
//       expect(screen.getByText(metric.label)).toBeInTheDocument();
//     });
//   });
// });
