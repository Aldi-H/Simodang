import React from 'react';
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

const ProfileSettingPage = () => {
  const navigation = useNavigation();

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingView}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView>
        <SafeAreaView className="m-4 my-5 px-3">
          {/* Header Title*/}
          <View className="flex flex-row items-center justify-between mt-4">
            <Pressable
              onPress={() => navigation.goBack()}
              className="items-start">
              <BackIcon fill={CONSTANT.themeColors.font} />
            </Pressable>
            <View className="items-center">
              <Text style={styles.profileSettingHeaderTitle}>
                Pengaturan Profil
              </Text>
            </View>
            <View />
          </View>

          <View className="items-center">
            {/* Photo Section */}
            <View className="mt-10 items-center justify-center">
              <Image
                className="rounded-full"
                style={styles.userProfile}
                source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
              />
            </View>

            {/* Input Section */}
            <View className="mt-6">
              <InputFieldComponent
                inputTitle="Nama"
                defaultValue="Katou Megumi"
              />
              <InputFieldComponent
                inputTitle="Email"
                defaultValue="KatouMegumi@mail.jp"
              />
              <InputFieldComponent
                inputTitle="No. Hp"
                defaultValue="08123456789"
              />
              <InputFieldComponent inputTitle="Alamat" defaultValue="Japan" />
            </View>

            {/* Buttoon Section */}
            <View className="mt-12 mb-6">
              <ButtonComponent
                buttonText="Simpan"
                style={styles.saveButton}
                className="rounded-md h-fit py-1"
                onPress={() => console.log('Logout Button Pressed')}
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
    width: wp('80%'),
  },
});

export default ProfileSettingPage;
