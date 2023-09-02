import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CONSTANT } from '../../themes';

type DisplayTextProps = {
  DisplayTitle: string;
  DisplayValue: any;
};

const DisplayTextComponent = ({
  DisplayTitle,
  DisplayValue,
}: DisplayTextProps) => {
  return (
    <View className="my-1.5">
      <View>
        <Text style={styles.displayTitleStyle}>{DisplayTitle}</Text>
      </View>
      <View
        style={styles.displayValueContainer}
        className="justify-center rounded mt-1.5">
        <Text style={styles.displayValueStyle} className="ml-3">
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
  displayValueStyle: {
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
