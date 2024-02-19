// pages/dashboard.js
import React from 'react';
import DashboardLayout from '../components/DashboardLayout';

const DashboardPage = () => {
	return (
		<DashboardLayout>
			<div className="px-4 py-6 sm:px-0">
				{/* Add dashboard content here */}
				<div className="rounded-lg h-96">
					{/* This is where you could map over your data and display cards or other UI elements */}
				</div>
			</div>
		</DashboardLayout>
	);
};

export default DashboardPage;
