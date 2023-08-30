import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { CONSTANT } from '../../themes';

type InputFieldProps = {
  placeholder: string;
  icon: React.ReactNode;
};

const InputFieldComponent = ({ placeholder, icon }: InputFieldProps) => {
  return (
    <View
      style={[styles.inputContainer]}
      className="flex flex-row items-center border border-gray-300 rounded-full my-2">
      <View className="pl-4">{icon}</View>
      <TextInput
        style={styles.inputText}
        placeholder={placeholder}
        className="pl-2"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    height: hp('6%'),
    width: wp('70%'),
  },
  inputText: {
    fontFamily: CONSTANT.customFonts.caption,
    fontSize: CONSTANT.fontSizes.body,
    color: CONSTANT.themeColors.disable,
  },
  onFocus: {
    borderColor: CONSTANT.themeColors.complementary,
  },
});

export default InputFieldComponent;
