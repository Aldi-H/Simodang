import { BASE_URL } from '@env';
import axios from 'axios';
import { create } from 'zustand';
import auth from '@react-native-firebase/auth';

import useAuthStore from '../auth/AuthStore';

enum notificationEnabled {
  false = 0,
  true = 1,
}

type DeviceStoreState = {
  notificationEnabled: notificationEnabled;
  dropdownData: { value: string; label: string }[];
  deviceId: string;
  // filteredDeviceId: string;
  filteredDeviceId: { value: string; label: string }[];
  dropdownIdDevicesValue: string | undefined;
  scan: boolean;
  scanResult: boolean;
  devicesCount: number;
  availableDevices: number;
  // tempLow: number;
  // tempHigh: number;
  // phLow: number;
  // phHigh: number;
  // tdoLow: number;
  // tdoHigh: number;
  // tdsLow: number;
  // tdsHigh: number;
  // turbiditiesLow: number;
  // turbiditiesHigh: number;
};

type DeviceStoreAction = {
  getAllDevices: () => Promise<void>;
  filterIdDeviceId: () => void;
  setQrCode: (value: string) => void;
  resetQrCode: () => void;
};

const useDeviceStore = create<DeviceStoreState & DeviceStoreAction>()(
  (set, get) => ({
    notificationEnabled: notificationEnabled.true,
    dropdownData: [],
    dropdownIdDevicesValue: '',
    deviceId: '',
    filteredDeviceId: [],
    scan: false,
    scanResult: false,
    devicesCount: 0,
    availableDevices: 0,
    // tempLow: 26,
    // tempHigh: 30,
    // phLow: 6.5,
    // phHigh: 8,
    // tdoLow: 4,
    // tdoHigh: 6,
    // tdsLow: 300,
    // tdsHigh: 600,
    // turbiditiesLow: 8.6,
    // turbiditiesHigh: 17.3,

    getAllDevices: async () => {
      try {
        const token = await auth().currentUser?.getIdToken();
        const response = await axios.get(`${BASE_URL}/devices/v2`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const deviceData = response.data.filter((e: any) => e.pond === null).map(
          (valueItem: { id: string; name: string }) => {
            return {
              value: valueItem.id,
              label: valueItem.name,
            };
          },
        );

        set({
          dropdownData: deviceData,
          devicesCount: response?.data?.length || 0,
          availableDevices: response?.data?.filter((e: any) => e.pond === null)?.length || 0,
        });
      } catch (error) {
        console.log(error);
      }
    },

    filterIdDeviceId: () => {
      const filtered = get().dropdownData.filter(item =>
        item.value.toUpperCase().includes(get().deviceId.toUpperCase()),
      );
      console.log('filtered', filtered);
      console.log('deviceId', get().deviceId);

      set({ filteredDeviceId: filtered });
    },

    setQrCode: value => {
      set({ deviceId: value });
    },

    resetQrCode: () => {
      set({ deviceId: '' });
    },
  }),
);

export default useDeviceStore;
