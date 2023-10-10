import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import { CONSTANT } from '../../themes';

import WarningIcon from '../../assets/icons/WarningIcon.svg';

const NotificationCardComponent = () => {
  return (
    <View className="flex flex-row space-x-2 mr-5 mb-5">
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
          Kolam Yukino Pond2 berada dalam kondisi tidak baik
        </Text>
        <Text
          style={styles.messageNotificationText}
          numberOfLines={2}
          className="text-ellipsis">
          Parameter yang terdampak temperature, ph, tdo, tds, turbidities
        </Text>
      </View>
    </View>
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
