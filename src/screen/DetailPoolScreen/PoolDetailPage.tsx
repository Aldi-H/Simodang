import React, { useState } from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

import { CONSTANT } from '../../themes';

import BackIcon from '../../assets/icons/BackIcon.svg';
import PhIconOutline from '../../assets/icons/pHIconOutline.svg';
import HistoryIconOutline from '../../assets/icons/HistoryIconOutline.svg';
import GearIconOutline from '../../assets/icons/GearIconOutline.svg';

import PoolConditionPage from './PoolConditionPage';
import PoolHistoryPage from './PoolHistoryPage';
import PoolSettingPage from './PoolSettingPage';

const PoolDetailPage = () => {
  const [activeNav, setActiveNav] = useState(1);

  const navigation = useNavigation();

  const NavList = [
    {
      id: 1,
      name: 'Kondisi',
      Icon: PhIconOutline,
    },
    {
      id: 2,
      name: 'Riwayat',
      Icon: HistoryIconOutline,
    },
    {
      id: 3,
      name: 'Pengaturan',
      Icon: GearIconOutline,
    },
  ];

  // nestedScrollEnabled={true} showsVerticalScrollIndicator={false}

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingView}
      behavior={Platform.OS === 'android' ? 'height' : 'padding'}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <StatusBar />

        {/* Header Section */}
        <View>
          {/* Change this image later */}
          <View>
            <Image
              source={require('../../assets/images/ImagePlaceholder.png')}
              style={styles.imageHeader}
              className="w-full"
            />
          </View>
          <View className="mx-4 mt-6 px-3 absolute">
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <BackIcon height={hp('4%')} fill={CONSTANT.themeColors.font} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.container} className="w-full -mt-10 rounded-t-3xl ">
          <View className="mx-4 mt-6 px-3">
            {/* Header Title Section */}
            <View className="mt-1 space-y-2">
              <View className="flex flex-row space-x-2 items-center ">
                <Text
                  style={styles.poolName}
                  numberOfLines={1}
                  className="text-ellipsis">
                  Kolam Udang Petak Bersama
                </Text>
                <View style={styles.separator} className="rounded-full" />
              </View>
              <View>
                <Text
                  style={styles.poolLocation}
                  numberOfLines={2}
                  className="text-ellipsis">
                  Jl. Veteran, Ketawanggede, Lowokwaru, Malang, Jawa Timur
                </Text>
              </View>
            </View>

            {/* Navbar Section */}
            <View className="justify-center items-center my-4">
              <View className="border-t border-gray-300 w-full opacity-20" />
              <FlatList
                data={NavList}
                horizontal
                scrollEnabled={false}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => {
                  let isActive = item.id === activeNav;
                  let activeTextClass = isActive ? 'font-bold ' : '';

                  return (
                    <View>
                      <TouchableOpacity
                        className="px-2"
                        onPress={() => setActiveNav(item.id)}>
                        {item.Icon === GearIconOutline ? (
                          <View className="flex-row justify-center items-center space-x-2">
                            <item.Icon
                              width={wp('6%')}
                              height={hp('5%')}
                              stroke={CONSTANT.themeColors.primary}
                            />
                            <Text
                              style={styles.navTextInactive}
                              className={activeTextClass}>
                              {item.name}
                            </Text>
                          </View>
                        ) : (
                          <View className="flex-row justify-center items-center space-x-2">
                            <item.Icon
                              width={wp('5%')}
                              height={hp('5%')}
                              fill={CONSTANT.themeColors.primary}
                            />
                            <Text
                              style={styles.navTextInactive}
                              className={activeTextClass}>
                              {item.name}
                            </Text>
                          </View>
                        )}
                      </TouchableOpacity>
                      {isActive && (
                        <View
                          style={styles.activeIndocator}
                          className="h-0.5 w-full rounded-full "
                        />
                      )}
                      <View className="border-b border-gray-300 w-full opacity-20" />
                    </View>
                  );
                }}
              />
            </View>

            {/* Page Render */}
            <View>
              {activeNav === 1 && <PoolConditionPage />}
              {activeNav === 2 && <PoolHistoryPage />}
              {activeNav === 3 && <PoolSettingPage />}
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  imageHeader: {
    height: hp('30%'),
  },
  container: {
    backgroundColor: CONSTANT.themeColors.base,
    // height: hp('100%'),
  },
  poolName: {
    fontFamily: CONSTANT.customFonts.heading1,
    fontSize: CONSTANT.fontSizes.heading1,
    color: CONSTANT.themeColors.font,
  },
  separator: {
    backgroundColor: CONSTANT.themeColors.success,
    width: wp('3%'),
    height: hp('1.5%'),
  },
  poolLocation: {
    fontFamily: CONSTANT.customFonts.caption,
    fontSize: CONSTANT.fontSizes.body,
    color: CONSTANT.themeColors.font,
  },
  navTextInactive: {
    fontFamily: CONSTANT.customFonts.caption,
    fontSize: CONSTANT.fontSizes.body,
    color: CONSTANT.themeColors.font,
  },
  activeIndocator: {
    backgroundColor: CONSTANT.themeColors.primary,
  },
});

export default PoolDetailPage;
