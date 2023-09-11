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
                source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
              />
            </View>

            {/* Input Section */}
            <View className="mt-6">
              <InputFieldComponent
                inputTitle="Nama"
                placeholder="Nama"
                defaultValue="Katou Megumi"
              />
              <InputFieldComponent
                inputTitle="Email"
                placeholder="someone@en-japan.com"
                defaultValue="katoumegumi@en-japan.com"
              />
              <InputFieldComponent
                inputTitle="No. Hp"
                placeholder="080-1234-5678"
                defaultValue="080-1234-5678"
              />
              <InputFieldComponent
                inputTitle="Alamat"
                placeholder="Tokyo"
                defaultValue="Tokyo"
              />
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
  },
});

export default ProfileSettingPage;
