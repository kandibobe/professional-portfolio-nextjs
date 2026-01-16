import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';

declare global {
  // allow global `var` declarations

  var prisma: ReturnType<typeof createPrismaClient> | undefined;
}

const createPrismaClient = () => {
  if (!process.env.DATABASE_URL || process.env.DATABASE_URL === "postgresql://user:password@localhost:5432/db") {
     // Return a mock or handle the case where DB is not available during build
     return {} as any;
  }

  const client = new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

  if (process.env.DATABASE_URL?.includes('prisma://')) {
    return client.$extends(withAccelerate());
  }

  return client;
};

export const prisma = global.prisma || createPrismaClient();

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;
