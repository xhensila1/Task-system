// src/components/Dashboard.tsx
import React from 'react';
import Metrics from '../TaskSection/Metrics';
import PieChart from '../TaskSection/PieChart';
import TaskTable from '../TaskSection/TaskTable';

const Dashboard: React.FC = () => {
    return (
        <div className="bg-gray-100 min-h-screen p-5">
            <Metrics />
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mt-4">
                <div className="md:col-span-7">
                    <div className="bg-white p-4 rounded-lg shadow">
                        <TaskTable />
                    </div>
                </div>
                <div className="md:col-span-5">
                    <div className="bg-white p-4 rounded-lg shadow">
                        <PieChart />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
