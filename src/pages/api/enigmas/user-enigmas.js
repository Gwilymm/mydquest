/**
 * Cette fonction récupère les énigmes associées à un utilisateur en fonction de ses informations de
 * session et renvoie un tableau simplifié de données d'énigme.
 * @param   $req - Le paramètre `req` dans votre code représente l'objet de requête. Il contient des
 * informations sur la requête HTTP adressée au serveur, telles que la méthode de requête (GET, POST,
 * etc.), les en-têtes de requête, le corps de la requête, les paramètres d'URL, les paramètres de
 * requête, etc.
 * @param   $res - Le paramètre `res` dans votre code représente l'objet de réponse HTTP qui sera
 * renvoyé au client effectuant la demande. Il est utilisé pour renvoyer la réponse au client avec le
 * code d'état et les données appropriés.
 * @returns L'extrait de code fourni est une route API Next.js qui gère les requêtes GET pour récupérer
 * les énigmes associées à un utilisateur. Si la méthode de requête est GET, le code vérifie d'abord la
 * session utilisateur à l'aide de « getSession » de next-auth/react. S'il existe une session valide
 * avec des informations utilisateur, il interroge ensuite la base de données à l'aide de Prisma pour
 * trouver l'utilisateur et ses énigmes associées.
 * 
 * Generated on 02/29/2024 Gwilymm
 */

// Import getSession from next-auth/react
import { getSession } from "next-auth/react";
import prisma from "@/utils/prisma";

export default async function handler(req, res) {
    if (req.method === 'GET') {
        // Get the session
        const session = await getSession({ req });

        // If there is no session or the session does not have user information, return an error
        if (!session || !session.user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        try {
            // Use the email from the session to find the user
            const user = await prisma.user.findUnique({
                where: {
                    email: session.user.email,
                },
            });

            // If no user is found, return an error
            if (!user) {
                return res.status(404).json({ error: 'User not found.' });
            }

            // Fetch all enigmas associated with the userId
            const userEnigmas = await prisma.userEnigmas.findMany({
                where: {
                    userId: user.id,
                },
                include: {
                    enigma: true, // Ensure you include the related enigma data
                },
            });

            // Map through the results to return a simplified array
            const enigmas = userEnigmas.map(userEnigma => ({
                id: userEnigma.enigma.id,
                title: userEnigma.enigma.title,
                description: userEnigma.enigma.description,
                hints: userEnigma.enigma.hints,
                solution: userEnigma.enigma.solution,
                qrCode: userEnigma.enigma.qrCode,
                createdAt: userEnigma.enigma.createdAt,
                isSolved: userEnigma.isSolved,
                // Include any other fields you need
            }));

            return res.status(200).json(enigmas);
        } catch (error) {
            console.error('Error fetching user enigmas:', error);
            return res.status(500).json({ error: 'Failed to fetch enigmas for the user.' });
        }
    } else {
        // Handle any other HTTP method
        res.setHeader('Allow', [ 'GET' ]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
