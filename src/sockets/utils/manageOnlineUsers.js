import {redisClient} from '../../config/redis';
import {setOnlineUser} from './setOnlineUser';

export const manageOnlineUsers = async (io, socket) => {
  const ids = await redisClient.sMembers('online_users');
  const usersKeys = ids.map((id) => `presence:${id}`);
  if (!usersKeys || !usersKeys.length) return;
  const raw = await redisClient.mGet(usersKeys);

  const onlineUsers = [];
  const usersToResetOnlineStatus = [];
  const offlineUsers = [];

  raw.forEach((user, i) => {
    if (user) {
      onlineUsers.push(JSON.parse(user));
    } else if (socket.userId === ids[i]) {
      usersToResetOnlineStatus.push(socket.userId);
    } else {
      offlineUsers.push(ids[i]);
    }
  });

  if (usersToResetOnlineStatus.length > 0) {
    for (const userId of usersToResetOnlineStatus) {
      await setOnlineUser(socket, userId);
    }
  }

  if (offlineUsers.length) {
    await redisClient.sRem('online_users', offlineUsers);
  }

  io.emit('onlineUsers', onlineUsers);
};
