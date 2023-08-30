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

      <View>
        <DisplayTextComponent />
      </View>

      {/* Pool Threshold Parameter Section */}
      <View>
        <Text style={styles.poolConditionTitle}>Threshold Parameter</Text>
      </View>

      <View>
        <DisplayTextComponent />
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
