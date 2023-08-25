import React from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  FlatList,
  Text,
} from 'react-native';
import {
  // widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
// import { useNavigation } from '@react-navigation/native';

import { CONSTANT } from '../themes';
import SearchComponent from '../components/search/SearchComponent';
import PoolCardComponent from '../components/cards/PoolCardComponent';

const MonitorPage = () => {
  // const navigation = useNavigation();

  const Data = [
    {
      name: 'Kolam Udang 1',
      location: 'Plososari, Mojokerto',
    },
    {
      name: 'Kolam Udang Petak 1',
      location: 'Lemah Kembar, Probolinggo',
    },
    {
      name: 'Kolam Udang 2',
      location: 'Lemah Kembar, Probolinggo',
    },
    {
      name: 'Kolam Udang 3',
      location: 'Lemah Kembar, Probolinggo',
    },
    {
      name: 'Kolam Udang 4',
      location: 'Lemah Kembar, Probolinggo',
    },
    {
      name: 'Kolam Udang 5',
      location: 'Lemah Kembar, Probolinggo',
    },
    {
      name: 'Kolam Udang 6',
      location: 'Lemah Kembar, Probolinggo',
    },
    {
      name: 'Kolam Udang 7',
      location: 'Lemah Kembar, Probolinggo',
    },
  ];

  return (
    <ScrollView
      nestedScrollEnabled={true}
      style={styles.homePage}
      className="flex-1 relative">
      <StatusBar />
      <View
        style={styles.headerContainer}
        className="w-full absolute rounded-b-3xl "
      />
      <SafeAreaView className="mx-4 px-3 mb-4 items-center">
        {/* Header Section */}
        <View className="my-10">
          <SearchComponent />
        </View>

        {/* Pool List Section */}
        <View>
          <View className="flex flex-row justify-between items-center">
            <View className="flex-row justify-center items-center space-x-1">
              <Text style={styles.myPool}>Kolam Saya</Text>
              <Text style={styles.separator}>●</Text>
              {/* Change this later */}
              <Text style={styles.count}>Count</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.changePool}>Ubah</Text>
            </TouchableOpacity>
          </View>

          <View className="mt-2">
            <FlatList
              data={Data}
              renderItem={({ item }) => (
                <PoolCardComponent
                  poolName={item.name}
                  poolLocation={item.location}
                />
              )}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
            />
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
  headerContainer: {
    backgroundColor: CONSTANT.themeColors.primary,
    height: hp('15%'),
  },
  myPool: {
    fontFamily: CONSTANT.customFonts.heading2,
    fontSize: CONSTANT.fontSizes.heading2,
    color: CONSTANT.themeColors.font,
  },
  separator: {
    color: CONSTANT.themeColors.font,
    fontSize: hp('1%'),
  },
  count: {
    fontFamily: CONSTANT.customFonts.caption,
    fontSize: CONSTANT.fontSizes.heading2,
    color: CONSTANT.themeColors.font,
  },
  changePool: {
    fontFamily: CONSTANT.customFonts.caption,
    fontSize: CONSTANT.fontSizes.body,
    color: CONSTANT.themeColors.font,
  },
});

export default MonitorPage;
