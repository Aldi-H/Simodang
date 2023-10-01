import { create } from 'zustand';
import { io, Socket } from 'socket.io-client';
import { SOCKET_URL } from '@env';

import usePondStore from '../pond/PondStore';

type SocketState = {
  temperature: number;
  pH: number;
  tdo: number;
  tds: number;
  turbidity: number;
};

type SocketAction = {
  connect: () => void;
  disconnect: () => void;
};

const useSocketStore = create<SocketState & SocketAction>(set => {
  let socket: Socket;

  const connect = () => {
    const pondId = usePondStore.getState().pondDetail.pondId;
    socket = io(SOCKET_URL);
    console.log(pondId);

    socket.on('connect', () => {
      console.log('Connected');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected');
    });

    socket.on(pondId, value => {
      const { temperature, ph, tdo, tds, turbidity } = value;

      set({
        temperature: temperature,
        pH: ph,
        tdo: tdo,
        tds: tds,
        turbidity: turbidity,
      });
    });
  };

  const disconnect = () => {
    socket.off('connect');
    socket.off('disconnect');
    socket.off(usePondStore.getState().pondDetail.pondId);
    socket.disconnect();
  };

  return {
    temperature: 0,
    pH: 0,
    tdo: 0,
    tds: 0,
    turbidity: 0,
    connect,
    disconnect,
  };
});

export default useSocketStore;
