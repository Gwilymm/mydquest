// fichier : pages/api/user-answer-verification.js
import { getSession } from "next-auth/react";
import prisma from "@/utils/prisma";



export default async function handler(req, res) {
	// Utiliser getSession pour obtenir les informations de l'utilisateur connecté
	const session = await getSession({ req });
	console.log('session', session);

	if (!session) {
		return res.status(401).json({ message: "Unauthorized" });
	}

	if (req.method === 'GET') {
		const enigmaId = req.query.enigmaId;
		const userAnswer = req.query.userAnswer;

		try {
			// Trouver l'utilisateur basé sur l'email de la session (assurez-vous que l'email est unique dans votre base de données)
			const user = await prisma.user.findUnique({
				where: { email: session.user.email },
			});

			if (!user) {
				return res.status(404).json({ message: "User not found" });
			}

			// Récupérer l'énigme basée sur enigmaId pour vérifier la solution
			const enigma = await prisma.enigma.findUnique({
				where: { id: parseInt(enigmaId) },
			});

			if (!enigma) {
				return res.status(404).json({ message: "Enigma not found" });
			}

			// Vérifier si la réponse de l'utilisateur correspond à la solution de l'énigme
			if (enigma.solution.toLowerCase() === userAnswer.toLowerCase()) {
				// Marquer l'énigme comme résolue pour cet utilisateur
				await prisma.userEnigmas.upsert({
					where: {
						userId_enigmaId: {
							userId: user.id,
							enigmaId: parseInt(enigmaId),
						},
					},
					update: { isSolved: true },
					create: {
						userId: user.id,
						enigmaId: parseInt(enigmaId),
						isSolved: true,
					},
				});

				res.status(200).json({ message: "Correct answer!" });
			} else {
				res.status(400).json({ message: "Incorrect answer." });
			}
		} catch (error) {
			console.error('Error verifying answer:', error);
			res.status(500).json({ message: 'Failed to verify answer.' });
		}
	} else {
		res.setHeader('Allow', [ 'GET' ]);
		res.status(405).end(`Method ${req.method} Not Allowed`);
	}
}
