import React from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import { CONSTANT } from '../themes';

import BackIcon from '../assets/icons/BackIcon.svg';
import DeleteIconOutline from '../assets/icons/DeleteIconOutline.svg';
import NotificationCardComponent from '../components/cards/NotificationCardComponent';

const NotificationPage = () => {
  const navigation = useNavigation();

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SafeAreaView className="m-4 my-5 px-3">
        {/* Header Title */}
        <View className="flex flex-row items-center justify-between mt-4">
          <Pressable
            className="items-start"
            onPress={() => navigation.goBack()}>
            <BackIcon fill={CONSTANT.themeColors.font} />
          </Pressable>

          <View className="items-center">
            <Text style={styles.notificationHeaderTitle}>Notifikasi</Text>
          </View>

          <Pressable className="items-center">
            <DeleteIconOutline
              height={hp('3.5%')}
              width={wp('5%')}
              fill={CONSTANT.themeColors.warningRed}
              onPress={() => console.log('Delete All Pressed')}
            />
          </Pressable>
        </View>

        <View className="mt-10">
          <NotificationCardComponent />
          <NotificationCardComponent />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  notificationHeaderTitle: {
    fontFamily: CONSTANT.customFonts.heading1,
    fontSize: CONSTANT.fontSizes.heading1,
    color: CONSTANT.themeColors.font,
  },
});

export default NotificationPage;
