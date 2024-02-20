// pages/api/createUser.js

import bcrypt from 'bcrypt';
import prisma from '@/utils/prisma';

export default async function handler(req, res) {
	if (req.method === 'POST') {
		const { username, email, password } = req.body;

		// Hash the password
		const hashedPassword = await bcrypt.hash(password, 10);

		try {
			// Create a new user in the database with the hashed password
			const newUser = await prisma.user.create({
				data: {
					username,
					email,
					password: hashedPassword, // Store the hashed password in the database
				},
			});

			res.status(201).json(newUser);
		} catch (error) {
			console.error('Error creating user:', error);
			res.status(500).json({ error: 'An error occurred while creating the user' });
		}
	} else {
		res.status(405).json({ error: 'Method not allowed' });
	}
}
