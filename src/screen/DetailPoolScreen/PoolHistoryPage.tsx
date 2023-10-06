import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Modal, ColorValue } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { CONSTANT } from '../../themes';
import { ChartDropdown } from '../../utils/dropdownData/DropdownData';

import FilterIconOutline from '../../assets/icons/FilterIconOutline.svg';
import BackIcon from '../../assets/icons/BackIcon.svg';
import StackedLineChartComponent from '../../components/chart/StackedLineChartComponent';
import DropdownComponent from '../../components/dropdown/DropdownComponent';
import TableComponent from '../../components/table/TableComponent';
import DrawerScreenPage from './drawer/DrawerScreenPage';
import useMetricStore from '../../store/metric/MetricStore';

const PoolHistoryPage = () => {
  const { getChartDataByDate, dataSensor } = useMetricStore();

  const [value, setValue] = useState<string | undefined>();
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [isBottomDrawerOpen, setIsBottomDrawerOpen] = useState<boolean>(false);
  const [selectedData, setSelectedData] = useState<{
    label: string;
    chartData: string;
    stroke: ColorValue | undefined;
    fill: ColorValue | undefined;
    value: string;
  }>();

  const handleOpenBottomDrawer = () => {
    setIsBottomDrawerOpen(true);
    console.log('Drawer Open');
  };

  const handleCloseBottomDrawer = () => {
    setIsBottomDrawerOpen(false);
    console.log('Drawer Close');
  };

  const getDataBasedSelectedDropdown = (selectedValue: string) => {
    const selected = ChartDropdown.find(item => item.value === selectedValue);
    console.log(selectedValue);

    return selected;
  };

  useEffect(() => {
    getChartDataByDate();
    setSelectedData(prevData => {
      const selected = getDataBasedSelectedDropdown(value || '1');
      if (prevData && prevData.value === selected?.value) {
        return prevData;
      }
      return selected as {
        label: string;
        chartData: string;
        stroke: ColorValue | undefined;
        fill: ColorValue | undefined;
        value: string;
      };
    });
  }, [getChartDataByDate, value]);

  console.log(dataSensor);

  return (
    <View className="my-1">
      {/* Page Title Section */}
      <View className="flex flex-row justify-between items-center">
        <Text style={styles.poolHistoryTitle}>Grafik Kondisi Kolam</Text>
        <View className="items-end">
          <View className="my-3">
            <DropdownComponent
              dropdownData={ChartDropdown}
              dropdownStyle={styles.dropdown}
              isFocus={isFocus}
              value={value}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={(item: any) => {
                setValue(item.value);
                setIsFocus(false);
              }}
            />
          </View>
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isBottomDrawerOpen}
        onRequestClose={handleCloseBottomDrawer}>
        <DrawerScreenPage
          CloseDrawer={handleCloseBottomDrawer}
          UpdateDrawer={() => console.log('Perbarui Pressed')}
        />
      </Modal>

      {/* Indicator Filter Section */}
      <View className="flex flex-row justify-between items-center my-3">
        <TouchableHighlight
          style={styles.filterButton}
          className="p-1 rounded-md"
          onPress={() => {
            console.log('Button Pressed');
            handleOpenBottomDrawer();
          }}>
          <View className="flex flex-row items-center space-x-2 pr-2">
            <View className="-mr-1">
              <FilterIconOutline
                height={hp('4%')}
                fill={CONSTANT.themeColors.base}
              />
            </View>
            <Text style={styles.filterText} className="mx-1">
              7 Hari Terakhir
            </Text>
            <View className="-rotate-90">
              <BackIcon
                height={hp('1.5%')}
                width={wp('1.5%')}
                fill={CONSTANT.themeColors.base}
              />
            </View>
          </View>
        </TouchableHighlight>

        <View>
          <Text style={styles.indicatorText}>1 Sept - 7 Sept</Text>
        </View>
      </View>

      {/* Chart Section */}
      <View>
        <StackedLineChartComponent
          SensorData={
            dataSensor[selectedData?.chartData.toLowerCase() || 'tds']
          }
          Stroke={selectedData?.stroke || '#D1DE3A'}
          Fill={selectedData?.fill || '#D1DE3A'}
          SensorDateData={
            dataSensor.createdAt.map(date => date.toString()) as string[]
          }
        />
      </View>

      <View className="mb-5">
        <TableComponent
          TabelData={
            dataSensor.createdAt
              .map((date, index) => ({
                date: date.toString(),
                value:
                  dataSensor[selectedData?.chartData.toLowerCase() || 'tds'][
                    index
                  ],
              }))
              .reverse() as { date?: string; value?: number }[]
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  poolHistoryTitle: {
    fontFamily: CONSTANT.customFonts.heading2,
    fontSize: CONSTANT.fontSizes.heading2,
    color: CONSTANT.themeColors.font,
  },
  dropdown: {
    height: hp('4%'),
    width: wp('30%'),
    borderColor: CONSTANT.themeColors.disable,
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  filterButton: {
    backgroundColor: CONSTANT.themeColors.primary,
  },
  filterText: {
    fontFamily: CONSTANT.customFonts.body,
    fontSize: CONSTANT.fontSizes.body,
    color: CONSTANT.themeColors.base,
  },
  indicatorText: {
    fontFamily: CONSTANT.customFonts.body,
    fontSize: CONSTANT.fontSizes.body,
    color: CONSTANT.themeColors.font,
  },

  drawerContainer: {
    backgroundColor: CONSTANT.themeColors.base,
  },
  actionText: {
    fontFamily: CONSTANT.customFonts.body,
    fontSize: CONSTANT.fontSizes.body,
    color: CONSTANT.themeColors.font,
  },
  dateRange: {
    fontFamily: CONSTANT.customFonts.heading2,
    fontSize: CONSTANT.fontSizes.heading2,
    color: CONSTANT.themeColors.font,
  },
});

export default PoolHistoryPage;
