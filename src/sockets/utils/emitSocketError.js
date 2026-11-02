export const emitSocketError = (emitter, payload) => {
  emitter.emit('appError', payload);
};
