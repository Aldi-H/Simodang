import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { CONSTANT } from '../themes';
import BackgroundImage from '../assets/images/BackgroundCircleStyle.svg';
import InputFieldComponent from '../components/input/InputFieldComponent';
import EmailIcon from '../assets/icons/EmailIcon.svg';
import PasswordIcon from '../assets/icons/PasswordIcon.svg';

const RegisterPage = () => {
  return (
    <View style={styles.registerPage} className="flex-1 relative">
      {/* Background Image Section */}
      <View>
        <BackgroundImage />
      </View>

      <View className="justify-center items-center">
        {/* Field Container */}
        <View
          style={styles.container}
          className="h-fit w-fit justify-center items-center rounded-md drop-shadow-md shadow-2xl shadow-gray-500">
          <View className="m-4">
            <Text style={styles.registerText}>Buat Akun</Text>
          </View>

          <View className="px-6 pb-6">
            <InputFieldComponent
              icon={<EmailIcon height={hp('4%')} width={wp('6%')} />}
              placeholder="Email"
            />
            <InputFieldComponent
              icon={<PasswordIcon height={hp('4%')} width={wp('6%')} />}
              placeholder="Password"
            />
            <InputFieldComponent
              icon={<PasswordIcon height={hp('4%')} width={wp('6%')} />}
              placeholder="Konfirmasi Password"
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  registerPage: {
    backgroundColor: CONSTANT.themeColors.complementary,
  },
  container: {
    backgroundColor: CONSTANT.themeColors.base,
  },
  registerText: {
    fontFamily: CONSTANT.customFonts.heading1,
    fontSize: CONSTANT.fontSizes.heading1,
    color: CONSTANT.themeColors.font,
  },
});

export default RegisterPage;
