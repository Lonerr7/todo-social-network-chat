import {User} from '../../models';
import {emitSocketError} from './emitSocketError';
import {createSocketError} from './createSocketError';
import {redisClient} from '../../config/redis';

export const setOnlineUser = async (socket, userId) => {
  const userFromDB = await User.findById(userId);
  if (!userFromDB) {
    return emitSocketError(socket, createSocketError('User was not found'));
  }

  const payload = JSON.stringify({
    id: userId,
    nickname: userFromDB.nickname,
    photo: userFromDB.photo,
  });

  try {
    await Promise.all([
      redisClient.set(`presence:${userId}`, payload, {EX: 30}),
      redisClient.sAdd('online_users', userId),
    ]);
  } catch (err) {
    console.log(err);
  }
}