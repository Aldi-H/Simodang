import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { CONSTANT } from '../../themes';
import InputSpinner from 'react-native-input-spinner';

type ThresholdFieldProps = {
  thresholdUnit?: React.ReactElement;
  type?: string;
  max?: number;
  value: string | number;
  onChange?: (value: string | number) => void;
};

const InputSpinnerComponent = ({
  thresholdUnit,
  type,
  max,
  value,
  onChange,
}: ThresholdFieldProps) => {
  return (
    <View className="mx-px">
      <InputSpinner
        onChange={(num: string | number) => onChange && onChange(num)}
        value={value}
        type={type}
        max={max}
        height={hp('3.5%')}
        width={wp('33%')}
        buttonFontSize={CONSTANT.fontSizes.heading1}
        buttonFontFamily={CONSTANT.customFonts.body}
        buttonTextColor={CONSTANT.themeColors.complementary}
        buttonStyle={{ backgroundColor: CONSTANT.themeColors.primary }}
        textColor={CONSTANT.themeColors.font}
        fontFamily={CONSTANT.customFonts.body}
        fontSize={CONSTANT.fontSizes.heading2}
        inputStyle={styles.inputContainer}
        append={thresholdUnit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    height: hp('3%'),
    paddingVertical: 0,
    marginHorizontal: 5,
    borderRadius: 2,
    backgroundColor: CONSTANT.themeColors.base,
  },
});

export default InputSpinnerComponent;
