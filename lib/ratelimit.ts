import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

let ratelimitInstance: Ratelimit;

if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  ratelimitInstance = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(5, '1 h'),
    analytics: true,
    prefix: '@upstash/ratelimit',
  });
} else {
  console.warn('Redis credentials not found, rate limiting disabled');
  // Mock ratelimiter that always allows
  ratelimitInstance = {
    limit: async () => ({ success: true, limit: 100, remaining: 100, reset: 0 }),
    blockUntilReady: async () => {},
  } as unknown as Ratelimit;
}

export const ratelimit = ratelimitInstance;
