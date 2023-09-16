import React from 'react';
import { Text, View, StyleSheet, Image, SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

import { CONSTANT } from '../../themes';

import IconNext from '../../assets/icons/BackIcon.svg';
import UserIconOutline from '../../assets/icons/UserIconOutline.svg';
import NotifIconOutline from '../../assets/icons/NotifIconOutline.svg';
import HistoryIconOutline from '../../assets/icons/HistoryIconOutline.svg';
import HelpIconOutline from '../../assets/icons/HelpIconOutline.svg';

import ButtonIconComponent from '../../components/button/ButtonIconComponent';
import ButtonComponent from '../../components/button/ButtonComponent';
import useAuthStore from '../../store/auth/AuthStore';

const ProfilePage = () => {
  const { SignOut } = useAuthStore();
  const navigation = useNavigation();

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
      screenName: 'ProfileSettingPage',
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
      screenName: '404NotFound',
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
      screenName: '404NotFound',
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
      screenName: '404NotFound',
    },
  ];

  return (
    <ScrollView style={styles.profilePage}>
      <SafeAreaView className="m-4 my-5 px-3 items-center">
        {/* Header Title */}
        <View className="mt-4 items-center">
          <Text style={styles.profileHeaderTitle}>Profile Page</Text>
        </View>

        {/* Photo Section */}
        <View className="mt-10 items-center justify-center">
          <Image
            className="rounded-full"
            style={styles.userProfile}
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
                  // @ts-ignore
                  onPress={() => navigation.navigate(item.screenName)}
                />
              </View>
            );
          })}
        </View>

        {/* Buttoon Section */}
        <View className="mt-12 mb-6">
          <ButtonComponent
            buttonText="Keluar"
            style={styles.logoutButton}
            className="rounded-md h-fit py-1"
            onPress={SignOut}
          />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  profilePage: {
    backgroundColor: CONSTANT.themeColors.base,
  },
  profileHeaderTitle: {
    fontFamily: CONSTANT.customFonts.heading1,
    fontSize: CONSTANT.fontSizes.heading1,
    color: CONSTANT.themeColors.font,
  },
  userProfile: {
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
  logoutButton: {
    fontFamily: CONSTANT.customFonts.heading2,
    fontSize: CONSTANT.fontSizes.heading2,
    color: CONSTANT.themeColors.base,
    backgroundColor: CONSTANT.themeColors.warningRed,
    width: wp('80%'),
  },
});

export default ProfilePage;
