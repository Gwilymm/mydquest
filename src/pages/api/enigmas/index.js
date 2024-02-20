import prisma from '@/utils/prisma';

export default async function handle(req, res) {
	if (req.method === 'GET') {
		try {
			const enigmas = await prisma.enigma.findMany();
			res.status(200).json(enigmas);
		} catch (error) {
			console.error('Failed to retrieve enigmas:', error);
			res.status(500).json({ message: 'Failed to retrieve enigmas' });
		}
	} else {
		res.setHeader('Allow', [ 'GET' ]);
		res.status(405).end(`Method ${req.method} Not Allowed`);
	}
}
