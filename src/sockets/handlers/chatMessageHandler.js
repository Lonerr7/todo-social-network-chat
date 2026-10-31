import {ChatMessage} from '../../models';

export const chatMessageHandler = (io, socket) => {
  socket.on('chatMessage', async ({userId, text}) => {
    const newMessage = await ChatMessage.create({user: userId, text});
    console.log(newMessage);
  });
};
