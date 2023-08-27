import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView, TouchableHighlight } from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { CONSTANT } from '../../themes';
import FilterIconOutline from '../../assets/icons/FilterIconOutline.svg';
import BackIcon from '../../assets/icons/BackIcon.svg';

const PoolHistoryPage = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} className="my-1">
      {/* Page Title Section */}
      <View>
        <Text style={styles.poolHistoryTitle}>Grafik Kondisi Kolam</Text>
      </View>

      {/* Indicator Filter Section */}
      <View className="flex flex-row justify-between items-center my-3">
        <TouchableHighlight
          style={styles.filterButton}
          className="p-1 rounded-md"
          onPress={() => {
            console.log('Button Pressed');
          }}>
          <View className="flex flex-row items-center space-x-2 pr-2">
            <View className="-mr-1">
              <FilterIconOutline
                height={hp('4%')}
                fill={CONSTANT.themeColors.base}
              />
            </View>
            <Text style={styles.filterText} className="mx-1">
              7 Hari Terakhir
            </Text>
            <View className="-rotate-90">
              <BackIcon
                height={hp('1.5%')}
                width={wp('1.5%')}
                fill={CONSTANT.themeColors.base}
              />
            </View>
          </View>
        </TouchableHighlight>

        <View>
          <Text style={styles.indicatorText}>1 Sept - 7 Sept</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  poolHistoryTitle: {
    fontFamily: CONSTANT.customFonts.heading2,
    fontSize: CONSTANT.fontSizes.heading2,
    color: CONSTANT.themeColors.font,
  },
  filterButton: {
    backgroundColor: CONSTANT.themeColors.primary,
  },
  filterText: {
    fontFamily: CONSTANT.customFonts.body,
    fontSize: CONSTANT.fontSizes.body,
    color: CONSTANT.themeColors.base,
  },
  indicatorText: {
    fontFamily: CONSTANT.customFonts.body,
    fontSize: CONSTANT.fontSizes.body,
    color: CONSTANT.themeColors.font,
  },
});

export default PoolHistoryPage;
