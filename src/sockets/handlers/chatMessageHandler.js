import {ChatMessage} from '../../models';
import {createSocketError} from '../utils/createSocketError';
import {emitSocketError} from '../utils/emitSocketError';

export const chatMessageHandler = (io, socket) => {
  socket.on('chatMessage', async ({userId, text}) => {
    try {
      let newMessage = await ChatMessage.create({user: userId, text});
      newMessage = await newMessage.populate('user');

      io.emit('message', newMessage);
    } catch (err) {
      console.error(err);
      emitSocketError(socket, createSocketError());
    }
  });

  socket.on('deleteMessage', async ({userId, messageId}) => {
    try {
      const deletedMessage = await ChatMessage.findOneAndDelete({
        user: userId,
        _id: messageId,
      });

      if (!deletedMessage) {
        emitSocketError(socket, createSocketError('The message does not exist!'));
      }

      const messages = await ChatMessage.find().populate('user');
      io.emit('getChatMessages', messages);
    } catch (err) {
      console.error(err);
      emitSocketError(socket, createSocketError());
    }
  });
};
