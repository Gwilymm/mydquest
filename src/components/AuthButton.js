import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthButton() {
	const { data: session, status } = useSession();
	const loading = status === "loading";

	// This handler will be used for the sign-in button
	const handleSignIn = () => {
		signIn('credentials', { callbackUrl: `${window.location.origin}/user` });
	};

	// This handler will be used for the sign-out button
	const handleSignOut = () => {
		signOut({ callbackUrl: `${window.location.origin}/` });
	};

	if (loading) return <div>Loading...</div>;

	if (session) {
		console.log('session', session);
		return (
			<>
				Signed in as {session.user.email} <br />
				<button onClick={handleSignOut}>Sign out</button>
			</>
		);
	}
	return (
		<>
			<div className="flex min-h-full items-center justify-center flex-col px-6 py-12 lg:px-8">
				<p className="mb-4 text-center text-lg">
					Not signed in <br />
				</p>
				<button
					onClick={handleSignIn}
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110"
				>
					Sign in
				</button>
			</div>

		</>

	);
}
