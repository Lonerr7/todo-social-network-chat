import {redisClient} from '../../config/redis';

export const broadcastOnlineUsers = async (io) => {
  const ids = await redisClient.sMembers('online_users');
  const usersKeys = ids.map((id) => `presence:${id}`);
  if (!usersKeys || !usersKeys.length) return;
  const raw = await redisClient.mGet(usersKeys);

  const onlineUsers = [];
  const offlineUsers = [];

  raw.forEach((user, i) => {
    if (user) {
      onlineUsers.push(JSON.parse(user));
    } else {
      offlineUsers.push(ids[i]);
    }
  });

  if (offlineUsers.length) {
    await redisClient.sRem('online_users', offlineUsers);
  }

  console.log(onlineUsers);

  io.emit('onlineUsers', onlineUsers);
};
