/**
 * Cette fonction JavaScript gère une requête POST pour ajouter une énigme au compte d'un utilisateur
 * en fonction de son email et d'un code QR.
 * @param   $req - Le paramètre « req » dans l'extrait de code représente l'objet de requête, qui
 * contient des informations sur la requête HTTP que le serveur reçoit. Cet objet comprend des détails
 * tels que la méthode de requête (GET, POST, PUT, DELETE, etc.), les en-têtes de requête, le corps de
 * la requête (pour les requêtes POST), les paramètres d'URL, la requête.
 * @param   $res - Le paramètre `res` dans votre code représente l'objet de réponse HTTP que vous
 * utilisez pour renvoyer une réponse au client effectuant la demande. Il vous permet de définir des
 * en-têtes, des codes d'état et de renvoyer des données au client.
 * @returns L'extrait de code fourni est une fonction de gestionnaire de route de l'API Next.js qui
 * gère une requête POST.
 * 
 * Generated on 02/29/2024 Gwilymm
 */
import prisma from "@/utils/prisma";

export default async function handler(req, res) {
	if (req.method === 'POST') {
		const { userEmail, qrCode } = req.body; // Expect userEmail instead of userId

		try {
			// Find the user by email to get the userId
			const user = await prisma.user.findUnique({
				where: {
					email: userEmail,
				},
			});

			// If user doesn't exist, handle appropriately
			if (!user) {
				return res.status(404).json({ error: 'User not found.' });
			}

			// Find the Enigma by its QR code
			const enigma = await prisma.enigma.findUnique({
				where: {
					qrCode: qrCode,
				},
			});

			// Handle case where Enigma is not found
			if (!enigma) {
				return res.status(404).json({ error: 'Enigma not found.' });
			}

			// Then, use the found user's ID and enigma's ID to create the UserEnigmas record
			// Utilisation de `upsert` au lieu de `create`
			const userEnigma = await prisma.userEnigmas.upsert({
				where: {
					userId_enigmaId: {
						userId: user.id,
						enigmaId: enigma.id,
					},
				},
				update: {}, // Pas besoin de mise à jour spécifique ici
				create: {
					userId: user.id,
					enigmaId: enigma.id,
				},
			});

			return res.status(200).json(userEnigma);
		} catch (error) {
			console.error('Failed to add enigma to user account:', error);
			return res.status(500).json({ error: 'Failed to add enigma to user account.' });
		}
	} else {
		// Handle any other HTTP method
		res.setHeader('Allow', [ 'POST' ]);
		res.status(405).end(`Method ${req.method} Not Allowed`);
	}
}
