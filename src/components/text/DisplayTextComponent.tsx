import React from 'react';
import { StyleSheet, Text, View, StyleProp, ViewStyle } from 'react-native';
import { CONSTANT } from '../../themes';

type DisplayTextProps = {
  DisplayTitle?: string;
  DisplayValue: any;
  ContainerStyle?: StyleProp<ViewStyle>;
  ClassnameContainerStyle?: string;
  TextStyle?: string;
};

const DisplayTextComponent = ({
  DisplayTitle,
  DisplayValue,
  ClassnameContainerStyle,
  ContainerStyle,
  TextStyle,
}: DisplayTextProps) => {
  return (
    <View className="my-1.5">
      <View>
        <Text style={styles.displayTitleStyle}>{DisplayTitle}</Text>
      </View>
      <View
        style={[styles.displayValueContainer, ContainerStyle]}
        className={`justify-center rounded mt-1.5 ${ClassnameContainerStyle}`}>
        <Text
          style={[styles.displayValueText, ContainerStyle]}
          className={TextStyle}>
          {DisplayValue}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  displayTitleStyle: {
    fontFamily: CONSTANT.customFonts.body,
    fontSize: CONSTANT.fontSizes.body,
    color: CONSTANT.themeColors.disable,
  },
  displayValueText: {
    fontFamily: CONSTANT.customFonts.body,
    fontSize: CONSTANT.fontSizes.body,
    color: CONSTANT.themeColors.font,
  },
  displayValueContainer: {
    backgroundColor: CONSTANT.themeColors.complementary,
    height: 36,
  },
});

export default DisplayTextComponent;
