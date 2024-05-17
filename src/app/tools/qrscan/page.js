// app/tools/qrscan/page.js
"use client";
import { SessionProvider, useSession } from 'next-auth/react';
import React, { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import Navbar from '@/components/Navbar'; // Ensure this path matches your project structure
import Alert from '@/components/ui/alert'; // Ensure this path matches your project structure
//


export default function Page({ children }) {
	return (
		<SessionProvider>
			<QRScanPage />
		</SessionProvider>
	);
}



function QRScanPage() {
	const qrRef = useRef(null);
	const { data: session, status } = useSession(); // Utilisez destructuring pour accéder à la session
	console.log('session', session);
	const [ isAlertOpen, setIsAlertOpen ] = useState(false);
	const [ alertContent, setAlertContent ] = useState({ title: '', message: '', buttonText: 'Retour' });
	const showAlert = (title, message) => {
		setAlertContent({ title, message, buttonText: 'Retour' });
		setIsAlertOpen(true);
	};

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
						showAlert("Énigme ajoutée", "L'énigme a été ajoutée à votre compte avec succès.");
						window.location.href = "/user";
					} else if (response.status === 400) {
						showAlert("Erreur", "Énigme déjà ajoutée à votre compte.");
					} else {
						showAlert("Erreur", "Impossible d'ajouter l'énigme à votre compte. Veuillez réessayer.");
					}
				} catch (error) {
					console.error('Error adding enigma to user account:', error);
					showAlert("Erreur", "Une erreur est survenue lors de l'ajout de l'énigme.");
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
			{isAlertOpen && (
				<Alert
					isOpen={isAlertOpen}
					setIsOpen={setIsAlertOpen}
					title={alertContent.title}
					message={alertContent.message}
					buttonText={alertContent.buttonText}
				/>
			)}
		</div>
	);
};

