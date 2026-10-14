export const authMiddleware = (socket, next) => {
  const token = socket.handshake.auth.token || socket.handshake.query.token;

  // TODO: Implement from protect function

  if (!token) {
    return next(new Error("You are not logged in"));
  }

  next();
};