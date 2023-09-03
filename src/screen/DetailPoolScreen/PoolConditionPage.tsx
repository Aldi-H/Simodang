import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { CONSTANT } from '../../themes';

import DisplayTextComponent from '../../components/text/DisplayTextComponent';

const PoolConditionPage = () => {
  return (
    <View className="my-1">
      {/* Page Title Section */}
      <View>
        <Text style={styles.poolConditionTitle}>Informasi Kolam</Text>
      </View>

      <View className="mb-2">
        <DisplayTextComponent DisplayTitle="Kode Alat" DisplayValue="A-23CD" />
        <DisplayTextComponent
          DisplayTitle="Tanggal Masuk Benih"
          DisplayValue="12 Agustus 2023"
        />
        <DisplayTextComponent
          DisplayTitle="Status Tambak"
          DisplayValue="Kosong"
        />
      </View>

      {/* Pool Threshold Parameter Section */}
      <View>
        <Text style={styles.poolConditionTitle}>Threshold Parameter</Text>
      </View>

      <View className="mb-4">
        <DisplayTextComponent DisplayTitle="Suhu" DisplayValue="29&#176;C" />
        <DisplayTextComponent DisplayTitle="pH" DisplayValue="8.3" />
        <DisplayTextComponent DisplayTitle="TDO" DisplayValue="1.1 mg/L" />
        <DisplayTextComponent DisplayTitle="TDS" DisplayValue="6 ppm" />
        <DisplayTextComponent
          DisplayTitle="Turbiditas"
          DisplayValue="0.25 NTU"
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
