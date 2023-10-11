import { BASE_URL } from '@env';
import axios from 'axios';
import { create } from 'zustand';
import useAuthStore from '../auth/AuthStore';

type NotificationData = {
  notifId: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
};

type notificationStoreState = {
  notificationData: NotificationData[];
  visibleData: NotificationData[];
  isLoading: boolean;
  hasMore: boolean;
  limit: number;
};

type notificationAction = {
  getAllNotification: () => Promise<void>;
  updateNotificationStatus: (notifId: string) => Promise<void>;
  loadMoreData: () => void;
  deleteAllNotification: () => Promise<void>;
};

const useNotificationStore = create<
  notificationStoreState & notificationAction
>()((set, get) => ({
  notificationData: [],
  visibleData: [],
  isLoading: false,
  hasMore: true,
  limit: 5,

  getAllNotification: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/notifications`, {
        headers: {
          Authorization: `Bearer ${useAuthStore.getState().userDetail.token}`,
        },
      });

      const notificationData = response.data.map(
        (dataItem: {
          id: string;
          title: string;
          message: string;
          isRead: boolean;
          createdAt: string;
        }) => {
          return {
            notifId: dataItem.id,
            title: dataItem.title,
            message: dataItem.message,
            isRead: dataItem.isRead,
            createdAt: dataItem.createdAt,
          };
        },
      );

      set({
        notificationData: notificationData,
        visibleData: notificationData.slice(0, get().limit),
      });
    } catch (error) {
      console.log(error);
    }

    set({ isLoading: false });
  },

  updateNotificationStatus: async (notifId: string) => {
    try {
      const response = await axios.patch(
        `${BASE_URL}/notifications/${notifId}`,
        notifId,
        {
          headers: {
            Authorization: `Bearer ${useAuthStore.getState().userDetail.token}`,
          },
        },
      );

      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  },

  loadMoreData: () => {
    try {
      const currentlyVisibleCount = get().visibleData.length;

      const remainingData = get().notificationData.slice(
        currentlyVisibleCount,
        currentlyVisibleCount + get().limit,
      );

      if (remainingData.length > 0) {
        set(prevData => ({
          ...prevData,
          visibleData: [...prevData.visibleData, ...remainingData],
        }));
      }
    } catch (error) {
      console.log(error);
    }
  },

  deleteAllNotification: async () => {
    try {
      await axios.delete(`${BASE_URL}/notifications`, {
        headers: {
          Authorization: `Bearer ${useAuthStore.getState().userDetail.token}`,
        },
      });
    } catch (error) {
      console.log(error);
    }
  },
}));

export default useNotificationStore;
