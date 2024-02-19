// DashboardLayout.js
import React from 'react';

const DashboardLayout = ({ children }) => {
	return (
		<div className="flex h-screen bg-gray-100">
			<Sidebar />
			<div className="flex-1 flex flex-col overflow-hidden">
				<Header />
				<main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
					{children}
				</main>
			</div>
		</div>
	);
};

const Sidebar = () => {
	// Define your sidebar here
	return (
		<aside className="z-20 hidden w-64 overflow-y-auto bg-gray-800 md:block">
			<div className="py-4 text-gray-500">
				{/* Sidebar content goes here */}
			</div>
		</aside>
	);
};

const Header = () => {
	// Define your header here
	return (
		<header className="flex justify-between items-center py-4 px-6 bg-white border-b-4 border-indigo-600">
			<h1 className="text-3xl font-semibold text-gray-800">Dashboard</h1>
			{/* Header content goes here */}
		</header>
	);
};

export default DashboardLayout;
