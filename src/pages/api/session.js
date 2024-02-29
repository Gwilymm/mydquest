// pages/api/session.js
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

export default async function session(req, res) {
	const session = await getServerSession(req, res, authOptions);
	res.send({ session });
}
