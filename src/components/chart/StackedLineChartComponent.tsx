import React, { useState, useRef, useEffect } from 'react';
import {
  Dimensions,
  View,
  StyleSheet,
  PanResponder,
  ColorValue,
} from 'react-native';
import * as shape from 'd3-shape';
import { LineChart, YAxis } from 'react-native-svg-charts';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { Circle, G, Line, Path, Rect, Text as SvgText } from 'react-native-svg';

import { CONSTANT } from '../../themes';

type ChartData = {
  SensorData?: number[];
  SensorDateData?: string[];
  SensorDataValue?: string;
  Stroke?: ColorValue | undefined;
  Fill?: ColorValue | undefined;
};

const apx = (size: number = 0) => {
  let width = Dimensions.get('window').width;
  return (width / 750) * size;
};

const StackedLineChartComponent = ({
  SensorData,
  SensorDateData,
  SensorDataValue,
  Stroke,
  Fill,
}: ChartData) => {
  const [positionX, setPositionX] = useState(-1);

  const size = useRef(SensorDateData?.length ?? 0);

  useEffect(() => {
    size.current = SensorDateData?.length ?? 0;
  }, [SensorDateData]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderTerminationRequest: () => true,

      onPanResponderGrant: evt => {
        updatePosition(evt.nativeEvent.locationX);
        return true;
      },

      onPanResponderMove: evt => {
        updatePosition(evt.nativeEvent.locationX);
        return true;
      },

      onPanResponderRelease: () => {
        setPositionX(-1);
      },
    }),
  );

  const updatePosition = (x: number) => {
    // const yAxisWidth = wp('2%');
    // const x0 = wp('0%');
    // const chartWidth = wp('1%') - yAxisWidth - x0;
    // const xN = x0 + chartWidth;
    // // const xDistance = chartWidth / (size.current ?? 1);
    // const xDistance = chartWidth / size.current;

    const yAxisWidth = apx(130);
    const x0 = apx(0);
    const chartWidth = apx(750) - yAxisWidth - x0;
    const xN = x0 + chartWidth;
    // const xDistance = chartWidth / (size.current ?? 1);
    const xDistance = chartWidth / size.current;

    if (x <= x0) {
      x = x0;
    }

    if (x >= xN) {
      x = xN;
    }

    // let value = Math.round((x - x0) / xDistance);
    // if (value >= ((size.current ?? 1) - 1 || 0)) {
    //   value = (size.current ?? 1) - 1 || 0;
    // }

    let value = Math.round((x - x0) / xDistance);
    if (value >= size.current - 1) {
      value = size.current - 1;
    }

    setPositionX(Number(value));
  };

  const CustomLine = ({ line }: any) => {
    return (
      <Path
        key="line"
        d={line}
        //! Change this later
        stroke={Stroke}
        strokeWidth={apx(4)}
        fill="none"
      />
    );
  };

  const ToolTip = ({ x, y }: any) => {
    if (positionX < 0) {
      return null;
    }

    const sensorData = SensorData?.[positionX];
    const sensorDateData = SensorDateData?.[positionX];

    return (
      <G x={x(positionX)} key="tooltip">
        <G
          // x={positionX > dateData.length / 2 ? -wp('28%') : wp('3%')}
          x={
            positionX > (SensorDateData?.length ?? 0) / 3
              ? -wp('28%')
              : wp('3%')
          }
          y={y(sensorData)}
          // y={y(ppm) - wp('2%')}\
        >
          <Rect
            y={-wp('9%') / 2}
            ry={wp('1')}
            width={wp('25%')}
            height={wp('11%')}
            //! Change this later
            stroke={Stroke}
            fill={CONSTANT.themeColors.base}
          />

          <SvgText
            x={wp('3%')}
            fontSize={CONSTANT.fontSizes.caption}
            fontFamily={CONSTANT.customFonts.heading2}
            //! Change this later
            fill={Fill}>
            {sensorData} {SensorDataValue}
          </SvgText>
          <SvgText
            x={wp('3%')}
            y={wp('4%')}
            opacity={0.65}
            fontSize={CONSTANT.fontSizes.caption}
            fontFamily={CONSTANT.customFonts.body}
            //! Change this later
            fill={Fill}>
            {sensorDateData}
          </SvgText>
        </G>

        <G x={x}>
          <Line
            // y1={ticks[0]}
            // y2={ticks[Number(ticks.length)]}
            //! Change this later
            stroke={Stroke}
            strokeWidth={wp('0.5%')}
            strokeDasharray={[6, 3]}
          />

          <Circle
            cy={y(sensorData)}
            r={wp('1%')}
            stroke={CONSTANT.themeColors.base}
            strokeWidth={wp('0.5%')}
            fill={Fill}
          />
        </G>
      </G>
    );
  };

  const verticalContentInset = {
    top: wp('5%'),
    bottom: wp('10%'),
  };

  return (
    <View className="mt-5">
      <View style={styles.container} className="flex-row">
        <YAxis
          data={SensorData || []}
          contentInset={{ ...verticalContentInset }}
          svg={{
            fill: CONSTANT.themeColors.font,
            fontSize: CONSTANT.fontSizes.caption,
            fontFamily: CONSTANT.customFonts.body,
          }}
          numberOfTicks={5}
        />
        <View style={styles.flexContainer} className="pl-2 flex-1">
          <View
            style={styles.chartContainer}
            {...panResponder.current.panHandlers}>
            <LineChart
              style={styles.areaChart}
              data={SensorData || []}
              curve={shape.curveMonotoneX}
              contentInset={{ ...verticalContentInset }}
              svg={{ stroke: CONSTANT.themeColors.tubidityIndicator }}
              numberOfTicks={5}>
              <CustomLine />
              <ToolTip />
            </LineChart>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: CONSTANT.themeColors.base,
    alignItems: 'stretch',
  },
  flexContainer: {
    height: hp('28%'),
  },
  chartContainer: {
    height: hp('28%'),
    borderColor: CONSTANT.themeColors.font,
  },
  areaChart: {
    flex: 1,
  },
  xAxisContainer: {
    alignSelf: 'stretch',
    width: wp('105%'),
  },
});

export default StackedLineChartComponent;
