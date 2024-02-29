import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/utils/prisma"



export default NextAuth({
	events: {
		signIn: async (message) => {
			console.log('SIGN IN', message);
		},
		signOut: async (message) => {
			console.log('SIGN OUT', message);
		},
		error: async (message) => {
			console.error('An error occurred:', message);
		},
	},
	debug: process.env.NODE_ENV === 'development',
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

