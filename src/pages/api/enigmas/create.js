// pages/api/enigmas/create.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handle(req, res) {
	if (req.method === 'POST') {
		const { title, description, hints, solution, qrCode } = req.body;
		try {
			const newEnigma = await prisma.enigma.create({
				data: {
					title,
					description,
					hints,
					solution,
					qrCode,
				},
			});
			console.log('Created new enigma:', newEnigma);
			return res.status(200).json(newEnigma);
		} catch (error) {
			console.error("Error creating enigma:", error);
			return res.status(500).json({ error: "Error creating enigma" });
		}
	} else {
		// Handle any other HTTP methods
		res.setHeader('Allow', [ 'POST' ]);
		res.status(405).end(`Method ${req.method} Not Allowed`);
	}
}
