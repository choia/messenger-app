import { createContext } from 'react';
import { Socket } from 'socket.io-client';

type SocketType = {
  socket?: Socket;
};

export const SocketContext = createContext<SocketType>({});
