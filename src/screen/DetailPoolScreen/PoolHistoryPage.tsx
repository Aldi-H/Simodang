import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  FlatList,
  ColorValue,
  ViewStyle,
} from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import moment from 'moment';

import { CONSTANT } from '../../themes';
import {
  ChartDropdown,
  PaginationDropdown,
} from '../../utils/dropdownData/DropdownData';

import FilterIconOutline from '../../assets/icons/FilterIconOutline.svg';
import BackIcon from '../../assets/icons/BackIcon.svg';
import StackedLineChartComponent from '../../components/chart/StackedLineChartComponent';
import DropdownComponent from '../../components/dropdown/DropdownComponent';
import TableComponent from '../../components/table/TableComponent';
import DrawerScreenPage from './drawer/DrawerScreenPage';
import useMetricStore from '../../store/metric/MetricStore';
import ButtonComponent from '../../components/button/ButtonComponent';

import { ChartDurationByHour } from '../../utils/chartDuration/ChartDuration';
import { useDurationContext } from '../../context/ChartDurationContext';

const PoolHistoryPage = () => {
  const {
    getChartDataByDate,
    getChartDataByHour,
    dataSensor,
    startDate,
    endDate,
  } = useMetricStore();

  //* Pagination
  const pageLimit = 3;
  const pageNumber = [];
  const [dropdownPaginationValue, setDropdownPaginationValue] = useState<
    number | string | undefined
  >(5);
  const [isFocusPagination, setIsFocusPagination] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);

  //* Chart Dropdown
  const [chartDropdownValue, setChartDropdownValue] = useState<
    string | undefined
  >();
  const [isFocusChart, setIsFocusChart] = useState<boolean>(false);

  //* Chart Duration
  const [activeHourDuration, setActiveHourDuration] = useState<number>(0);

  //* useDurationContext
  const { activeDurationTitle } = useDurationContext();

  //* Drawer
  const [isBottomDrawerOpen, setIsBottomDrawerOpen] = useState<boolean>(false);
  const [selectedData, setSelectedData] = useState<{
    label: string;
    chartData: string;
    stroke: ColorValue | undefined;
    fill: ColorValue | undefined;
    value: string;
  }>();

  //* drawer handler button function
  const handleOpenBottomDrawer = () => {
    setIsBottomDrawerOpen(true);
  };

  const handleCloseBottomDrawer = () => {
    setIsBottomDrawerOpen(false);
  };

  //* dropdown handler
  const getDataBasedSelectedDropdown = (selectedValue: string) => {
    const selected = ChartDropdown.find(item => item.value === selectedValue);

    return selected;
  };

  //* pagination
  const lastData = currentPage * Number(dropdownPaginationValue);
  const firstData = lastData - Number(dropdownPaginationValue);

  const currentData = dataSensor.createdAt
    .map((date, index) => ({
      date: date.toString(),
      value: dataSensor[selectedData?.chartData.toLowerCase() || 'tds'][index],
    }))
    .reverse()
    .slice(firstData, lastData) as { date?: string; value?: number }[];

  for (
    let i = 1;
    i <=
    Math.ceil(
      dataSensor[selectedData?.chartData.toLowerCase() || 'tds'].length /
        Number(dropdownPaginationValue),
    );
    i++
  ) {
    pageNumber.push(i);
  }

  const setPage = (pageNum: number) => {
    setCurrentPage(pageNum);
  };

  useEffect(() => {
    getChartDataByDate(startDate, endDate);

    setSelectedData(prevData => {
      const selected = getDataBasedSelectedDropdown(chartDropdownValue || '1');
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
  }, [getChartDataByDate, chartDropdownValue]);

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
              isFocus={isFocusChart}
              value={chartDropdownValue}
              labelField="label"
              valueField="value"
              onFocus={() => setIsFocusChart(true)}
              onBlur={() => setIsFocusChart(false)}
              onChange={(item: any) => {
                setChartDropdownValue(item.value);
                setActiveHourDuration(0);
                setIsFocusChart(false);
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
          UpdateDrawer={() => {
            getChartDataByDate(startDate, endDate);
            handleCloseBottomDrawer();
          }}
        />
      </Modal>

      {/* Indicator Filter Section */}
      <View className="flex flex-row justify-between items-center my-3">
        <TouchableHighlight
          style={styles.filterButton}
          className="p-1 rounded-md"
          onPress={() => {
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
              {/* 7 Hari Terakhir */}
              {activeDurationTitle}
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
          <Text style={styles.indicatorText}>
            {startDate === endDate
              ? `${moment(startDate).format('DD MMM')}`
              : `${moment(startDate).format('DD MMM')} - ${moment(
                  endDate,
                ).format('DD MMM')}`}
          </Text>
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

        <View className="items-center">
          <FlatList
            horizontal={true}
            data={ChartDurationByHour}
            renderItem={({ item }) => {
              const isActive = item.id === activeHourDuration;
              const activeContainerStyle = isActive
                ? { color: CONSTANT.themeColors.font }
                : { color: CONSTANT.themeColors.disable };
              return (
                <ButtonComponent
                  buttonText={item.title}
                  style={
                    [styles.loginButton, activeContainerStyle] as ViewStyle
                  }
                  className="h-fit py-1 px-1.5"
                  onPress={() => {
                    console.log('hour = ', item.value);
                    getChartDataByHour(item.value);
                    setActiveHourDuration(item.id);
                  }}
                />
              );
            }}
          />
        </View>
      </View>

      <View className="mb-5">
        <View className="flex flex-row justify-end items-center space-x-2">
          <Text style={styles.paginationData}>Data:</Text>
          <View className="my-3">
            <DropdownComponent
              dropdownData={PaginationDropdown}
              dropdownStyle={styles.dropdownPagination}
              itemContainerStyle={styles.itemContainerStyle}
              isFocus={isFocusPagination}
              labelField="label"
              valueField="value"
              value={String(dropdownPaginationValue)}
              onFocus={() => setIsFocusPagination(true)}
              onBlur={() => setIsFocusPagination(false)}
              onChange={(item: any) => {
                setDropdownPaginationValue(item.value);
                setIsFocusPagination(false);
              }}
            />
          </View>
        </View>

        <TableComponent TabelData={currentData} />

        <View className="flex-row justify-between mt-1 mx-1">
          <View />
          <View className="flex-row">
            {pageNumber
              .slice(
                Math.max(currentPage - Math.floor(pageLimit / 1), 0),
                Math.min(
                  currentPage + Math.floor(pageLimit / 1),
                  pageNumber.length,
                ),
              )
              .map((pageNum, index) => {
                return (
                  <Text
                    key={index}
                    className={
                      pageNum === currentPage ? 'border px-3 rounded' : 'px-3'
                    }
                    style={[
                      styles.paginationPage,
                      pageNum === currentPage
                        ? styles.activePage
                        : styles.inactivePage,
                    ]}
                    onPress={() => {
                      setPage(pageNum);
                    }}>
                    {pageNum}
                  </Text>
                );
              })}
          </View>
        </View>
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
    borderRadius: 3,
    paddingHorizontal: 8,
  },
  dropdownPagination: {
    height: hp('4%'),
    width: wp('20%'),
    borderColor: CONSTANT.themeColors.disable,
    borderWidth: 0.5,
    borderRadius: 3,
    paddingHorizontal: 8,
  },
  itemContainerStyle: {
    margin: -10,
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

  loginButton: {
    fontFamily: CONSTANT.customFonts.body,
    fontSize: CONSTANT.fontSizes.body,
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
  paginationData: {
    fontFamily: CONSTANT.customFonts.body,
    fontSize: CONSTANT.fontSizes.body,
    color: CONSTANT.themeColors.font,
  },
  paginationPage: {
    fontFamily: CONSTANT.customFonts.body,
    fontSize: CONSTANT.fontSizes.heading2,
  },
  activePage: {
    borderColor: CONSTANT.themeColors.primary,
    color: CONSTANT.themeColors.primary,
  },
  inactivePage: {
    borderColor: CONSTANT.themeColors.disable,
    color: CONSTANT.themeColors.disable,
  },
});

export default PoolHistoryPage;
