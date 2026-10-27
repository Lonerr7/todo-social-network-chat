import {authMiddleware} from '../middlewares/authMiddleware';
import {joinChatHandler} from '../handlers/joinChatHandler';
import {onlineUsersHandler} from '../handlers/onlineUsersHandler';

export const setupSockets = (io) => {
  // middlewares
  io.use(authMiddleware);

  io.on('connection', (socket) => {
    console.log(`socket connected. id: ${socket.id}`);

    // handlers
    joinChatHandler(io, socket);
    onlineUsersHandler(io, socket);

    socket.on("disconnect", (reason) => {
      console.log(`socket ${socket.id} disconnected`);
    });
  });
};