import React, { useState } from 'react';
import { StyleSheet, Text, View, Modal } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
// import { DrawerActions, useNavigation } from '@react-navigation/native';

import { CONSTANT } from '../../themes';
import FilterIconOutline from '../../assets/icons/FilterIconOutline.svg';
import BackIcon from '../../assets/icons/BackIcon.svg';
import StackedLineChartComponent from '../../components/chart/StackedLineChartComponent';
import DropdownComponent from '../../components/dropdown/DropdownComponent';
import TableComponent from '../../components/table/TableComponent';
import DrawerScreenPage from './drawer/DrawerScreenPage';
// import CalendarComponent from '../../components/calendar/CalendarComponent';

const PoolHistoryPage = () => {
  const [isBottomDrawerOpen, setIsBottomDrawerOpen] = useState(false);

  const handleOpenBottomDrawer = () => {
    setIsBottomDrawerOpen(true);
    console.log('Drawer Open');
  };

  const handleCloseBottomDrawer = () => {
    setIsBottomDrawerOpen(false);
    console.log('Drawer Close');
  };

  return (
    <View className="my-1">
      {/* Page Title Section */}
      <View className="flex flex-row justify-between items-center">
        <Text style={styles.poolHistoryTitle}>Grafik Kondisi Kolam</Text>
        <View className="items-end">
          <View className="my-3">
            <DropdownComponent dropdownStyle={styles.dropdown} />
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
        <StackedLineChartComponent />
      </View>

      <View className="mb-5">
        <TableComponent />
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
