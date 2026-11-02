import {createClient} from 'redis';
import {redisClient} from '../../config/redis';
import {manageOnlineUsers} from '../utils/manageOnlineUsers';

let subscriber;

export const setupPresenceExpiration = async (io) => {
  subscriber = createClient({url: process.env.REDIS_URL})
    .on('connect', () => console.log('Redis subscriber connected'))
    .on('error', (err) => console.error('Redis subscriber error', err));

  await subscriber.connect();

  // Notifications
  await redisClient.configSet('notify-keyspace-events', 'Ex');

  await subscriber.subscribe('__keyevent@0__:expired', async (key) => {
    if (!key.startsWith('presence:')) return;

    try {
      await manageOnlineUsers(io);
    } catch (err) {
      console.error(err);
    }
  });
};
