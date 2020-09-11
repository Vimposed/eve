import Redis from 'ioredis';
import { redis } from '../config';

let client: Redis | null = null;

export const connectRedis = () => {
  client = new Redis({
    host: redis.host,
    port: 6379,
  });
}

export const getRedisClient = (): Redis => {
  if(client) return client;
  throw new Error('There\'s no redis client connected.');
}
