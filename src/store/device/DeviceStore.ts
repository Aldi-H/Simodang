import { BASE_URL } from '@env';
import axios from 'axios';
import { create } from 'zustand';

import useAuthStore from '../auth/AuthStore';

enum notificationEnabled {
  false = 0,
  true = 1,
}

type DeviceStoreState = {
  notificationEnabled: notificationEnabled;
  dropdownData: { value: string; label: string }[];
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
};

const useDeviceStore = create<DeviceStoreState & DeviceStoreAction>()(set => ({
  notificationEnabled: notificationEnabled.true,
  dropdownData: [],
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
      const response = await axios.get(`${BASE_URL}/devices`, {
        headers: {
          Authorization: useAuthStore.getState().userDetail.token,
        },
      });

      const deviceData = response.data.map(
        (valueItem: { id: string; name: string }) => {
          return {
            value: valueItem.id,
            label: valueItem.name,
          };
        },
      );

      console.log(deviceData);
      set({ dropdownData: deviceData });
    } catch (error) {
      console.log(error);
    }
  },
}));

export default useDeviceStore;
