import React from 'react';
import { Pressable, View, Text, ViewStyle, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

import { CONSTANT } from '../../themes';

type ButtonIconProps = {
  buttonText?: string;
  onPress?: () => void;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  style?: ViewStyle;
};

const ButtonIconComponent = ({
  buttonText,
  onPress,
  leftIcon,
  rightIcon,
  style,
}: ButtonIconProps) => {
  return (
    <Pressable
      style={[styles.container, style]}
      className="my-1.5 rounded-md"
      onPress={onPress}>
      <View className="flex-row items-center justify-between m-1">
        <View className="flex-row items-center space-x-1">
          {leftIcon}
          <View className="justify-center rounded">
            <Text style={styles.buttonText}>{buttonText}</Text>
          </View>
        </View>
        {rightIcon}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp('80%'),
  },
  iconSeparator: {
    borderRightWidth: 1,
    borderRightColor: CONSTANT.themeColors.disable,
  },
  buttonText: {
    fontFamily: CONSTANT.customFonts.body,
    fontSize: CONSTANT.fontSizes.body,
    color: CONSTANT.themeColors.font,
  },
});

export default ButtonIconComponent;
