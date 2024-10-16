import { BASE_URL } from '@env';
import axios from 'axios';
import { create } from 'zustand';
import auth from '@react-native-firebase/auth';

import useAuthStore from '../auth/AuthStore';
// import useDeviceStore from '../device/DeviceStore';
import useFirebaseStore from '../firebase/FirebaseStore';

// import { produce } from 'immer';

// enum PondStatus {
//   bad = 0,
//   good = 1,
// }

// enum isFilled {
//   false = 0,
//   true = 1,
// }

// enum NotificationStatus {
//   false = 0,
//   true = 1,
// }

// enum isSaved {
//   false = 0,
//   true = 1,
// }

type PondsData = {
  pondId: string;
  pondName: string;
  pondAddress: string;
  city: string;
  status: boolean;
  deviceId: string;
  isFilled: boolean;
  imageUrl: string;
  isEnabled: boolean;
};

type UpdatePondData = {
  name: string;
  address: string;
  city: string;
  deviceId: string | null;
  imageUrl: string | null;
  isFilled: boolean;
  seedDate: string;
  seedCount: number;
};

type PondDetail = {
  pondId: string;
  pondName: string;
  address: string;
  city: string;
  seedDate: string;
  seedCount: number;
  imageUrl: string;
  status: boolean;
  isFilled: boolean;
  deviceId: string | null;
  device: {
    deviceId: string | null;
    DeviceName: string;
    isSaved: boolean;
    autoFeedEnabled: boolean;
    autoWaterEnabled: boolean;
    tempLow: number;
    tempHigh: number;
    phLow: number;
    phHigh: number;
    tdoLow: number;
    tdoHigh: number;
    tdsLow: number;
    tdsHigh: number;
    turbiditiesLow: number;
    turbiditiesHigh: number;
  };
};

type InputData = {
  pondName: string;
  pondAddress: string;
  city: string;
  deviceId: string;
  isFilled: boolean;
  imageUrl: string;
};

type PondStoreState = {
  pondsData: PondsData[];
  totalPonds: number;
  totalSeedCount: number;
  totalPondStatus: number;
  pondDetail: PondDetail;
  updatePondData: UpdatePondData;
  inputData: InputData;
};

type PondStoreAction = {
  getAllPonds: () => Promise<void>;
  getOnePond: (pondId: string) => Promise<void>;
  updateOnePond: (data: UpdatePondData) => Promise<void>;
  addPond: () => Promise<void>;
  handleChangeForm: (data: Partial<InputData>) => void;
  updateDeviceData: (thresholdData: PondDetail) => Promise<void>;
};

const usePondStore = create<PondStoreState & PondStoreAction>()((set, get) => ({
  pondsData: [],
  inputData: {
    pondName: '',
    pondAddress: '',
    city: '',
    deviceId: '',
    isFilled: true,
    imageUrl: '',
  },
  pondDetail: {
    pondId: '',
    pondName: '',
    address: '',
    city: '',
    seedDate: '',
    seedCount: 0,
    imageUrl: '',
    status: true,
    isFilled: true,
    deviceId: null,
    device: {
      deviceId: null,
      DeviceName: '',
      isSaved: false,
      autoWaterEnabled: false,
      autoFeedEnabled: false,
      tempLow: 0,
      tempHigh: 0,
      phLow: 0,
      phHigh: 0,
      tdoLow: 0,
      tdoHigh: 0,
      tdsLow: 0,
      tdsHigh: 0,
      turbiditiesLow: 0,
      turbiditiesHigh: 0,
    },
  },
  updatePondData: {
    name: '',
    address: '',
    city: '',
    deviceId: '',
    imageUrl: null,
    isFilled: true,
    seedDate: '',
    seedCount: 0,
  },
  totalPonds: 0,
  totalSeedCount: 0,
  totalPondStatus: 0,

  getAllPonds: async () => {
    try {
      const token = await auth().currentUser?.getIdToken();
      console.log('Token: ', token);
      const response = await axios.get(`${BASE_URL}/ponds`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const pondData = response.data.map(
        (dataItem: {
          id: string;
          name: string;
          address: string;
          city: string;
          status: boolean;
          seedCount: number;
          imageUrl: string;
          isEnabled: boolean;
        }) => {
          return {
            pondId: dataItem.id,
            pondName: dataItem.name,
            pondAddress: dataItem.address,
            city: dataItem.city,
            status: dataItem.status,
            seedCount: dataItem.seedCount,
            imageUrl: dataItem.imageUrl,
            isEnabled: dataItem.isEnabled,
          };
        },
      );

      let counter = 0;
      for (let index = 0; index < pondData.length; index++) {
        if (pondData[index].status === false) {
          counter++;
        }
      }

      set({
        pondsData: pondData,
        totalPonds: response.data.length,
        totalSeedCount: pondData.reduce((acc: number, pond: any) => {
          return acc + pond.seedCount;
        }, 0),
        totalPondStatus: counter,
      });
    } catch (error) {
      console.log(error);
    }
  },

  getOnePond: async (pondId: string) => {
    try {
      const token = await auth().currentUser?.getIdToken();
      const response = await axios.get(`${BASE_URL}/ponds/${pondId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      response.data.deviceId === null
        ? set({
            pondDetail: {
              pondId: response.data.id,
              pondName: response.data.name,
              address: response.data.address,
              city: response.data.city,
              seedDate: response.data.seedDate,
              seedCount: response.data.seedCount,
              imageUrl: response.data.imageUrl,
              status: response.data.status,
              isFilled: response.data.isFilled,
              deviceId: '',
              device: {
                ...get().pondDetail.device,
              },
            },
            updatePondData: {
              name: response.data.name,
              address: response.data.address,
              city: response.data.city,
              deviceId: '',
              imageUrl: response.data.imageUrl,
              isFilled: response.data.isFilled,
              seedDate: response.data.seedDate,
              seedCount: response.data.seedCount,
            },
          })
        : set({
            pondDetail: {
              pondId: response.data.id,
              pondName: response.data.name,
              address: response.data.address,
              city: response.data.city,
              seedDate: response.data.seedDate,
              seedCount: response.data.seedCount,
              imageUrl: response.data.imageUrl,
              status: response.data.status,
              isFilled: response.data.isFilled,
              deviceId: response.data.deviceId || '',
              device: {
                deviceId: response.data.device.id || '',
                DeviceName: response.data.device.name,
                isSaved: response.data.device.isSaved,
                autoFeedEnabled: response.data.device.autoFeedEnabled,
                autoWaterEnabled: response.data.device.autoWaterEnabled,
                tempLow: Number(response.data.device.tempLow),
                tempHigh: Number(response.data.device.tempHigh),
                phLow: Number(response.data.device.phLow),
                phHigh: Number(response.data.device.phHigh),
                tdoLow: Number(response.data.device.tdoLow),
                tdoHigh: Number(response.data.device.tdoHigh),
                tdsLow: Number(response.data.device.tdsLow),
                tdsHigh: Number(response.data.device.tdsHigh),
                turbiditiesLow: Number(response.data.device.turbiditiesLow),
                turbiditiesHigh: Number(response.data.device.turbiditiesHigh),
              },
            },

            updatePondData: {
              name: response.data.name,
              address: response.data.address,
              city: response.data.city,
              deviceId: response.data.deviceId || '',
              imageUrl: response.data.imageUrl,
              isFilled: response.data.isFilled,
              seedDate: response.data.seedDate,
              seedCount: response.data.seedCount,
            },
          });
    } catch (error) {
      console.log(error);
    }
  },

  handleChangeForm: data => {
    set(state => ({
      inputData: {
        ...state.inputData,
        ...data,
      },
    }));
  },

  addPond: async () => {
    try {
      const formData = new FormData();

      formData.append('name', get().inputData.pondName);
      formData.append('address', get().inputData.pondAddress);
      formData.append('city', get().inputData.city);
      formData.append('deviceId', get().inputData.deviceId);
      formData.append('imageUrl', useFirebaseStore.getState().firebaseImageURL);
      formData.append('isFilled', get().inputData.isFilled);

      const requestJSON = {
        name: get().inputData.pondName,
        address: get().inputData.pondAddress,
        city: get().inputData.city,
        deviceId: get().inputData.deviceId,
        imageUrl: useFirebaseStore.getState().firebaseImageURL,
        isFilled: get().inputData.isFilled,
      };

      console.log(requestJSON);

      const token = await auth().currentUser?.getIdToken();
      const response = await axios.post(
        `${BASE_URL}/ponds`,

        requestJSON,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },

          validateStatus: () => {
            return false;
          },
        },
      );

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  },

  updateOnePond: async (data: Partial<UpdatePondData>) => {
    try {
      console.log('current pond id: ', get().pondDetail.pondId);
      console.log(data);

      const token = await auth().currentUser?.getIdToken();
      const response = await axios.patch(
        `${BASE_URL}/ponds/${get().pondDetail.pondId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log('Updated Pond Data: ', response.data);
      set({
        updatePondData: { ...get().updatePondData, ...data },
      });
    } catch (error) {
      console.log(error);
    }
  },

  updateDeviceData: async (data: Partial<PondDetail>) => {
    try {
      console.log(data.device);

      const token = await auth().currentUser?.getIdToken();
      await axios.patch(
        `${BASE_URL}/ponds/${get().pondDetail.pondId}/device`,
        data.device,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      set({
        pondDetail: {
          ...get().pondDetail,
          device: {
            ...get().pondDetail.device,
            ...data.device,
          },
        },
      });
    } catch (error: any) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
      console.log(error.config);
    }
  },
}));

export default usePondStore;
