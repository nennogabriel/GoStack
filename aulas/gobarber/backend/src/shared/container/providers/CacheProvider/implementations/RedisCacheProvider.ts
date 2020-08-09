import Redis, { Redis as RedisClient } from 'ioredis';
import cacheConfig from '@config/cacheConfig';
import ICacheProvider from '../models/iCacheProvider';

export default class RedisCacheProvider implements ICacheProvider {
  private client: RedisClient;

  constructor() {
    this.client = new Redis(cacheConfig.config.redis);
  }

  public async save(key: string, value: string): Promise<void> {
    await this.client.set(key, value);
  }

  public async recover(key: string): Promise<string | undefined> { }

  public async invalidate(key: string): Promise<void> { }
}
