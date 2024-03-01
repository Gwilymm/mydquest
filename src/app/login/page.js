"use client";
import { useSession, SessionProvider } from 'next-auth/react';
import AuthButton from "@/components/AuthButton";
import { motion } from 'framer-motion';

export default function Example() {
	return (
		<SessionProvider>
			<LoginPage />
		</SessionProvider>
	);
}

function LoginPage() {
	const { data: session } = useSession();
	console.log('session', session);

	/* L'extrait de code `//si la session est active, rediriger vers la page utilisateur
	si (session) {
	window.location.href = "/utilisateur" ;
	}` vérifie si une session utilisateur est active. Si l'objet `session` est véridique (ce qui
	signifie qu'une session utilisateur existe), il redirigera l'utilisateur vers la page "/user" en
	modifiant l'emplacement de la fenêtre. Il s'agit d'une manière courante de gérer l'authentification
	dans les applications Web où les utilisateurs doivent être redirigés vers une page spécifique après
	s'être connectés avec succès. */

	//if session is active, redirect to user page
	if (session) {
		window.location.href = "/user";
	}

	return (
		<div className="flex min-h-screen items-center justify-center bg-gray-200 py-12 px-4 sm:px-6 lg:px-8">
			<motion.div
				initial={{ scale: 0.95, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				transition={{ duration: 0.5 }}
				className="w-full max-w-md space-y-8"
			>
				<div className="flex min-h-full  flex-col justify-center bg-gray-50 px-6 py-12 lg:px-8 shadow">
					<div className="sm:mx-auto sm:w-full  sm:max-w-sm">
						<img
							className="mx-auto h-12 w-auto"
							src="./assets/image/logo/mydquest_new_logo_72x72.png"
							alt="Your Company"
						/>
						<h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
							Sign in to your account
						</h2>
						<div className=" justify-center">
							<AuthButton />
						</div>
					</div>
				</div>

				<motion.div
					initial={{ x: -10, opacity: 0 }}
					animate={{ x: 0, opacity: 1 }}
					transition={{ duration: 0.5 }}
				>
				</motion.div>
			</motion.div>
		</div>
	);
}
