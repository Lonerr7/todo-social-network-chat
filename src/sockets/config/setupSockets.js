import {authMiddleware} from '../middlewares/authMiddleware';
import {HandlersList} from './HandlersList';

export const setupSockets = (io) => {
  // middlewares
  io.use(authMiddleware);

  io.on('connection', (socket) => {
    console.log(`socket connected. id: ${socket.id}`);

    // handlers
    HandlersList.forEach((handler) => handler(io, socket));

    socket.on("disconnect", () => {
      console.log(`socket ${socket.id} disconnected`);
    });
  });
};