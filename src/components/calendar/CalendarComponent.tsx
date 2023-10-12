import React from 'react';
import { View, StyleSheet } from 'react-native';
import Calendar from 'react-native-calendar-range-picker';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { CUSTOM_LOCALE } from '../../utils/calendarLocale/CustomLocal';
import { CONSTANT } from '../../themes';

type CalendarComponentProps = {
  getStartDate?: string;
  getEndDate?: string;
  onChange?: (startDate: string, endDate: string) => void;
};

const CalendarComponent = ({
  getStartDate,
  getEndDate,
  onChange,
}: CalendarComponentProps) => {
  return (
    <View style={styles.calendarContainer}>
      <Calendar
        // startDate={sevenDaysFromTodayFormatted}
        // endDate={todayFormatted}
        startDate={getStartDate}
        endDate={getEndDate}
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
        onChange={({ startDate, endDate }) =>
          onChange && onChange(startDate, endDate)
        }
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
