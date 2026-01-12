import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

const connectionString = process.env.DATABASE_URL;

let prismaClient: PrismaClient;

if (!connectionString) {
  if (process.env.NODE_ENV === 'production') {
    console.warn('DATABASE_URL not set, Prisma client will fail on queries');
  }
  // Mock prisma client that rejects all queries
  prismaClient = new Proxy({} as PrismaClient, {
    get: (_target, _prop) => {
      // Return a proxy for models (e.g. prisma.project)
      return new Proxy(
        {},
        {
          get: (_t, _p) => {
            // Return a function for methods (e.g. prisma.project.findMany)
            return () => Promise.reject(new Error('Database not configured'));
          },
        }
      );
    },
  });
} else {
  const pool = new Pool({
    connectionString,
    ssl:
      process.env.NODE_ENV === 'production' && !connectionString.includes('localhost')
        ? { rejectUnauthorized: false }
        : false,
  });
  const adapter = new PrismaPg(pool);
  prismaClient = new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });
}

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma = global.prisma || prismaClient;

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;
