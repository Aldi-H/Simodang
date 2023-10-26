import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

import { CONSTANT } from '../../themes';

import BackIcon from '../../assets/icons/BackIcon.svg';
import InputFieldComponent from '../../components/input/InputFieldComponent';
import ButtonComponent from '../../components/button/ButtonComponent';
import useProfileStore from '../../store/profile/ProfileStore';

const ProfileSettingPage = () => {
  const { userDetail, updateUser } = useProfileStore();

  const [newUserData, setNewUserData] = useState({
    newUserName: userDetail.userName,
    newPhoneNum: userDetail.phoneNum,
    newAddress: userDetail.address,
  });

  const navigation = useNavigation();

  const handleUpdateUser = async () => {
    const updateUserData = {
      ...userDetail,
      userName: newUserData.newUserName,
      phoneNum: newUserData.newPhoneNum,
      address: newUserData.newAddress,
    };

    await updateUser(updateUserData);
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingView}
      behavior={Platform.OS === 'android' ? 'height' : 'padding'}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SafeAreaView className="m-4 my-5 px-3">
          <View className="flex flex-row items-center justify-between mt-4">
            <Pressable
              className="items-start"
              onPress={() => navigation.goBack()}>
              <BackIcon fill={CONSTANT.themeColors.font} />
            </Pressable>

            <View className="items-center">
              <Text style={styles.profileSettingHeaderTitle}>
                Pengaturan Profil
              </Text>
            </View>

            <View />
          </View>

          {/* Input Field Section */}
          <View>
            {/* Photo Section */}
            <View className="mt-10 items-center justify-center">
              <Image
                className="rounded-full"
                style={styles.userProfile}
                source={{ uri: userDetail.photo }}
              />
            </View>

            {/* Input Section */}
            <View className="mt-6">
              <InputFieldComponent
                inputTitle="Nama"
                placeholder="Nama"
                defaultValue={userDetail.userName ?? ''}
                onChangeText={value =>
                  setNewUserData(prevState => ({
                    ...prevState,
                    newUserName: value,
                  }))
                }
              />
              <InputFieldComponent
                inputTitle="Email"
                placeholder="someone@en-japan.com"
                editable={false}
                defaultValue={userDetail.email ?? ''}
              />
              <InputFieldComponent
                inputTitle="No. Hp"
                placeholder="-"
                defaultValue={userDetail.phoneNum ?? ''}
                onChangeText={value =>
                  setNewUserData(prevState => ({
                    ...prevState,
                    newPhoneNum: value,
                  }))
                }
              />
              <InputFieldComponent
                inputTitle="Alamat"
                placeholder="-"
                defaultValue={userDetail.address ?? ''}
                onChangeText={value =>
                  setNewUserData(prevState => ({
                    ...prevState,
                    newAddress: value,
                  }))
                }
              />
            </View>

            {/* Buttoon Section */}
            <View className="mt-12 mb-6">
              <ButtonComponent
                buttonText="Simpan"
                style={styles.saveButton}
                className="rounded-md h-fit py-1"
                onPress={() => {
                  handleUpdateUser();
                  console.log('Simpan Button Pressed');
                }}
              />
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  profileSettingHeaderTitle: {
    fontFamily: CONSTANT.customFonts.heading1,
    fontSize: CONSTANT.fontSizes.heading1,
    color: CONSTANT.themeColors.font,
  },
  userProfile: {
    width: wp('30%'),
    height: hp('15%'),
  },
  saveButton: {
    fontFamily: CONSTANT.customFonts.heading2,
    fontSize: CONSTANT.fontSizes.heading2,
    color: CONSTANT.themeColors.base,
    backgroundColor: CONSTANT.themeColors.primary,
  },
});

export default ProfileSettingPage;
