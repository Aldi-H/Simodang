import { BASE_URL } from '@env';
import axios from 'axios';
import { create } from 'zustand';
import useAuthStore from '../auth/AuthStore';
import auth from '@react-native-firebase/auth';

type UserDetail = {
  userName: string;
  email: string;
  phoneNum: string;
  address: string;
  photo: string | undefined;
  pricingName: string;
  pondLimit: number;
};

type ProfileStoreState = {
  userDetail: UserDetail;
};

type ProfileStoreAction = {
  getUser: () => Promise<void>;
  updateUser: (data: UserDetail) => Promise<void>;
};

const useProfileStore = create<ProfileStoreState & ProfileStoreAction>()(
  (set, get) => ({
    userDetail: {
      userName: '',
      email: '',
      phoneNum: '',
      address: '',
      photo: 'https://placehold.co/600x600/png',
      pricingName: '',
      pondLimit: 0,
    },

    getUser: async () => {
      try {
        const token = await auth().currentUser?.getIdToken();
        const response = await axios.get(`${BASE_URL}/users/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          validateStatus: status => {
            return true;
          }
        });

        console.log('Profile Data: ', response.data);

        set({
          userDetail: {
            userName: response.data.name,
            email: response.data.email,
            phoneNum: response.data.phoneNum,
            address: response.data.address,
            photo: response.data.photo || 'https://placehold.co/600x600/png',
            pricingName: response.data.pricingName,
            pondLimit: response.data.pondLimit,
          },
        });
      } catch (error) {
        console.log('Profile Error: ', error);
      }
    },

    updateUser: async (data: Partial<UserDetail>) => {
      try {
        const token = await auth().currentUser?.getIdToken();
        const response = await axios.patch(`${BASE_URL}/users/update`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('Updated Data: ', response.data);

        set({
          userDetail: { ...get().userDetail, ...data },
        });
      } catch (error) {
        console.log(error);
      }
    },
  }),
);

export default useProfileStore;
