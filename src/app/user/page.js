
"use client";
import React, { use, useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import { useSession, SessionProvider } from 'next-auth/react';
import { enregistrerEmailDansDB } from '@/utils/db';
import EnigmaList from '@/components/user/enigmalist';
import { verifyOfflinePassword } from '@/utils/db';
import { addUserWithOfflinePassword } from '@/utils/db';
import { hashPassword } from '@/utils/hash'; // Supposons que vous avez une fonction pour hasher
import OfflinePasswordModal from '@/components/user/OfflinePasswordModal'; // Un composant modal pour saisir le mot de passe hors ligne

export default function UserDashboardPage() {
	return (
		<SessionProvider>
			<UserDashboard />
		</SessionProvider>
	);
};


function UserDashboard() {
	const [ offlinePasswordRequired, setOfflinePasswordRequired ] = useState(false);
	const { data: session } = useSession();

	if (session) {
		// La session est disponible
		const email = session.user.email;
		// Appeler la fonction pour enregistrer l'e-mail dans la base de données locale
		enregistrerEmailDansDB(email);
	}
	useEffect(() => {
		// Supposons que cette fonction vérifie si un mot de passe hors ligne est déjà défini
		const checkOfflinePassword = async () => {
			const hasOfflinePassword = await verifyOfflinePassword(/* Paramètres nécessaires */);
			if (!hasOfflinePassword) {
				setOfflinePasswordRequired(true);
			}
		};

		checkOfflinePassword();
	}, []);

	const handleOfflinePasswordSubmit = async (password) => {
		const hashedPassword = hashPassword(password); // Hash le mot de passe
		// Stockez le mot de passe hashé localement et à distance
		await addUserWithOfflinePassword({ offlinePassword: hashedPassword });
		setOfflinePasswordRequired(false);
		// Ajoutez ici d'autres logiques si nécessaire, comme la synchronisation avec la base de données distante
	};

	return (
		<div className="bg-gray-100 text-gray-900 min-h-screen">
			<Navbar />
			<main className="p-4">
				<EnigmaList />
				{offlinePasswordRequired && (
					<OfflinePasswordModal onSubmit={handleOfflinePasswordSubmit} />
				)}
			</main>
		</div>
	);
}


