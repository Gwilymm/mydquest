/**
 * La fonction `session` récupère la session du serveur à l'aide de NextAuth et l'envoie en réponse.
 * @param   $req - Le paramètre `req` dans la fonction `session` représente l'objet de requête HTTP
 * entrant. Il contient des informations sur la demande effectuée par le client, telles que des
 * en-têtes, des paramètres et des données de corps. Cet objet est généralement utilisé pour extraire
 * les données envoyées par le client au serveur.
 * @param   $res - Le paramètre « res » dans l'extrait de code fait référence à l'objet de réponse
 * dans Node.js. Il est utilisé pour renvoyer une réponse au client qui fait la demande. Dans ce cas,
 * l'instruction `res.send({ session })` renvoie les données de session au client dans la réponse.
 * 
 * Generated on 02/29/2024 Gwilymm
 */
// pages/api/session.js
import { getServerSession } from "next-auth/next";


export default async function session(req, res) {
	const session = await getServerSession(req, res);
	res.send({ session });
}
