import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, FlatList } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import { ScrollView } from 'react-native-gesture-handler';

import { CONSTANT } from '../../../themes';
import CalendarComponent from '../../../components/calendar/CalendarComponent';
import DisplayTextComponent from '../../../components/text/DisplayTextComponent';

type DrawerScreenProps = {
  CloseDrawer: () => void;
  UpdateDrawer: () => void;
};

const DrawerScreenPage = ({ CloseDrawer, UpdateDrawer }: DrawerScreenProps) => {
  const [activeDuration, setIsActiveDuration] = useState(1);

  const duration = [
    {
      id: 1,
      title: '7 Hari Terakhir',
    },
    {
      id: 2,
      title: '14 Hari Terakhir',
    },
    {
      id: 3,
      title: '30 Hari Terakhir',
    },
    {
      id: 4,
      title: 'Bulan Lalu',
    },
    {
      id: 5,
      title: '90 Hari Terakhir',
    },
  ];

  return (
    <View
      style={[
        styles.drawerContainer,
        {
          height: hp('93%'),
        },
      ]}
      className="absolute bottom-0 py-10 px-6 rounded-t-xl left-0 right-0">
      {/* Drawer Header */}
      <View className="flex flex-row justify-between items-center">
        <Pressable onPress={CloseDrawer}>
          <Text style={styles.actionText}>Batalkan</Text>
        </Pressable>
        <View>
          <Text style={styles.dateRange}>1 Sept - 7 Sept</Text>
        </View>
        <Pressable onPress={UpdateDrawer}>
          <Text style={styles.actionText}>Perbarui</Text>
        </Pressable>
      </View>

      {/* Duration */}
      <View className="flex flex-row">
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={duration}
          renderItem={({ item }) => {
            const isActive = item.id === activeDuration;
            const activeContainerStyle = isActive ? styles.activeItem : {};

            return (
              <View>
                <Pressable onPress={() => setIsActiveDuration(item.id)}>
                  <DisplayTextComponent
                    DisplayValue={item.title}
                    ClassnameContainerStyle="w-fit px-2 mx-2"
                    ContainerStyle={activeContainerStyle}
                  />
                </Pressable>
              </View>
            );
          }}
        />
      </View>

      {/* Show Calendar */}
      <View>
        <CalendarComponent />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    backgroundColor: CONSTANT.themeColors.base,
  },
  actionText: {
    fontFamily: CONSTANT.customFonts.body,
    fontSize: CONSTANT.fontSizes.body,
    color: CONSTANT.themeColors.font,
  },
  dateRange: {
    fontFamily: CONSTANT.customFonts.heading2,
    fontSize: CONSTANT.fontSizes.heading2,
    color: CONSTANT.themeColors.font,
  },
  itemContainer: {
    // backgroundColor: 'gray', // Ganti dengan warna latar belakang default
    padding: 8,
    borderRadius: 8,
  },
  activeItem: {
    backgroundColor: CONSTANT.themeColors.font,
    color: CONSTANT.themeColors.base,
  },
});

export default DrawerScreenPage;
