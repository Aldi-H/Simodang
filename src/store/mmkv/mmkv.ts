import { MMKV } from 'react-native-mmkv';
import { StateStorage } from 'zustand/middleware';

export const storage = new MMKV();

export const zustandStorage: StateStorage = {
  setItem: (token, value) => {
    console.log(token, value);

    return storage.set(token, value);
  },
  getItem: token => {
    const value = storage.getString(token);
    return value ?? null;
  },
  removeItem: token => {
    console.log(token);

    return storage.delete(token);
  },
};
