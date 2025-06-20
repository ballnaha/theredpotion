// Database exports
export { PrismaClient } from '@prisma/client';
export * from '@prisma/client';

// Database client instance
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db = globalForPrisma.prisma ?? new PrismaClient({
  log: ['query', 'error', 'warn'],
});

// Export prisma as well for convenience
export const prisma = db;

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db;

// Helper functions
export const connectDatabase = async () => {
  try {
    await db.$connect();
    console.log('✅ Database connected successfully');
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    process.exit(1);
  }
};

export const disconnectDatabase = async () => {
  await db.$disconnect();
  console.log('📂 Database disconnected');
}; 