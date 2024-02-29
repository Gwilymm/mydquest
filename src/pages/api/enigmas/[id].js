/**
 * Handles the request to retrieve an enigma by its ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the enigma is retrieved and sent as a response.
 */
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
