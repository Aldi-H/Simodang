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

export { ChartDropdown, PondsStatusDropdown };
