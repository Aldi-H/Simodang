import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { CONSTANT } from '../../themes';

type InputFieldProps = {
  leftIcon: React.ReactNode;
  rightIcon?: React.ReactNode;
  placeholder: string;
  secureTextEntry: boolean;
};

const InputFieldWithIconComponent = ({
  placeholder,
  leftIcon,
  secureTextEntry,
  rightIcon,
}: InputFieldProps) => {
  return (
    <View
      style={[styles.inputContainer]}
      className="flex flex-row items-center border border-gray-300 rounded-full my-2">
      <View className="pl-4">{leftIcon}</View>
      <TextInput
        style={styles.inputTextStyle}
        placeholder={placeholder}
        className="pl-2"
        secureTextEntry={secureTextEntry}
      />
      <View className="pr-4">{rightIcon}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    height: hp('6%'),
    width: wp('75%'),
  },
  inputTextStyle: {
    fontFamily: CONSTANT.customFonts.caption,
    fontSize: CONSTANT.fontSizes.body,
    color: CONSTANT.themeColors.disable,
    width: wp('75%'),
  },
  onFocus: {
    borderColor: CONSTANT.themeColors.complementary,
  },
});

export default InputFieldWithIconComponent;
