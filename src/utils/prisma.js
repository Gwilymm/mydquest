import { PrismaClient } from '@prisma/client';

// Function to create a new instance of PrismaClient
const createPrismaClientSingleton = () => new PrismaClient();

if (!global.prisma) {
	global.prisma = createPrismaClientSingleton();
}

const prisma = global.prisma;

export default prisma;
