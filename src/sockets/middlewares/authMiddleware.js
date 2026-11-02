import jwt from 'jsonwebtoken';
import {User} from '../../models';

export const authMiddleware = async (socket, next) => {
  const token = socket.handshake.auth.token || socket.handshake.query.token;

  // 1. If no token: throw error
  if (!token) {
    return next(new Error('You are not logged in'));
  }

  // 2. Validate the token (Verification)
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    console.error(err);

    return next(new Error('Token is invalid, please log in again'));
  }

  // 3. Check if user still exists in DB
  const currentUser = await User.findById(decoded.id);

  if (!currentUser) {
    return next(new Error('User does not exist'));
  }

  // 4) Check if user changed passwords after JWT was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(new Error('User recently changed password! Please log in again'));
  }

  socket.userId = decoded.id;

  next();
};
