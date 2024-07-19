import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
    return (
        <div className="bg-gray-50 min-h-screen flex flex-col justify-center items-center">
            <header className="text-center">
                <h1 className="text-5xl text-blue-600 font-bold mt-0 mb-2">Task Managment System</h1>
                <p className="text-gray-600 text-lg">Manage your tasks efficiently and collaborate with your team in real time.</p>
            </header>
            <div className="mt-10">
                <Link to="/login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-2">
                    Login
                </Link>
                {/* <Link to="/dashboard" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full">
                   My Dashboard
                </Link> */}
            </div>
            <section className="mt-20 mx-auto p-4 max-w-4xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">Plan Your Day</h5>
                        <p className="font-normal text-gray-700">Organize your tasks with a simple drag-and-drop interface.</p>
                    </div>
                    <div className="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">Collaborate</h5>
                        <p className="font-normal text-gray-700">Share tasks with your team and collaborate in real time.</p>
                    </div>
                    <div className="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">Analyze</h5>
                        <p className="font-normal text-gray-700">Generate reports and gain insights into your team's productivity.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
