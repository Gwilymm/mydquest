"use client";
import { useSession, signIn } from 'next-auth/react';
import AuthButton from "@/components/AuthButton";
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function LoginPage() {
	const { data: session } = useSession();
	const router = useRouter();

	useEffect(() => {
		// If there is a session, redirect to the /user page
		if (session) {
			router.push('/user');
		}
	}, [ session, router ]);

	// If the session exists, we're redirecting, no need to render the login form
	if (session) return null;

	return (
		<div className="flex min-h-screen items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
			<motion.div
				initial={{ scale: 0.95, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				transition={{ duration: 0.5 }}
				className="w-full max-w-md space-y-8"
			>
				<div>
					<img
						className="mx-auto h-12 w-auto"
						src="/assets/image/logo/mydquest_new_logo_72x72.png" // Make sure the path is correct
						alt="MyD Quest Logo"
					/>
					<h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
						Sign in to your account
					</h2>
					<p className="mt-2 text-center text-sm text-gray-500">
						Not a member?{' '}
						<a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
							Start a 14 day free trial
						</a>
					</p>
				</div>

				<motion.div
					initial={{ x: -10, opacity: 0 }}
					animate={{ x: 0, opacity: 1 }}
					transition={{ duration: 0.5 }}
				>
					<AuthButton />
				</motion.div>
			</motion.div>
		</div>
	);
}
