// In your page or component file
import Navbar from '@/components/Navbar'; // Adjust the path according to your file structure
import EnigmaList from '@/components/user/enigmalist';
function UserDashboardPage() {
	return (
		<div className="bg-gray-100 text-gray-900 min-h-screen">
			<Navbar />
			<main className="p-4">
				<EnigmaList />
			</main>
		</div>
	);
}

export default UserDashboardPage;
