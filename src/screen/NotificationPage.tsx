import React, { useEffect, useState, useCallback } from 'react';
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { RefreshControl, ScrollView } from 'react-native-gesture-handler';

import useNotificationStore from '../store/notification/NotificationStore';

import { CONSTANT } from '../themes';

import BackIcon from '../assets/icons/BackIcon.svg';
import DeleteIconOutline from '../assets/icons/DeleteIconOutline.svg';
import NotificationCardComponent from '../components/cards/NotificationCardComponent';

const NotificationPage = () => {
  const {
    getAllNotification,
    notificationData,
    updateNotificationStatus,
    loadMoreData,
    isLoading,
    visibleData,
  } = useNotificationStore();

  const [refreshing, setRefreshing] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    getAllNotification();
  }, []);

  const onHandleIsRead = (notifId: string) => {
    updateNotificationStatus(notifId);
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    if (!isLoading) {
      await getAllNotification();
    }
    setRefreshing(false);
  }, [getAllNotification, isLoading]);

  return (
    <ScrollView>
      <SafeAreaView className="my-3">
        {/* Header Title */}
        <View className="flex flex-row items-center justify-between my-3 mx-4 px-3">
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
              onPress={() => console.log('Deleted')}
            />
          </Pressable>
        </View>

        <View className="mt-3">
          <FlatList
            scrollEnabled={false}
            ItemSeparatorComponent={() => {
              return (
                <View
                  className="px-3 mx-4 opacity-20"
                  style={{
                    borderColor: CONSTANT.themeColors.disable,
                    borderWidth: StyleSheet.hairlineWidth,
                  }}
                />
              );
            }}
            showsVerticalScrollIndicator={false}
            data={visibleData}
            renderItem={({ item }) => {
              return (
                <NotificationCardComponent
                  containerStyle={
                    item.isRead
                      ? styles.notificationContainerStyleReaded
                      : styles.notificationContainerStyleUnread
                  }
                  notificationTitle={item.title}
                  notificationMessage={item.message}
                  onPress={() => {
                    console.log('Pressed', item.notifId);
                    onHandleIsRead(item.notifId);
                    getAllNotification();
                  }}
                />
              );
            }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        </View>
        {visibleData.length < notificationData.length && (
          <Button
            title="Tampilkan Lebih Banyak"
            onPress={loadMoreData}
            disabled={visibleData.length >= notificationData.length}
          />
        )}
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
  notificationContainerStyleReaded: {
    backgroundColor: CONSTANT.themeColors.base,
  },
  notificationContainerStyleUnread: {
    backgroundColor: CONSTANT.themeColors.complementary,
  },
});

export default NotificationPage;
