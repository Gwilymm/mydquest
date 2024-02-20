// pages/_app.js
import { SessionProvider } from "next-auth/react";
import '@/app/globals.css'; // Import global styles, adjust the path as necessary

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
	return (
		<SessionProvider session={session}>
			<Component {...pageProps} />
		</SessionProvider>
	);
}

export default MyApp;
