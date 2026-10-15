import dotenv from 'dotenv';
import {app} from './app';
import http from 'http';
import {Server} from 'socket.io';
import {getCurrentMode, MODES_ENUM} from './src/lib/getCurrentMode/getCurrentMode';
import {setupSockets} from './src/sockets';
import {connectToDB} from './src/lib/db/connectToDB';

// using ENV
dotenv.config({path: './config.env'});

if (getCurrentMode() === MODES_ENUM.DEVELOPMENT) {
  dotenv.config({path: './.env.local', override: true});
}

// connect to DB
connectToDB();

// socket.io
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:3000'],
  },
});

setupSockets(io);

// start server
const PORT = !isNaN(+`${process.env.PORT}`) ? +`${process.env.PORT}` : 5001;
server.listen(PORT, undefined, undefined, () => {
  console.log(`listening on port ${PORT}`);
});
