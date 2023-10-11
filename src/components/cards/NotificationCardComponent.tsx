import React from 'react';
import { StyleSheet, View, Text, Pressable, ViewStyle } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import { CONSTANT } from '../../themes';

import WarningIcon from '../../assets/icons/WarningIcon.svg';

type NotificationCardProps = {
  notificationTitle: string;
  notificationMessage: string;
  containerStyle: ViewStyle;
  onPress: () => void;
};

const NotificationCardComponent = ({
  notificationTitle,
  notificationMessage,
  onPress,
  containerStyle,
}: NotificationCardProps) => {
  return (
    <Pressable style={containerStyle} onPress={onPress}>
      <View className="m-4 my-6 px-3">
        <View className="flex flex-row space-x-2 mr-5">
          <View
            style={styles.warningIconContainer2}
            className="rounded-full items-center justify-center">
            <WarningIcon
              width={wp('10%')}
              height={hp('3.5%')}
              fill={CONSTANT.themeColors.primary}
              style={styles.warningIcon}
            />
          </View>

          <View className="px-3">
            <Text
              style={styles.titleNotificationText}
              numberOfLines={2}
              className="text-ellipsis">
              {notificationTitle}
            </Text>
            <Text
              style={styles.messageNotificationText}
              numberOfLines={2}
              className="text-ellipsis">
              {notificationMessage}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  warningIconContainer2: {
    backgroundColor: CONSTANT.themeColors.complementary,
    height: hp('5%'),
    width: wp('10%'),
  },
  warningIcon: {
    marginBottom: 5,
  },
  titleNotificationText: {
    fontFamily: CONSTANT.customFonts.heading1,
    fontSize: CONSTANT.fontSizes.body,
    color: CONSTANT.themeColors.font,
  },
  messageNotificationText: {
    fontFamily: CONSTANT.customFonts.caption,
    fontSize: CONSTANT.fontSizes.body,
    color: CONSTANT.themeColors.primary,
  },
});

export default NotificationCardComponent;
