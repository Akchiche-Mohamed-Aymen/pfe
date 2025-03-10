import { useState } from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
    const [activePage, setActivePage] = useState('Overview');

    const menuItems = [
        { name: 'Overview', path: '/dashboard' },
        { name: 'Audit', path: '/audit' },
        { name: 'Consulting', path: '/consulting' },
        { name: 'Marketing', path: '/marketing' },
        { name: 'Accounting', path: '/accounting' }
    ];

    return (
        <div className="flex h-screen bg-gray-200">
            {/* Sidebar */}
            <div className="w-64 bg-white shadow-md p-4">
                <h2 className="text-2xl font-bold text-blue-600 mb-6">Dashboard</h2>
                <nav className="space-y-2">
                    {menuItems.map((item) => (
                        <Link
                            key={item.name}
                            to={item.path}
                            className={`block px-4 py-2 rounded-md 
                            ${activePage === item.name ? 'bg-blue-600 text-white' : 'text-gray-700'}
                            hover:bg-blue-500 hover:text-white transition`}
                            onClick={() => setActivePage(item.name)}
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8">
                <h1 className="text-3xl font-bold text-gray-800">Welcome to the Dashboard</h1>
                <p className="text-gray-600 mt-2">
                    Select a module from the sidebar to get started.
                </p>
            </div>
        </div>
    );
}

export default Dashboard;