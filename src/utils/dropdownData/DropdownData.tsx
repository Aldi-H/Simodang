import { CONSTANT } from '../../themes';

const ChartDropdown = [
  {
    value: '1',
    label: 'TDS',
    chartData: 'tds',
    stroke: CONSTANT.themeColors.TDSIndicator,
    fill: CONSTANT.themeColors.TDSIndicator,
  },
  {
    value: '2',
    label: 'TDO',
    chartData: 'tdo',
    stroke: CONSTANT.themeColors.TDOIndicator,
    fill: CONSTANT.themeColors.TDOIndicator,
  },
  {
    value: '3',
    label: 'pH',
    chartData: 'ph',
    stroke: CONSTANT.themeColors.phIndicator,
    fill: CONSTANT.themeColors.phIndicator,
  },
  {
    value: '4',
    label: 'Suhu',
    chartData: 'temperature',
    stroke: CONSTANT.themeColors.tempIndicator,
    fill: CONSTANT.themeColors.tempIndicator,
  },
  {
    value: '5',
    label: 'Turbiditas',
    chartData: 'turbidity',
    stroke: CONSTANT.themeColors.tubidityIndicator,
    fill: CONSTANT.themeColors.tubidityIndicator,
  },
];

const PaginationDropdown = [
  {
    value: '5',
    label: '5',
  },
  {
    value: '10',
    label: '10',
  },
  {
    value: '15',
    label: '15',
  },
  {
    value: '20',
    label: '20',
  },
];

const PondsStatusDropdown = [
  {
    label: 'Kosong',
    value: '1',
  },
  {
    label: 'Terisi',
    value: '2',
  },
];

export { ChartDropdown, PaginationDropdown, PondsStatusDropdown };
