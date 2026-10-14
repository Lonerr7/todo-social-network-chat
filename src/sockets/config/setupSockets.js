import {authMiddleware} from '../middlewares/authMiddleware';

export const setupSockets = (io) => {
  // middlewares
  io.use(authMiddleware);

  io.on('connection', (socket) => {
    console.log('socket connected');
  });
};