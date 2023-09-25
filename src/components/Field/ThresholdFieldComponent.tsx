import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { CONSTANT } from '../../themes';

import InputSpinnerComponent from '../input/InputSpinnerComponent';

type ThresholdFieldProps = {
  thresholdTitle: string;
  thresholdUnit?: React.ReactElement;
  type?: string;
  max?: number;
  valueLow: string | number;
  valueHigh: string | number;
};

const ThresholdFieldComponent = ({
  thresholdTitle,
  thresholdUnit,
  type,
  max,
  valueLow,
  valueHigh,
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
            value={valueLow}
            type={type}
            max={max}
            thresholdUnit={thresholdUnit}
          />
        </View>

        {/* Separator */}
        <View>
          <Text style={styles.separator}>&#8722;</Text>
        </View>

        {/* Higher Threshold */}
        <View>
          <InputSpinnerComponent
            value={valueHigh}
            type={type}
            max={max}
            thresholdUnit={thresholdUnit}
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
  appendTextStyle: {
    fontFamily: CONSTANT.customFonts.body,
    fontSize: CONSTANT.fontSizes.caption,
    color: CONSTANT.themeColors.font,
  },
});

export default ThresholdFieldComponent;
