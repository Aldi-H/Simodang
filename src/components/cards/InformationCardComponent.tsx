import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import usePondStore from '../../store/pond/PondStore';

import { CONSTANT } from '../../themes';
import WaterIcon from '../../assets/icons/WaterIcon.svg';
import ShrimpSeedIcon from '../../assets/icons/ShrimpSeedIcon.svg';
import AlerIcon from '../../assets/icons/AlertIcon.svg';

const InformationCardComponent = () => {
  const { totalPonds, totalSeedCount, totalPondStatus } = usePondStore();

  const icons = [
    {
      icon: (
        <WaterIcon
          fill={CONSTANT.themeColors.font}
          height={hp('7%')}
          width={wp('7%')}
        />
      ),
      quantity: totalPonds,
      name: 'Kolam',
    },
    {
      icon: (
        <ShrimpSeedIcon
          fill={CONSTANT.themeColors.font}
          height={hp('6.5%')}
          width={wp('6.5%')}
        />
      ),
      quantity: totalSeedCount,
      name: 'Benih Udang',
    },
    {
      icon: (
        <AlerIcon
          stroke={CONSTANT.themeColors.font}
          height={hp('7%')}
          width={wp('7%')}
        />
      ),
      quantity: totalPondStatus,
      name: 'Peringatan',
    },
  ];

  return (
    <View
      // style={styles.container}
      className="rounded-xl flex-row justify-center items-end gap-5 -mt-8 ">
      {icons.map((item, index) => {
        return (
          <View key={index} className="items-center">
            <View>{item.icon}</View>
            {/* Chnage this item quantity later */}
            <Text style={styles.quantityStyle} className="-mt-1.5">
              {item.quantity}
            </Text>
            <Text style={styles.nameStyle} className="-mt-0.5">
              {item.name}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: CONSTANT.themeColors.base,
    height: hp('15%'),
  },
  quantityStyle: {
    fontSize: CONSTANT.fontSizes.heading2,
    fontFamily: CONSTANT.customFonts.heading2,
    color: CONSTANT.themeColors.font,
  },
  nameStyle: {
    fontSize: CONSTANT.fontSizes.body,
    fontFamily: CONSTANT.customFonts.body,
    color: CONSTANT.themeColors.font,
  },
});

export default InformationCardComponent;
