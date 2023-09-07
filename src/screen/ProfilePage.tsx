import React from 'react';
import { Text, View, StyleSheet, Image, SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { CONSTANT } from '../themes';

import IconNext from '../assets/icons/BackIcon.svg';
import UserIconOutline from '../assets/icons/UserIconOutline.svg';
import NotifIconOutline from '../assets/icons/NotifIconOutline.svg';
import HistoryIconOutline from '../assets/icons/HistoryIconOutline.svg';
import HelpIconOutline from '../assets/icons/HelpIconOutline.svg';

import ButtonIconComponent from '../components/button/ButtonIconComponent';

const ProfilePage = () => {
  const profileButtonData = [
    {
      id: 1,
      buttonTitle: 'Pengaturan Profil',
      leftIcon: (
        <View
          className="my-1 mx-2 items-center justify-center"
          style={{ height: hp('5%'), width: wp('6%') }}>
          <UserIconOutline fill={CONSTANT.themeColors.font} />
        </View>
      ),
      rightIcon: (
        <View className="my-1 mx-2 rotate-180 justify-center items-center">
          <IconNext fill={CONSTANT.themeColors.font} />
        </View>
      ),
    },
    {
      id: 2,
      buttonTitle: 'Notifikasi',
      leftIcon: (
        <View
          className="my-1 mx-2 items-center justify-center"
          style={{ height: hp('5%'), width: wp('6%') }}>
          <NotifIconOutline fill={CONSTANT.themeColors.font} />
        </View>
      ),
      rightIcon: (
        <View className="my-1 mx-2 rotate-180 justify-center items-center">
          <IconNext fill={CONSTANT.themeColors.font} />
        </View>
      ),
    },
    {
      id: 3,
      buttonTitle: 'Riwayat Aktivitas',
      leftIcon: (
        <View
          className="my-1 mx-2 items-center justify-center"
          style={{ height: hp('5%'), width: wp('6%') }}>
          <HistoryIconOutline fill={CONSTANT.themeColors.font} />
        </View>
      ),
      rightIcon: (
        <View className="my-1 mx-2 rotate-180 justify-center items-center">
          <IconNext fill={CONSTANT.themeColors.font} />
        </View>
      ),
    },
    {
      id: 4,
      buttonTitle: 'Bantuan',
      leftIcon: (
        <View
          className="my-1 mx-2 items-center justify-center"
          style={{ height: hp('5%'), width: wp('6%') }}>
          <HelpIconOutline fill={CONSTANT.themeColors.font} />
        </View>
      ),
      rightIcon: (
        <View className="my-1 mx-2 rotate-180 justify-center items-center">
          <IconNext fill={CONSTANT.themeColors.font} />
        </View>
      ),
    },
  ];

  return (
    <ScrollView style={styles.profilePage}>
      {/* Header Title */}
      <SafeAreaView className="m-4 my-5 px-3 items-center">
        <View className="mt-4 items-center">
          <Text style={styles.profilePageHeader}>Profile Page</Text>
        </View>

        {/* Photo Section */}
        <View className="mt-10 items-center justify-center">
          <Image
            className="rounded-full"
            style={styles.tinyLogo}
            source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
          />
          <View className="mt-5 items-center space-y-1">
            <Text style={styles.username}>Username</Text>
            <Text
              numberOfLines={2}
              style={styles.address}
              className="text-ellipsis">
              Address
            </Text>
          </View>
        </View>

        {/* Action Button Section */}
        <View className="mt-6">
          {profileButtonData.map(item => {
            return (
              <View key={item.id}>
                <ButtonIconComponent
                  style={styles.buttonNavigationProfile}
                  buttonText={item.buttonTitle}
                  leftIcon={item.leftIcon}
                  rightIcon={item.rightIcon}
                  onPress={() => console.log(item.buttonTitle)}
                />
              </View>
            );
          })}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  profilePage: {
    backgroundColor: CONSTANT.themeColors.base,
  },
  profilePageHeader: {
    fontFamily: CONSTANT.customFonts.heading1,
    fontSize: CONSTANT.fontSizes.heading1,
    color: CONSTANT.themeColors.font,
  },
  tinyLogo: {
    width: wp('30%'),
    height: hp('15%'),
  },
  username: {
    fontFamily: CONSTANT.customFonts.heading2,
    fontSize: CONSTANT.fontSizes.heading2,
    color: CONSTANT.themeColors.font,
  },
  address: {
    fontFamily: CONSTANT.customFonts.body,
    fontSize: CONSTANT.fontSizes.body,
    color: CONSTANT.themeColors.font,
  },
  buttonNavigationProfile: {
    width: wp('80%'),
    backgroundColor: CONSTANT.themeColors.complementary,
  },
  buttonLeftIconProfile: {
    height: hp('5%'),
    width: wp('5%'),
  },
});

export default ProfilePage;
