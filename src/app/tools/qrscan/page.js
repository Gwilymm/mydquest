// app/tools/qrscan/page.js
"use client";
import React, { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import Navbar from '@/components/Navbar'; // Ensure this path matches your project structure

const QRScanPage = () => {
	const qrRef = useRef(null);
	const [ session, setSession ] = useState(null); // Initialize session state

	useEffect(() => {
		// Fetch the session data from /api/session
		fetch('/api/session')
			.then(res => res.json())
			.then(data => {
				setSession(data.session); // Update session state with fetched data
			})
			.catch(error => {
				console.error("Failed to fetch session:", error);
			});
	}, []);

	useEffect(() => {
		let html5QrCode;
		// Ensure the QR scanner initialization only occurs if the session is loaded and the user is logged in
		if (session && session.user) {
			html5QrCode = new Html5QrcodeScanner("qr-reader", { fps: 10, qrbox: 250 }, false);
			const onScanSuccess = async (decodedText, decodedResult) => {
				// Assuming `decodedText` contains the QR code
				const qrCode = decodedText;
				const userEmail = session.user.email; // Extract email from session
				console.log('QR code scanned:', qrCode);
				try {
					const response = await fetch('/api/enigmas/add-to-user', {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({ userEmail, qrCode }),
					});

					if (response.ok) {
						console.log('Enigma added to user account successfully.');
					} else {
						console.error('Failed to add enigma to user account.');
					}
				} catch (error) {
					console.error('Error adding enigma to user account:', error);
				}
			};

			html5QrCode.render(onScanSuccess, (errorMessage) => {
				console.log(errorMessage);
			});
		}

		// Cleanup function
		return () => {
			if (html5QrCode) {
				html5QrCode.clear(); // Ensure QR scanner is cleared when component unmounts or session changes
			}
		};
	}, [ session ]); // Rerun this effect when the session state changes

	if (!session) {
		return <div>Loading...</div>;
	}

	if (!session.user) {
		return <div>Please log in to scan QR codes.</div>;
	}

	return (
		<div className="bg-gray-100 text-gray-900 min-h-screen">
			<Navbar />
			<div className="flex flex-col mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 items-center justify-center min-h-screen p-4">
				<div id="qr-reader" ref={qrRef} className="w-full max-w-md"></div>
			</div>
		</div>
	);
};

export default QRScanPage;
