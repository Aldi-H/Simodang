import React from 'react';
import { Text, View, StyleSheet, ViewStyle } from 'react-native';
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';

import { CONSTANT } from '../../themes';
import InputSpinnerComponent from '../input/InputSpinnerComponent';

type ThresholdFieldProps = {
  thresholdTitle: string;
  thresholdUnit?: string;
  width?: ViewStyle;
  thresholdUnitContainer?: string;
};

const ThresholdFieldComponent = ({
  thresholdTitle,
  thresholdUnit,
  width,
  thresholdUnitContainer,
}: ThresholdFieldProps) => {
  return (
    <View className="my-1">
      {/* Field Title */}
      <View className="my-1 mb-2">
        <Text style={styles.thresholdFieldTitle}>{thresholdTitle}</Text>
      </View>

      {/* Threshold Setup Section */}
      <View
        style={styles.thresholdContainer}
        className="flex flex-row justify-between items-center rounded-md px-3 py-1 space-x-1">
        {/* Lower Threshold */}
        <View>
          <InputSpinnerComponent
            thresholdUnit={thresholdUnit}
            width={width}
            thresholdUnitContainer={thresholdUnitContainer}
          />
        </View>

        {/* Separator */}
        <View>
          <Text style={styles.separator}>&#8722;</Text>
        </View>

        {/* Higher Threshold */}
        <View>
          <InputSpinnerComponent
            thresholdUnit={thresholdUnit}
            width={width}
            thresholdUnitContainer={thresholdUnitContainer}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  thresholdContainer: {
    backgroundColor: CONSTANT.themeColors.complementary,
  },
  thresholdFieldTitle: {
    fontFamily: CONSTANT.customFonts.body,
    fontSize: CONSTANT.fontSizes.body,
    color: CONSTANT.themeColors.disable,
  },
  separator: {
    fontFamily: CONSTANT.customFonts.body,
    fontSize: CONSTANT.fontSizes.heading2,
    color: CONSTANT.themeColors.font,
  },
});

export default ThresholdFieldComponent;
