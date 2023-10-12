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
  startDate: string;
  endDate: string;
  // rangeDate: number;
};

type chartDataAction = {
  getChartDataByDate: (startDate: string, endDate: string) => Promise<void>;
  getChartDataByHour: () => Promise<void>;
  getStartDate: (rangeDate: number) => void;
  getEndDate: () => void;
  handleChangeDate: (startDate: string, endDate: string) => void;
};

const useMetricStore = create<chartDataState & chartDataAction>()(
  (set, get) => {
    // Inisialisasi startDate dan endDate
    const getStartDateFromNow = new Date();
    getStartDateFromNow.setDate(getStartDateFromNow.getDate() - 7);

    const initialStartDate = `${getStartDateFromNow.getFullYear()}-${String(
      getStartDateFromNow.getMonth() + 1,
    ).padStart(2, '0')}-${String(getStartDateFromNow.getDate()).padStart(
      2,
      '0',
    )}`;

    const getEndDateFromNow = new Date();

    const initialEndDate = `${getEndDateFromNow.getFullYear()}-${String(
      getEndDateFromNow.getMonth() + 1,
    ).padStart(2, '0')}-${String(getEndDateFromNow.getDate()).padStart(
      2,
      '0',
    )}`;

    return {
      dataSensor: {
        temperature: [],
        ph: [],
        tdo: [],
        tds: [],
        turbidity: [],
        createdAt: [],
      },
      startDate: initialStartDate,
      endDate: initialEndDate,

      getStartDate: (rangeDate: number) => {
        const dateNow = new Date();
        dateNow.setDate(dateNow.getDate() - rangeDate);

        const startDate = `${dateNow.getFullYear()}-${String(
          dateNow.getMonth() + 1,
        ).padStart(2, '0')}-${String(dateNow.getDate()).padStart(2, '0')}`;

        set({ startDate: startDate });
      },

      getEndDate: () => {
        const dateNow = new Date();

        const endDate = `${dateNow.getFullYear()}-${String(
          dateNow.getMonth() + 1,
        ).padStart(2, '0')}-${String(dateNow.getDate()).padStart(2, '0')}`;

        set({ endDate: endDate });
      },

      handleChangeDate: (startDate: string, endDate: string) => {
        get().getChartDataByDate(startDate, endDate);
        set({ startDate: startDate, endDate: endDate });

        console.log(startDate, endDate);
      },

      getChartDataByDate: async (startDate: string, endDate: string) => {
        try {
          const response = await axios.get(
            `${BASE_URL}/metrics/avg/${
              usePondStore.getState().pondDetail.pondId
            }`,
            {
              params: {
                startDate: startDate,
                endDate: endDate,
              },
            },
          );

          console.log('startDate: ', startDate);
          console.log('endDate: ', endDate);

          console.log(
            response.data.map((item: any) =>
              moment(item.createdAt).utcOffset('+0700').format(),
            ),
          );

          set({
            dataSensor: {
              temperature: response.data.map(
                (item: any) =>
                  Math.round(parseFloat(item.temperature) * 100) / 100,
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
                (item: any) =>
                  Math.round(parseFloat(item.turbidity) * 100) / 100,
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
    };
  },
);

export default useMetricStore;
