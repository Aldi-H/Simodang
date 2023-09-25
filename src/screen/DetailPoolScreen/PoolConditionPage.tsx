import React, { useState } from 'react';
import moment from 'moment';
import { StyleSheet, View, Text, Switch } from 'react-native';

import usePondStore from '../../store/pond/PondStore';

import { CONSTANT } from '../../themes';

import DisplayTextComponent from '../../components/text/DisplayTextComponent';

const PoolConditionPage = () => {
  const { pondDetail } = usePondStore();

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View className="my-1">
      {/* Page Title Section */}
      <View>
        <Text style={styles.poolConditionTitle}>Informasi Kolam</Text>
      </View>

      <View className="mb-2">
        <DisplayTextComponent
          DisplayTitle="Kode Alat"
          DisplayValue={pondDetail.device.DeviceName}
          TextStyle="ml-3"
        />
        <DisplayTextComponent
          DisplayTitle="Tanggal Masuk Benih"
          DisplayValue={moment(pondDetail.seedDate)
            .utcOffset('+0700')
            .format('D MMMM YYYY')}
          TextStyle="ml-3"
        />
        <DisplayTextComponent
          DisplayTitle="Status Tambak"
          DisplayValue={pondDetail.isFilled ? 'Terisi' : 'Kosong'}
          TextStyle="ml-3"
        />
      </View>

      {/* Pool Measurement Section */}
      <View className="flex flex-row mt-2 justify-between items-center">
        <Text style={styles.poolConditionTitle}>Pengukuran Saat Ini</Text>
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

      <View className="mb-4">
        <DisplayTextComponent
          DisplayTitle="Suhu"
          DisplayValue="29&#176;C"
          TextStyle="ml-3"
        />
        <DisplayTextComponent
          DisplayTitle="pH"
          DisplayValue="8.3"
          TextStyle="ml-3"
        />
        <DisplayTextComponent
          DisplayTitle="TDO"
          DisplayValue="1.1 mg/L"
          TextStyle="ml-3"
        />
        <DisplayTextComponent
          DisplayTitle="TDS"
          DisplayValue="6 ppm"
          TextStyle="ml-3"
        />
        <DisplayTextComponent
          DisplayTitle="Turbiditas"
          DisplayValue="0.25 NTU"
          TextStyle="ml-3"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  poolConditionTitle: {
    fontFamily: CONSTANT.customFonts.heading2,
    fontSize: CONSTANT.fontSizes.heading2,
    color: CONSTANT.themeColors.font,
  },
});

export default PoolConditionPage;
