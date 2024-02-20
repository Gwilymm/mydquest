import prisma from '@/utils/prisma';

export default async function handle(req, res) {
	const { id } = req.query;

	try {
		const enigma = await prisma.enigma.findUnique({
			where: { id: parseInt(id, 10) },
		});

		if (enigma) {
			res.json(enigma);
		} else {
			res.status(404).json({ message: 'Enigma not found' });
		}
	} catch (error) {
		console.error('Request error', error);
		res.status(500).json({ error: 'Error fetching enigma' });
	}
}
