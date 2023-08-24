import React from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  FlatList,
} from 'react-native';
import {
  // widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
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
      name: 'Kolam Udang 2',
      location: 'Lemah Kembar, Probolinggo',
    },
    {
      name: 'Kolam Udang 2',
      location: 'Lemah Kembar, Probolinggo',
    },
    {
      name: 'Kolam Udang 2',
      location: 'Lemah Kembar, Probolinggo',
    },
    {
      name: 'Kolam Udang 2',
      location: 'Lemah Kembar, Probolinggo',
    },
    {
      name: 'Kolam Udang 2',
      location: 'Lemah Kembar, Probolinggo',
    },
  ];

  return (
    <SafeAreaView style={styles.homePage} className="flex-1 relative">
      <StatusBar />
      <View
        style={styles.headerContainer}
        className="w-full absolute rounded-b-3xl "
      />
      <View className="mx-8 mb-4">
        {/* Header Section */}
        <View className="my-10">
          <SearchComponent />
        </View>

        {/* Pool List Section */}
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
        />
      </View>
    </SafeAreaView>
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
});

export default MonitorPage;
