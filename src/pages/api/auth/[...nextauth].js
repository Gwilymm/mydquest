import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from '@/utils/prisma'// Adjust the import path to your Prisma client instance

export default NextAuth({
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
		// other providers...
	],
	adapter: PrismaAdapter(prisma),

	callbacks: {
		async signIn(user, account, profile) {

			// Allow sign-in to proceed
			return true;
		},
	},

	// Additional NextAuth configuration
	secret: process.env.NEXTAUTH_SECRET,
	database: process.env.DATABASE_URL
});

