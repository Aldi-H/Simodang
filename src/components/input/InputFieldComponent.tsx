import React from 'react';
import { StyleSheet, TextInput, Text, View } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { CONSTANT } from '../../themes';

type InputFieldProps = {
  inputTitle: string;
  defaultValue?: string;
  placeholder?: string;
};

const InputFieldComponent = ({
  inputTitle,
  defaultValue,
  placeholder,
}: InputFieldProps) => {
  return (
    <View className="my-2">
      <View>
        <Text style={styles.textInputTitleStyle}>{inputTitle}</Text>
      </View>
      <View style={styles.inputContainer} className="rounded-md w-fit mt-1.5">
        <TextInput
          style={styles.textInputStyle}
          className="w-fit pl-4"
          placeholder={placeholder}
          defaultValue={defaultValue}
        />
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
    height: hp('7%'),
    width: wp('80%'),
  },
  textInputStyle: {
    fontFamily: CONSTANT.customFonts.heading2,
    fontSize: CONSTANT.fontSizes.body,
    color: CONSTANT.themeColors.font,
  },
});

export default InputFieldComponent;
