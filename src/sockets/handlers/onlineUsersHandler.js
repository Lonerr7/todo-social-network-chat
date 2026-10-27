import {broadcastOnlineUsers} from '../utils/broadcastOnlineUsers';
import {redisClient} from '../../config/redis';

export const onlineUsersHandler = (io, socket) => {
  socket.on('getOnlineUsers', async (userId) => {
    console.log(userId);
    await redisClient.expire(`presence:${userId}`, 30);

    await broadcastOnlineUsers(io);
  });
};