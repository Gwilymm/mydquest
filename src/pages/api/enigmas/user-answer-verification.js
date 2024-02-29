/**
 * Cette fonction vérifie la réponse d'un utilisateur à une énigme spécifique et met à jour le statut
 * en conséquence.
 * @param   $req - Le paramètre « req » dans l'extrait de code représente l'objet de requête qui
 * contient des informations sur la requête HTTP adressée au serveur. Il comprend des détails tels que
 * la méthode de requête (GET, POST, etc.), les en-têtes de requête, le corps de la requête, les
 * paramètres de requête, etc.
 * @param   $res - Le paramètre « res » dans l'extrait de code fait référence à l'objet de réponse
 * dans un serveur HTTP Node.js. Il est utilisé pour renvoyer une réponse au client qui fait la
 * demande. Dans ce contexte, `res` est utilisé pour envoyer des réponses JSON avec des codes d'état
 * appropriés basés sur la vérification d'un utilisateur
 * @returns La fonction de gestionnaire dans le code renvoie différentes réponses JSON en fonction des
 * conditions :
 * 
 * Generated on 02/29/2024 Gwilymm
 */
// fichier : pages/api/user-answer-verification.js
import React, { useEffect, useRef, useState } from 'react';
import prisma from "@/utils/prisma";



export default async function handler(req, res) {
	if (req.method === 'POST') {
		// Extraction de `enigmaId` et `userAnswer` du corps de la requête, pas des query params
		const { enigmaId, userAnswer, userEmail } = req.body;

		try {
			const user = await prisma.user.findUnique({
				where: {
					email: userEmail,
				},
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
		res.setHeader('Allow', [ 'POST' ]);
		res.status(405).end(`Method ${req.method} Not Allowed`);
	}
}