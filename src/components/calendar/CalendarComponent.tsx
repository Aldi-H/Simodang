import React from 'react';
import { View, StyleSheet } from 'react-native';
import Calendar from 'react-native-calendar-range-picker';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { CUSTOM_LOCALE } from '../../utils/calendarLocale/CustomLocal';
import { CONSTANT } from '../../themes';

const CalendarComponent = () => {
  const today = new Date();
  const todayFormatted = `${today.getFullYear()}-${String(
    today.getMonth() + 1,
  ).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  const sevenDaysFromToday = new Date(today);
  sevenDaysFromToday.setDate(today.getDate() + 14);
  const sevenDaysFromTodayFormatted = `${sevenDaysFromToday.getFullYear()}-${String(
    sevenDaysFromToday.getMonth() + 1,
  ).padStart(2, '0')}-${String(sevenDaysFromToday.getDate()).padStart(2, '0')}`;

  return (
    <View style={styles.calendarContainer}>
      <Calendar
        // startDate="2023-09-06"
        startDate={todayFormatted}
        // endDate="2023-12-31"
        endDate={sevenDaysFromTodayFormatted}
        locale={CUSTOM_LOCALE}
        pastYearRange={0}
        futureYearRange={1}
        isMonthFirst={true}
        style={{
          monthContainer: {
            justifyContent: 'center',
            alignItems: 'center',
          },
          monthNameText: {
            fontFamily: CONSTANT.customFonts.heading1,
            fontSize: CONSTANT.fontSizes.heading2,
            color: CONSTANT.themeColors.font,
          },
          dayNameText: {
            fontFamily: CONSTANT.customFonts.heading2,
            fontSize: CONSTANT.fontSizes.body,
            color: CONSTANT.themeColors.font,
          },
          selectedDayBackgroundColor: CONSTANT.themeColors.font,
          selectedBetweenDayBackgroundTextColor:
            CONSTANT.themeColors.complementary,
          dayTextColor: CONSTANT.themeColors.font,
          todayColor: CONSTANT.themeColors.complementary,
          selectedDayTextColor: CONSTANT.themeColors.base,
        }}
        onChange={date => console.log(date)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  calendarContainer: {
    height: hp('70%'),
    // paddingBottom: 24,
  },
});

export default CalendarComponent;
