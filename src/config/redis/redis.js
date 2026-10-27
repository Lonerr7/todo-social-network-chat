import {createClient} from 'redis';

const connectRedis = async () => {
  return createClient({
    url: process.env.REDIS_URL,
  })
    .on('connect', () => console.log('Redis connected'))
    .on('error', (err) => console.error('Redis Client Error', err))
    .connect();
};

const redisClient = await connectRedis();

export {redisClient};
