import { create } from 'zustand';
import messaging from '@react-native-firebase/messaging';
// import { io, Socket } from 'socket.io-client';
// import { SOCKET_URL } from '@env';

// import usePondStore from '../pond/PondStore';

type SocketState = {
  temperature: number;
  pH: number;
  tdo: number;
  tds: number;
  turbidity: number;
};

type SocketAction = {
  message: (pondId: string) => void;
};

const useSocketStore = create<SocketState & SocketAction>(set => ({
  temperature: 0,
  pH: 0,
  tdo: 0,
  tds: 0,
  turbidity: 0,

  message: (pondId: string) => {
    messaging().onMessage(async remoteMessage => {
      const topic = remoteMessage.from?.split('/').pop();
      if (topic?.split('-').pop() === 'realtime') {
        topic.split('-')[0] === pondId &&
          set({
            temperature: remoteMessage.data
              ? Number(remoteMessage.data.temperature)
              : 0,
          });
      }
    });
  },
}));

export default useSocketStore;
