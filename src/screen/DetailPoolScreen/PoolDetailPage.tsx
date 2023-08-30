import React, { useState } from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  StyleSheet,
  FlatList,
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
    <ScrollView showsVerticalScrollIndicator={false}>
      <StatusBar />

      {/* Header Section */}
      <View>
        {/* Change this image later */}
        <View>
          <Image
            source={{
              uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIIAAABfCAYAAAAkox8MAAAAAXNSR0IArs4c6QAABH5JREFUeF7tmElP8zAQhs0mChKLBAXEcgBO/P+/wZ0T5cIiVrFICBDLp4nkfK5JUtNppXT85NbWnWTe9/F4JlPHx8c/jit7BaYAIXsGCgEAAQ4AAQb+K0BFgAYqAgxQEWAgUoCjASQ4GmCAowEGOBpgoEoBegS4oEeAAXoEGKBHgAF6BBioVYBmEThoFmGAZhEGaBZhgGYRBmgWYaBZAaYGCGFqgAGmBhhgaoABpgYYYGqAAaYGGEhQgPExQaQclgBCDi4n5AgICSLlsAQQcnA5IUdASBAphyWAkIPLCTkCQoJIOSwBhBxcTsgREBJEymEJIOTgckKOgJAgUg5LWgvC4uKiOzg4cI+Pj+78/LzPi93dXbe5uVl+J2tOT08b11xfX/+KMwqDDw8P3erqahHq+/vbXVxcuJubmzL0xsaG29nZcdPT0323G9fzDJtTa0E4OjpyAkMsmBf29va2MNZ/fn5+LmEQULrdbmlK/HlYseL/CQTLy8vlfeRZtre33eXlZQmD3Ht9fd2dnZ25p6enUd165HFaB8LKyorb3993MzMzRbIxCAKI/Nbr9dzr62uxRgxZWFgovpNLKsnX15c7OTkpBZP/yRV+p1HTP+fLy0tfNQqfRZ4v/qy55zj/2yoQvLifn5/u/v7ebW1tOb/zm0QI4ZibmytAuru76zsKmnZmeF8PmD+aZmdnK3dz1e6XZ4zvI8/28fHx6+gap6nDxG4VCGEC8RFQl1zVURGXZ29QeFzE8eI4cdmvWj/oPu/v733VzcdoW38gzzWxIIRHiAjud3LTTm0CwR8xS0tLRTWRtWHfEYPQdDT4vkH+I43i29tbeST5RrdtMEwsCKExsnvFQGnI5ufnfzVsKRVB1tTBVVeNpOx3Op2+ZlGMlyueHsIYVX3OMOV8lP8xAUK4O6V5G1Syw/EuFtOPg6k71k83Ekcqk1SRtbW1RhBCcNsySZgDQcr6X5tFD0M488vUMczIl2JyyppR7vaUWBMFgu/k49EwbPQeHh6GGh99bBHt6urK7e3tFTu8btys6hHi56t7fzHqUTbF6EFrJgoEf9bLW0VfukMDfcMYN2QpL5SqXkKF96kSUgyVnsRXjnjSqHq2QdPIIMPG9fvEgRDC4EWRFzfxzo1fQzed+b6ihN29xI6bwToYxHC5qo4TD4MAI1fVa+hxmfuXuK0F4S9JsFavACDoNTQRARBM2KhPAhD0GpqIAAgmbNQnAQh6DU1EAAQTNuqTAAS9hiYiAIIJG/VJAIJeQxMRAMGEjfokAEGvoYkIgGDCRn0SgKDX0EQEQDBhoz4JQNBraCICIJiwUZ8EIOg1NBEBEEzYqE8CEPQamogACCZs1CcBCHoNTUQABBM26pMABL2GJiIAggkb9UkAgl5DExEAwYSN+iQAQa+hiQiAYMJGfRKAoNfQRARAMGGjPglA0GtoIgIgmLBRnwQg6DU0EQEQTNioTwIQ9BqaiAAIJmzUJwEIeg1NRAAEEzbqkwAEvYYmIgCCCRv1SQCCXkMTEQDBhI36JP4BMtagSg3G4XkAAAAASUVORK5CYII=',
            }}
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
  );
};

const styles = StyleSheet.create({
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
