
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
