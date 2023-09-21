import { BASE_URL } from '@env';
import axios from 'axios';
import { create } from 'zustand';
import useAuthStore from '../auth/AuthStore';

enum PondStatus {
  bad = 0,
  good = 1,
}

type PondsData = {
  pondId: string;
  pondName: string;
  city: string;
};

type PondStoreState = {
  pondsData: PondsData[];
  totalPonds: number;
};

type PondStoreAction = {
  getAllPonds: () => Promise<void>;
  getOnePond: (pondId: string) => Promise<void>;
};

const usePondStore = create<PondStoreState & PondStoreAction>()(set => ({
  pondsData: [],
  totalPonds: 0,

  getAllPonds: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/ponds`, {
        headers: {
          Authorization: `Bearer ${useAuthStore.getState().userDetail.token}`,
        },
      });

      const pondData = response.data.map(
        (dataItem: {
          id: string;
          name: string;
          address: string;
          city: string;
          status: PondStatus;
        }) => {
          return {
            pondId: dataItem.id,
            pondName: dataItem.name,
            address: dataItem.address,
            city: dataItem.city,
            status: dataItem.status,
          };
        },
      );

      // console.log(pondData);
      set({
        pondsData: pondData,
        totalPonds: response.data.length,
      });
    } catch (error) {
      console.log(error);
    }
  },

  getOnePond: async (pondId: string) => {
    try {
      const response = await axios.get(`${BASE_URL}/ponds/${pondId}`, {
        headers: {
          Authorization: `Bearer ${useAuthStore.getState().userDetail.token}`,
        },
      });

      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  },
}));

export default usePondStore;
