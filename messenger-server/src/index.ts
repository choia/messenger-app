import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import { Message } from './types';

const SERVER_PORT = 3011;
const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

io.on('connection', (socket: Socket) => {
  console.log(`Session connected: ${socket.id}`);

  socket.on('join_room', (room: string) => {
    console.log(`Session ID ${socket.id} has joined the room: ${room}`);
    socket.join(room);
  });

  socket.on('send_message', (message: Message) => {
    // when we send message, message to also broadcast out to other users that are connected to the same room
    console.log(message);
    socket.to(message.room).emit('receive_message', message);
  });

  socket.on('disconnect', () => {
    console.log('Session disconnected', socket.id);
  });
});

httpServer.listen(SERVER_PORT, () => {
  console.log(`SERVER RUNNING ON ${SERVER_PORT}`);
});
