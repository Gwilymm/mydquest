/* Cet extrait de code configure l'authentification à l'aide de NextAuth dans une application Next.js.
Voici un aperçu de ce que fait chaque partie : */
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/utils/prisma"

export default async function auth(req, res) {
	return await NextAuth(req, res, {


		adapter: PrismaAdapter(prisma),
		providers: [
			GoogleProvider({
				clientId: process.env.GOOGLE_CLIENT_ID,
				clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			}),
		],
		session: {
			// Set to jwt in order to CredentialsProvider works properly
			strategy: 'jwt'
		},
		// Additional NextAuth configuration
		secret: process.env.NEXTAUTH_SECRET,
		database: process.env.DATABASE_URL
	});
}



