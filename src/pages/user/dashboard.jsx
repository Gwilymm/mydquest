
import UserDashboardLayout from '@/components/dashboard/UserDashboardLayout';
// pages/user/dashboard.js
import { useSession, getSession, SessionProvider } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // Do nothing while loading
    if (!session) router.push('/'); // Redirect if not authenticated
  }, [session, status, router]);

	return (

		<SessionProvider session={session}>
			<UserDashboardLayout>
			{/* Your dashboard content here */}
				<p>This is your dashboard content</p>
			</UserDashboardLayout>
		</SessionProvider>
	);
}
