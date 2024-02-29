/**
 * Cette fonction JavaScript gère les requêtes POST pour créer une nouvelle énigme dans une base de
 * données à l'aide de Prisma ORM.
 * @param   $req - Le paramètre `req` dans votre code représente l'objet de requête, qui contient des
 * informations sur la requête HTTP reçue par le serveur. Cet objet comprend des détails tels que la
 * méthode de requête (GET, POST, PUT, DELETE, etc.), les en-têtes de requête, le corps de la requête
 * (pour les requêtes POST), les paramètres d'URL, les paramètres de requête.
 * @param   $res - Le paramètre `res` dans votre code représente l'objet de réponse HTTP qui sera
 * renvoyé au client effectuant la demande. Il vous permet de définir des en-têtes, des codes d'état et
 * de renvoyer des données au client.
 * @returns Le code renvoie une réponse JSON avec l'objet Enigma nouvellement créé si la méthode HTTP
 * est POST et que l'énigme est créée avec succès. S'il y a une erreur lors de la création, il renvoie
 * une réponse JSON avec un message d'erreur. Si la méthode HTTP n'est pas POST, elle définit l'en-tête
 * Allow pour autoriser uniquement la méthode POST et renvoie un code d'état 405 avec un message
 * indiquant que la méthode n'est pas POST.
 * 
 * Generated on 02/29/2024 Gwilymm
 */
import prisma from '@/utils/prisma';

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
