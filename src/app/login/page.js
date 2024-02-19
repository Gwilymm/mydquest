"use client";
import { useSession, SessionProvider } from 'next-auth/react';

export default function Example() {
	return (
		<SessionProvider>
			<LoginPage />
		</SessionProvider>
	);
}

function LoginPage() {
	const { data: session } = useSession();

	return (
		<div className="flex min-h-full flex-1">
			<div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
				<div className="mx-auto w-full max-w-sm lg:w-96">
					<div>
						<img
							className="h-10 w-auto"
							src="./assets/image/logo/mydquest_new_logo_72x72.png"
							alt="Your Company"
						/>
						<h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
							Sign in to your account
						</h2>
						<p className="mt-2 text-sm leading-6 text-gray-500">
							Not a member?{' '}
							<a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
								Start a 14 day free trial
							</a>
						</p>
					</div>

					<div className="mt-10">
						<div>
							<form action="#" method="POST" className="space-y-6">
								{/* Add your email and password input fields here */}

								<div>
									{!session ? (
										<button
											onClick={() => signIn('google')}
											className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent"
										>
											<svg className="h-5 w-5" aria-hidden="true" viewBox="0 0 24 24">
												{/* Add Google icon SVG here */}
											</svg>
											<span className="text-sm font-semibold leading-6">Sign in with Google</span>
										</button>
									) : (
										<button onClick={() => signOut()} className="font-semibold text-indigo-600 hover:text-indigo-500">Sign out</button>
									)}
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
			<div className="relative hidden w-0 flex-1 lg:block">
				<img
					className="absolute inset-0 h-full w-full object-cover"
					src="./assets/image/illustration/home.png"
					alt=""
				/>
			</div>
		</div>
	);
}
