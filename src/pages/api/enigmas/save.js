import prisma from '@/utils/prisma';

export default async function handle(req, res) {
	//update enigma
	if (req.method === 'PUT') {
		const { id, title, description, hints, solution, qrCode } = req.body;
		try {
			const updatedEnigma = await prisma.enigma.update({
				where: { id: parseInt(id, 10) },
				data: {
					title,
					description,
					hints,
					solution,
					qrCode,
				},
			});
			console.log('Updated enigma:', updatedEnigma);
			return res.status(200).json(updatedEnigma);
		} catch (error) {
			console.error('Error updating enigma:', error);
			return res.status(500).json({ error: 'Error updating enigma' });
		}
	} else {
		// Handle any other HTTP methods
		res.setHeader('Allow', [ 'PUT' ]);
		res.status(405).end(`Method ${req.method} Not Allowed`);
	}
}