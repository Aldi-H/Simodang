import React from 'react';
import { Text, View, StyleSheet, StatusBar, SafeAreaView } from 'react-native';
import { CONSTANT } from '../themes';
import {
  // widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import InformationCardComponent from '../components/cards/InformationCardComponent';

import NotifIconSvg from '../assets/icons/NotifIcon.svg';

const HomePage = () => {
  return (
    <View className="flex-1 relative">
      <StatusBar />
      <View
        style={styles.headerContainer}
        className="w-full absolute rounded-b-3xl "
      />
      <SafeAreaView>
        <View className="mx-8 justify-self-center">
          <View className="flex-row mt-8 mx-0 gap-x-4 ">
            <View className="flex-col">
              <Text style={styles.heading}>Hai, Name</Text>
              <Text style={styles.caption} className="my-1">
                Bagaimana kondisi rata-rata kolam anda?
              </Text>
            </View>
            <View className="align-middle">
              <NotifIconSvg
                height={hp('4%')}
                width={hp('4%')}
                fill={CONSTANT.themeColors.base}
              />
            </View>
          </View>
          <View
            style={styles.cardInformationContainer}
            className="rounded-xl my-5 justify-center items-center">
            <InformationCardComponent />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: CONSTANT.themeColors.primary,
  },
  headerContainer: {
    backgroundColor: CONSTANT.themeColors.primary,
    height: hp('35%'),
  },
  cardInformationContainer: {
    backgroundColor: CONSTANT.themeColors.base,
    height: hp('15%'),
  },
  heading: {
    fontFamily: CONSTANT.customFonts.heading1,
    color: CONSTANT.themeColors.base,
    fontSize: CONSTANT.fontSizes.heading1,
  },
  caption: {
    fontFamily: CONSTANT.customFonts.caption,
    color: CONSTANT.themeColors.base,
    fontSize: CONSTANT.fontSizes.body,
  },
});

export default HomePage;
