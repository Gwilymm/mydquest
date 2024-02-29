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
			const userEnigma = await prisma.userEnigmas.create({
				data: {
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
