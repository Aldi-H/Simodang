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
import { ScrollView } from 'react-native-gesture-handler';
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
      showsVerticalScrollIndicator={false}
      style={styles.homePage}
      className="flex-1 relative">
      <StatusBar />

      {/* Header Section */}
      <View
        style={styles.headerContainer}
        className="w-full rounded-b-3xl fixed">
        <View className="my-10 mx-4 px-3">
          <SearchComponent />
        </View>
      </View>

      <SafeAreaView className="m-4 my-5 px-3 items-center">
        {/* Pool List Section */}
        <View>
          <View className="flex flex-row justify-between items-center">
            <View className="flex-row justify-center items-center space-x-1">
              <Text style={styles.myPool}>Kolam Saya</Text>
              <Text style={styles.separator}>●</Text>
              {/* Change this later */}
              <Text style={styles.count}>Count</Text>
            </View>
            <View>
              <Text style={styles.count}>Ubah</Text>
            </View>
          </View>

          <View className="mt-3">
            <FlatList
              data={Data}
              renderItem={({ item }) => (
                <PoolCardComponent
                  poolNameProps={item.name}
                  poolLocationProps={item.location}
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
