import {manageOnlineUsers} from '../utils/manageOnlineUsers';
import {ChatMessage} from '../../models';
import {emitSocketError} from '../utils/emitSocketError';
import {createSocketError} from '../utils/createSocketError';
import {setOnlineUser} from '../utils/setOnlineUser';

export const joinChatHandler = (io, socket) => {
  socket.on('joinChat', async ({userId}) => {
    try {
      // Loading user and checking online status
      await setOnlineUser(socket, userId);
      await manageOnlineUsers(io, socket);

      // Sending chat messages to connected user
      const chatMessages = await ChatMessage.find().populate({
        path: 'user',
        select: 'nickname photo',
      });
      socket.emit('getChatMessages', chatMessages);
    } catch (err) {
      console.error(err);
      emitSocketError(socket, createSocketError());
    }
  });
};
