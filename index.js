import './src/config/env/env';
import {app} from './app';
import http from 'http';
import {Server} from 'socket.io';
import {setupSockets, setupPresenceExpiration} from './src/sockets';
import {connectToDB} from './src/config/db';

const main = async () => {
  // DB
  await connectToDB();

  // Sockets
  const server = http.createServer(app);
  const io = new Server(server, {
    cors: {
      origin: ['http://localhost:3000'],
    },
  });

  await setupPresenceExpiration(io);
  setupSockets(io);

  // Start server
  const PORT = !isNaN(+`${process.env.PORT}`) ? +`${process.env.PORT}` : 5001;
  server.listen(PORT, undefined, undefined, () => {
    console.log(`listening on port ${PORT}`);
  });
};


main().catch((err) => {
  console.error('Fatal startup error:', err);
  process.exit(1);
});