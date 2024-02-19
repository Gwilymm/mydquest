'use client';
import { useState } from 'react';
import axios from 'axios';

function RegisterPage() {
	const [ username, setUsername ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ confirmPassword, setConfirmPassword ] = useState('');
	const [ acceptTerms, setAcceptTerms ] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!acceptTerms) {
			// Handle terms not accepted
			return;
		}
		try {
			const response = await axios.post('/api/createUser', { username, email, password });
			console.log('User created:', response.data);
			// Redirect or show success message
		} catch (error) {
			console.error('Error creating user:', error);
			// Handle error (e.g., display error message)
		}
	};


	return (
		<div className="min-h-screen flex items-center justify-center bg-slate-900">
			<div className="w-80 rounded-2xl bg-slate-900">
				<div className="flex flex-col gap-2 p-8">
					<p className="text-center text-3xl text-gray-300 mb-4">Register</p>
					<input
						className="bg-slate-900 w-full text-slate-200 rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800"
						placeholder="Username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
					<input
						className="bg-slate-900 w-full text-slate-200 rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800"
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<input
						className="bg-slate-900 w-full text-slate-200 rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800"
						placeholder="Password"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<input
						className="bg-slate-900 w-full text-slate-200 rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800"
						placeholder="Confirm password"
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>
					<label className="flex cursor-pointer items-center justify-between p-1 text-slate-400">
						Accept terms of use
						<div className="relative inline-block">
							<input
								className="peer h-6 w-12 cursor-pointer appearance-none rounded-full border border-gray-300 bg-gray-400 checked:border-green-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
								type="checkbox"
								checked={acceptTerms}
								onChange={(e) => setAcceptTerms(e.target.checked)}
							/>
							<span className="pointer-events-none absolute left-1 top-1 block h-4 w-4 rounded-full bg-slate-600 transition-all duration-200 peer-checked:left-7 peer-checked:bg-green-300"></span>
						</div>
					</label>
					<button
						className="inline-block cursor-pointer rounded-md bg-gray-700 px-4 py-3.5 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 focus-visible:ring-offset-2 active:scale-95"
						onClick={handleSubmit}
					>
						Register
					</button>
				</div>
			</div>
		</div>
	);
}

export default RegisterPage;
