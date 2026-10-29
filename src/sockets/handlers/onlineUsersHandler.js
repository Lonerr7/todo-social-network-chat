import {manageOnlineUsers} from '../utils/manageOnlineUsers';
import {redisClient} from '../../config/redis';

export const onlineUsersHandler = (io, socket) => {
  socket.on('getOnlineUsers', async (userId) => {
    await redisClient.expire(`presence:${userId}`, 30);

    await manageOnlineUsers(io);
  });
};