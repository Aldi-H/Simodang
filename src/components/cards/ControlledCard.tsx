import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { CONSTANT } from '../../themes';

type ControlledCardProps = {
  title: string;
  thumbColor: string;
  onValueChange: () => void;
  value: boolean;
};

const ControlledCard = ({
  title,
  thumbColor,
  value,
  onValueChange,
}: ControlledCardProps) => {
  return (
    <View
      className="flex flex-col mr-4 p-2 justify-between rounded shadow-md drop-shadow-sm shadow-gray-600"
      style={styles.cardContainer}>
      <View>
        <Text style={styles.cardTitle}>{title}</Text>
      </View>
      <View>
        <Switch
          trackColor={{
            false: CONSTANT.themeColors.disable,
            true: CONSTANT.themeColors.complementary,
          }}
          thumbColor={thumbColor}
          ios_backgroundColor="#3e3e3e"
          onValueChange={onValueChange}
          value={value}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: wp('30%'),
    height: hp('10%'),
    backgroundColor: CONSTANT.themeColors.base,
  },
  cardTitle: {
    fontFamily: CONSTANT.customFonts.heading2,
    fontSize: CONSTANT.fontSizes.body,
    color: CONSTANT.themeColors.font,
  },
});

export default ControlledCard;
