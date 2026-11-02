export const createSocketError = (message) => ({
  type: 'Error',
  message: message ? message : 'Something went wrong. Try again later',
});
