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

	//if 

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
						src="./assets/image/logo/mydquest_new_logo_72x72.png"
						alt="Your Company"
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
