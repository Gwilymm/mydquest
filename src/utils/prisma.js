import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
	return new PrismaClient();
};

// Declare a global variable to hold the Prisma client instance
global.prisma = undefined;

const prisma = global.prisma ?? prismaClientSingleton();

export default prisma;

// If not in production, assign the Prisma client instance to the global variable
if (process.env.NODE_ENV !== 'production') {
	global.prisma = prisma;
}