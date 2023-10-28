import React from 'react';
import { StyleSheet, TextInput, Text, View, ViewStyle } from 'react-native';
import {
  // widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { CONSTANT } from '../../themes';

type InputFieldProps = {
  inputTitle: string;
  defaultValue?: string | undefined;
  placeholder?: string;
  value?: string | undefined;
  editable?: boolean;
  extededInputStyle?: ViewStyle;
  rightIcon?: React.ReactNode;
  onChangeText?: (text: string) => void;
};

const InputFieldComponent = ({
  inputTitle,
  defaultValue,
  placeholder,
  value,
  editable,
  rightIcon,
  onChangeText,
  extededInputStyle,
}: InputFieldProps) => {
  return (
    <View className="my-2">
      <View>
        <Text style={styles.textInputTitleStyle}>{inputTitle}</Text>
      </View>
      <View
        style={styles.inputContainer}
        className="flex-row items-center rounded-md w-full mt-1.5">
        <TextInput
          style={[styles.textInputStyle, extededInputStyle]}
          className="w-full pl-4"
          placeholder={placeholder}
          defaultValue={defaultValue}
          value={value}
          editable={editable}
          onChangeText={onChangeText}
        />
        <View className="pr-2">{rightIcon}</View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textInputTitleStyle: {
    fontFamily: CONSTANT.customFonts.body,
    fontSize: CONSTANT.fontSizes.body,
    color: CONSTANT.themeColors.disable,
  },
  inputContainer: {
    backgroundColor: CONSTANT.themeColors.complementary,
    height: hp('6%'),
  },
  textInputStyle: {
    fontFamily: CONSTANT.customFonts.heading2,
    fontSize: CONSTANT.fontSizes.body,
    color: CONSTANT.themeColors.font,
  },
});

export default InputFieldComponent;
