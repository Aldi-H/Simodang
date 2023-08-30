import React from 'react';
import { Dimensions, View, StyleSheet } from 'react-native';
// import { ScrollView } from 'react-native-gesture-handler';
import * as shape from 'd3-shape';
import { LineChart } from 'react-native-svg-charts';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { CONSTANT } from '../../themes';

// import { CONSTANT } from '../../themes';

const apx = (size: number = 0) => {
  let width = Dimensions.get('window').width;
  return (width / 750) * size;
};

const StackedLineChartComponent = () => {
  const suhu = [24, 29, 22, 28, 27, 26, 25, 21, 23, 30, 20, 24, 28, 22, 26];
  const pH = [
    6.7, 7.8, 5.5, 6.2, 7.2, 5.8, 6.9, 7.5, 5.4, 8.0, 6.1, 7.0, 5.7, 7.3, 6.4,
  ];
  const TDO = [
    2.8, 1.5, 3.2, 0.9, 0.3, 2.1, 3.9, 1.2, 0.7, 3.7, 2.4, 0.5, 1.8, 3.5, 2.2,
  ];
  const TDS = [
    873, 1245, 671, 1067, 589, 1322, 734, 925, 1411, 612, 987, 1348, 548, 1176,
    736,
  ];
  const turbiditas = [
    3.2, 1.7, 4.5, 2.1, 0.8, 3.9, 2.6, 1.1, 4.3, 0.6, 2.8, 1.4, 4.8, 3.5, 2.3,
  ];

  // Datasets Array
  /* const sensorData = [
    {
      data: suhu,
      svg: { stroke: 'purple' },
    },
    {
      data: pH,
      svg: { stroke: 'red' },
    },
    {
      data: TDO,
      svg: { stroke: 'blue' },
    },
    {
      data: TDS,
      svg: { stroke: '#6D3BAC' },
    },
    {
      data: turbiditas,
      svg: { stroke: 'green' },
    },
  ]; */

  const verticalContentInset = { top: apx(40), bottom: apx(40) };

  return (
    <View style={styles.chartContainer}>
      <LineChart
        style={styles.areaChart}
        data={TDS}
        curve={shape.curveMonotoneX}
        contentInset={verticalContentInset}
        svg={{ stroke: CONSTANT.themeColors.tubidityIndicator }}
      />
    </View>
  );
};
/* <View className="flex-1">
  <LineChart
    data={suhu}
    curve={shape.curveMonotoneX}
    svg={{
      stroke: CONSTANT.themeColors.tempIndicator,
      strokeWidth: 2,
    }}
    style={{ height: hp('25%') }}
    contentInset={{ top: 20, bottom: 20 }}
  />
</View>
<View className="flex-1">
  <LineChart
    data={pH}
    curve={shape.curveMonotoneX}
    svg={{
      stroke: CONSTANT.themeColors.phIndicator,
      strokeWidth: 2,
    }}
    style={{ height: hp('25%') }}
    contentInset={{ top: 20, bottom: 20 }}
  />
</View>
<View className="flex-1">
  <LineChart
    data={TDO}
    curve={shape.curveMonotoneX}
    svg={{
      stroke: CONSTANT.themeColors.TDOIndicator,
      strokeWidth: 2,
    }}
    style={{ height: hp('25%') }}
    contentInset={{ top: 20, bottom: 20 }}
  />
</View>
<View className="flex-1">
  <LineChart
    data={TDS}
    curve={shape.curveMonotoneX}
    svg={{
      stroke: CONSTANT.themeColors.TDSIndicator,
      strokeWidth: 2,
    }}
    style={{ height: hp('25%') }}
    contentInset={{ top: 20, bottom: 20 }}
  />
</View>
<View className="flex-1">
  <LineChart
    data={turbiditas}
    curve={shape.curveMonotoneX}
    svg={{
      stroke: CONSTANT.themeColors.tubidityIndicator,
      strokeWidth: 2,
    }}
    style={{ height: hp('25%') }}
    contentInset={{ top: 20, bottom: 20 }}
  />
</View> */

/* <View className="mt-2">
    <LineChart
      data={sensorData}
      curve={shape.curveMonotoneX}
      style={{ height: hp('25%') }}
    />
  </View> */

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    alignItems: 'stretch',
  },
  flexContainer: {
    // flexDirection: 'row',
    flex: 1,
    // width: apx(750),
    // height: apx(570),
    height: hp('25%'),
    alignSelf: 'stretch',
    paddingHorizontal: apx(8),
  },
  chartContainer: {
    flex: 1,
    height: hp('25%'), // Adjust the height as needed
  },
  areaChart: {
    flex: 1,
  },
  xAxisContainer: {
    alignSelf: 'stretch',
    width: apx(800),
    height: apx(60),
  },
});

export default StackedLineChartComponent;
