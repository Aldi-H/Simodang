import React from 'react';
import { Text, View, StyleSheet, StatusBar, SafeAreaView } from 'react-native';
import { CONSTANT } from '../themes';
import {
  // widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import InformationCardComponent from '../components/cards/InformationCardComponent';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { ChevronRightIcon } from 'react-native-heroicons/solid';

import PoolCardComponent from '../components/cards/PoolCardComponent';
import NotifIconSvg from '../assets/icons/NotifIcon.svg';
import WebViewCardComponent from '../components/cards/WebViewCardComponent';

const HomePage = () => {
  const navigation = useNavigation();

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.homePage}
      className="flex-1 relative">
      <StatusBar />
      <View
        style={styles.headerContainer}
        className="w-full absolute rounded-b-3xl "
      />
      <SafeAreaView className="mx-8 mb-4">
        <View className="justify-self-center">
          <View className="flex-row mt-7 mx-0 gap-x-4 ">
            <View className="flex-col">
              <Text style={styles.heading}>Hai, Name!</Text>
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

        {/* Pool List Section */}
        <View className="mt-7">
          <View className="flex flex-row justify-between items-center">
            <Text style={styles.myPool}>Kolam Saya</Text>
            <TouchableOpacity
              className="flex-row items-center"
              onPress={() => {
                navigation.navigate('Monitor');
              }}>
              <Text style={styles.showAll}>Lihat Semua</Text>
              <ChevronRightIcon
                size={CONSTANT.fontSizes.body}
                color={CONSTANT.themeColors.font}
                fill="black"
              />
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mt-2">
            <View className="flex flex-row mr-4">
              <PoolCardComponent poolName={'Kolam Udang Petak 1'} />
              <PoolCardComponent poolName={'Kolam Udang Bersama'} />
              <PoolCardComponent poolName={'Kolam Udang 1'} />
            </View>
          </ScrollView>
        </View>

        {/* News Section */}
        <View className="mt-4">
          <View>
            <Text style={styles.informationForYou}>Informasi untuk Anda</Text>
          </View>
          <View className="mt-2">
            <WebViewCardComponent />
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  homePage: {
    backgroundColor: CONSTANT.themeColors.base,
  },
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
    fontSize: CONSTANT.fontSizes.heading1,
    color: CONSTANT.themeColors.base,
  },
  caption: {
    fontFamily: CONSTANT.customFonts.caption,
    fontSize: CONSTANT.fontSizes.body,
    color: CONSTANT.themeColors.base,
  },
  myPool: {
    fontFamily: CONSTANT.customFonts.heading2,
    fontSize: CONSTANT.fontSizes.heading2,
    color: CONSTANT.themeColors.font,
  },
  showAll: {
    fontFamily: CONSTANT.customFonts.caption,
    fontSize: CONSTANT.fontSizes.body,
    color: CONSTANT.themeColors.font,
  },
  informationForYou: {
    fontFamily: CONSTANT.customFonts.heading2,
    fontSize: CONSTANT.fontSizes.heading2,
    color: CONSTANT.themeColors.font,
  },
});

export default HomePage;
