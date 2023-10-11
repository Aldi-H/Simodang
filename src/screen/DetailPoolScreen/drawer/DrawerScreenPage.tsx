import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, FlatList } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import moment from 'moment';

import { CONSTANT } from '../../../themes';

import useMetricStore from '../../../store/metric/MetricStore';

import CalendarComponent from '../../../components/calendar/CalendarComponent';
import DisplayTextComponent from '../../../components/text/DisplayTextComponent';
import { ChartDurationByDate } from '../../../utils/chartDuration/ChartDuration';

type DrawerScreenProps = {
  CloseDrawer: () => void;
  UpdateDrawer: () => void;
};

const DrawerScreenPage = ({ CloseDrawer, UpdateDrawer }: DrawerScreenProps) => {
  const { getStartDate, getEndDate, startDate, endDate } = useMetricStore();

  const [activeDuration, setIsActiveDuration] = useState(1);

  return (
    <View
      style={[
        styles.drawerContainer,
        {
          height: hp('93%'),
        },
      ]}
      className="absolute bottom-0 py-10 px-6 rounded-t-xl left-0 right-0">
      {/* Drawer Header */}
      <View className="flex flex-row justify-between items-center">
        <Pressable onPress={CloseDrawer}>
          <Text style={styles.actionText}>Batalkan</Text>
        </Pressable>
        <View>
          <Text style={styles.dateRange}>
            {moment(startDate).format('DD MMM')} -{' '}
            {moment(endDate).format('DD MMM')}
          </Text>
        </View>
        <Pressable onPress={UpdateDrawer}>
          <Text style={styles.actionText}>Perbarui</Text>
        </Pressable>
      </View>

      {/* Duration */}
      <View className="flex flex-row">
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={ChartDurationByDate}
          renderItem={({ item }) => {
            const isActive = item.id === activeDuration;
            const activeContainerStyle = isActive ? styles.activeItem : {};

            return (
              <View>
                <Pressable
                  onPress={() => {
                    setIsActiveDuration(item.id);
                    getStartDate(item.rangeDate);
                    getEndDate();
                  }}>
                  <DisplayTextComponent
                    DisplayValue={item.title}
                    ClassnameContainerStyle="w-fit px-2 mx-2"
                    ContainerStyle={activeContainerStyle}
                  />
                </Pressable>
              </View>
            );
          }}
        />
      </View>

      {/* Show Calendar */}
      <View>
        <CalendarComponent startDate={startDate} endDate={endDate} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  itemContainer: {
    padding: 8,
    borderRadius: 8,
  },
  activeItem: {
    backgroundColor: CONSTANT.themeColors.font,
    color: CONSTANT.themeColors.base,
  },
});

export default DrawerScreenPage;
