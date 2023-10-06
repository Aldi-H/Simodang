import { BASE_URL } from '@env';
import axios from 'axios';
import { create } from 'zustand';
import usePondStore from '../pond/PondStore';
import moment from 'moment';

type DataSensor = {
  [key: string]: number[];
  temperature: number[];
  ph: number[];
  tdo: number[];
  tds: number[];
  turbidity: number[];
  createdAt: number[];
};

type chartDataState = {
  dataSensor: DataSensor;
};

type chartDataAction = {
  getChartDataByDate: () => Promise<void>;
  getChartDataByHour: () => Promise<void>;
};

const useMetricStore = create<chartDataState & chartDataAction>()(set => ({
  dataSensor: {
    temperature: [],
    ph: [],
    tdo: [],
    tds: [],
    turbidity: [],
    createdAt: [],
  },

  getChartDataByDate: async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/metrics/${usePondStore.getState().pondDetail.pondId}`,
        {
          params: {
            startDate: '2023-09-25',
            endDate: '2023-10-06',
            avg: '1',
          },
        },
      );

      console.log(
        response.data.map((item: any) =>
          moment(item.createdAt).utcOffset('+0700').format(),
        ),
      );

      set({
        dataSensor: {
          temperature: response.data.map(
            (item: any) => Math.round(parseFloat(item.temperature) * 100) / 100,
          ),
          ph: response.data.map(
            (item: any) => Math.round(parseFloat(item.ph) * 100) / 100,
          ),
          tdo: response.data.map(
            (item: any) => Math.round(parseFloat(item.tdo) * 100) / 100,
          ),
          tds: response.data.map(
            (item: any) => Math.round(parseFloat(item.tds) * 100) / 100,
          ),
          turbidity: response.data.map(
            (item: any) => Math.round(parseFloat(item.turbidity) * 100) / 100,
          ),
          createdAt: response.data.map((item: any) =>
            moment(item.createdAt).utcOffset('+0700').format('D MMM YYYY'),
          ),
        },
      });
    } catch (error) {
      console.log(error);
    }
  },

  getChartDataByHour: async () => {},
}));

export default useMetricStore;
