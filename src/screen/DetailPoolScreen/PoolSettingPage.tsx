import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { CONSTANT } from '../../themes';

import ThresholdFieldComponent from '../../components/Field/ThresholdFieldComponent';
import ButtonComponent from '../../components/button/ButtonComponent';

const PoolSettingPage = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View className="my-1">
      {/* Notif Setting Section */}
      <View className="flex flex-row justify-between items-center">
        <Text style={styles.poolSettingTitle}>Atur Notifikasi</Text>
        <Switch
          trackColor={{
            false: CONSTANT.themeColors.disable,
            true: CONSTANT.themeColors.complementary,
          }}
          thumbColor={
            isEnabled ? CONSTANT.themeColors.primary : CONSTANT.themeColors.base
          }
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>

      {/* Threshold Setting Section */}
      <View className="mt-4">
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
      </View>

      {/* Button Section */}
      <View className="my-10">
        <ButtonComponent
          buttonText="Simpan Perubahan"
          style={styles.saveButton}
          className="rounded-md w-fit px-3 py-1.5 text-center align-middle"
          onPress={() => console.log('Button Save Pressed')}
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
