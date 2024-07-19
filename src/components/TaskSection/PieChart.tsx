// src/components/PieChart.tsx
import React, { useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import {AppDispatch } from '../../app/store';
import { fetchTasks } from '../../features/tasks/taskSlice';
import { STATUSES } from '../../const';
import { selectTasks } from 'features/tasks/taskSelectors';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const tasks = useSelector(selectTasks)

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const statusCounts = STATUSES.map(status =>
    tasks.filter(task => task.status === status).length
  );

  const data = {
    labels: STATUSES,
    datasets: [
      {
        data: statusCounts,
        backgroundColor: ['#10B981', '#F59E0B', '#3B82F6', '#6B7280'],
        borderColor: ['#FFFFFF'],
      },
    ],
  };

  return (
    <div className="w-full p-4 text-center">
      <div className="inline-block w-full max-w-sm">
        <Pie data={data} />
      </div>
    </div>
  );
};

export default PieChart;
