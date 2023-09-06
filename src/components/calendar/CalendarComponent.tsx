import React from 'react';
import { View, StyleSheet } from 'react-native';
import Calendar from 'react-native-calendar-range-picker';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const CalendarComponent = () => {
  return (
    <View style={styles.calendarContainer}>
      <Calendar
        startDate="2023-09-06"
        endDate="2023-12-31"
        pastYearRange={0}
        futureYearRange={2}
        isMonthFirst={true}
        onChange={date => console.log(date)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  calendarContainer: {
    height: hp('80%'),
  },
});

export default CalendarComponent;
