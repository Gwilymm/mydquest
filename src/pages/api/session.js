// pages/api/session.js
import { getServerSession } from "next-auth/next";


export default async function session(req, res) {
	const session = await getServerSession(req, res);
	res.send({ session });
}
