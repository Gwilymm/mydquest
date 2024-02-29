// In your page or component file
import Navbar from '@/components/Navbar'; // Adjust the path according to your file structure

function UserDashboardPage() {
	return (
		<div className="bg-gray-100 text-gray-900 min-h-screen">
			<Navbar />
			<main className="p-4">
				{/* Main content goes here */}
			</main>
		</div>
	);
}

export default UserDashboardPage;
