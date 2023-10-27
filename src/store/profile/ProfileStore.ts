import { BASE_URL } from '@env';
import axios from 'axios';
import { create } from 'zustand';
import useAuthStore from '../auth/AuthStore';

type UserDetail = {
  userName: string;
  email: string;
  phoneNum: string;
  address: string;
  photo: string | undefined;
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
      photo: useAuthStore.getState().userDetail.photo,
    },

    getUser: async () => {
      try {
        const response = await axios.get(`${BASE_URL}/users/profile`, {
          headers: {
            Authorization: `Bearer ${useAuthStore.getState().userDetail.token}`,
          },
        });

        console.log('Profile Data: ', response.data);

        set({
          userDetail: {
            userName: response.data.name,
            email: response.data.email,
            phoneNum: response.data.phoneNum,
            address: response.data.address,
            photo: response.data.photo || '',
          },
        });
      } catch (error) {
        console.log(error);
      }
    },

    updateUser: async (data: Partial<UserDetail>) => {
      try {
        const response = await axios.patch(`${BASE_URL}/users/update`, data, {
          headers: {
            Authorization: `Bearer ${useAuthStore.getState().userDetail.token}`,
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
