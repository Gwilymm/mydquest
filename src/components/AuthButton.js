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
			Not signed in <br />
			<button onClick={handleSignIn}>Sign in</button>
		</>
	);
}
