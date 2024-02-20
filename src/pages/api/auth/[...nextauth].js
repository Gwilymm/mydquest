import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { createUser } from "../createUser"
export const authOptions = {
	// Configure one or more authentication providers
	providers: [

		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
	],
	secret: process.env.NEXTAUTH_SECRET,
	callbacks: {

	},
}
export default NextAuth(authOptions)

