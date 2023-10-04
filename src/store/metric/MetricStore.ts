import { BASE_URL } from '@env';
import axios from 'axios';
import { create } from 'zustand';
import usePondStore from '../pond/PondStore';
import moment from 'moment';

/* type chartDataState = {
  temperature: string;
  pH: string;
  tdo: string;
  tds: string;
  turbidity: string;
  createdAt: string;
}; */
type chartDataState = {
  temperature: number[];
  pH: number;
  tdo: number;
  tds: number[];
  turbidity: number;
  createdAt: string[];
};

type chartDataAction = {
  getChartDataByDate: () => Promise<void>;
  getChartDataByHour: () => Promise<void>;
};

const useMetricStore = create<chartDataState & chartDataAction>()(set => ({
  temperature: [],
  pH: 0,
  tdo: 0,
  tds: [],
  turbidity: 0,
  createdAt: [],

  getChartDataByDate: async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/metrics/${usePondStore.getState().pondDetail.pondId}`,
        {
          params: {
            startDate: '2023-09-29',
            endDate: '2023-10-02',
            avg: '1',
          },
        },
      );

      // console.log(response.data.map((item: any) => item.tds));

      set({
        temperature: response.data.map(
          (item: any) => Math.round(parseFloat(item.temperature) * 100) / 100,
        ),
        pH: response.data.map((item: any) => item.pH),
        tdo: response.data.map((item: any) => item.tdo),
        tds: response.data.map((item: any) => Number(item.tds)),
        turbidity: response.data.map((item: any) => item.turbidity),
        createdAt: response.data.map((item: any) =>
          moment(item.createdAt).utcOffset('+0700').format('D MMM YY'),
        ),
      });
    } catch (error) {
      console.log(error);
    }
  },

  getChartDataByHour: async () => {},
}));

export default useMetricStore;
