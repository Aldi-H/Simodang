import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { CONSTANT } from '../../themes';

import ThresholdFieldComponent from '../../components/Field/ThresholdFieldComponent';
import ButtonComponent from '../../components/button/ButtonComponent';

const PoolSettingPage = () => {
  return (
    <View className="my-1">
      {/* Page Title Section */}
      <View>
        <Text style={styles.poolSettingTitle}>Atur Threshold Parameter</Text>
      </View>

      {/* Threshold Parameter Setup Section */}
      <View className="mb-2">
        <ThresholdFieldComponent
          thresholdTitle="Suhu"
          thresholdUnit="&#176;C"
          thresholdUnitContainer="pl-0.5"
          width={{ width: wp('15%') }}
        />
        <ThresholdFieldComponent
          thresholdTitle="pH"
          width={{ width: wp('19.5%') }}
        />
        <ThresholdFieldComponent
          thresholdTitle="TDO"
          thresholdUnit="mg/L"
          thresholdUnitContainer="pl-0.5"
          width={{ width: wp('10%') }}
        />
        <ThresholdFieldComponent
          thresholdTitle="TDS"
          thresholdUnit="ppm"
          thresholdUnitContainer="pl-0.5"
          width={{ width: wp('11%') }}
        />
        <ThresholdFieldComponent
          thresholdTitle="Turbiditas"
          thresholdUnit="NTU"
          thresholdUnitContainer="pl-1"
          width={{ width: wp('11.5%') }}
        />
      </View>

      {/* Button Section */}
      <View className="my-10">
        <ButtonComponent
          buttonText="Simpan Perubahan"
          style={styles.saveButton}
          className="rounded-md w-fit px-3 py-1.5 text-center align-middle"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  poolSettingTitle: {
    fontFamily: CONSTANT.customFonts.heading2,
    fontSize: CONSTANT.fontSizes.heading2,
    color: CONSTANT.themeColors.font,
  },
  saveButton: {
    backgroundColor: CONSTANT.themeColors.primary,
    fontFamily: CONSTANT.customFonts.body,
    fontSize: CONSTANT.fontSizes.body,
    color: CONSTANT.themeColors.base,
    height: hp('6.5%'),
  },
  widthInputContainer: {
    width: wp('15%'),
  },
});

export default PoolSettingPage;
