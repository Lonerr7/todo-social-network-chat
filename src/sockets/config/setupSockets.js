import {authMiddleware} from '../middlewares/authMiddleware';

export const setupSockets = (io) => {
  // middlewares
  io.use(authMiddleware);

  io.on('connection', (socket) => {
    console.log(`socket connected. id: ${socket.id}`);

    socket.on("disconnect", (reason) => {
      console.log(`socket ${socket.id} disconnected`);
    });
  });
};