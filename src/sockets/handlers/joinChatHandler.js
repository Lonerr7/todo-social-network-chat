import {User} from '../../models';
import {redisClient} from '../../config/redis';
import {manageOnlineUsers} from '../utils/manageOnlineUsers';
import {ChatMessage} from '../../models';

export const joinChatHandler = (io, socket) => {
  socket.on('joinChat', async ({userId}) => {
    // Loading user and checking online status
    const userFromDB = await User.findById(userId);
    if (!userFromDB) return;

    const payload = JSON.stringify({
      id: userId,
      nickname: userFromDB.nickname,
      photo: userFromDB.photo,
    });

    await Promise.all([
      redisClient.set(`presence:${userId}`, payload, {EX: 30}),
      redisClient.sAdd('online_users', userId),
    ]);

    await manageOnlineUsers(io);

    // Sending chat messages to connected user
    const chatMessages = await ChatMessage.find().populate({
      path: 'user',
      select: 'nickname photo',
    });
    socket.emit('getChatMessages', chatMessages);
  });
};
