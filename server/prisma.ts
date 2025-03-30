import { PrismaClient } from '@prisma/client';

// Create a global instance of Prisma to prevent too many connections in development
declare global {
  var prisma: PrismaClient | undefined;
}

// This approach ensures we don't create a new connection for every request
export const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}