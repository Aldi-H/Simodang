import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ButtonComponent from '../../components/button/ButtonComponent';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

import useAuthStore from '../../store/auth/AuthStore';

import { CONSTANT } from '../../themes';

import BackgroundImage from '../../assets/images/BackgroundCircleStyle.svg';
import InputFieldWithIconComponent from '../../components/input/InputFieldWithIconComponent';
import EmailIcon from '../../assets/icons/EmailIcon.svg';
import PasswordIcon from '../../assets/icons/PasswordIcon.svg';
import GoogleIcon from '../../assets/icons/GoogleIcon.svg';

const LoginPage = () => {
  const { configureGoogleSignin, getLocalStorageItem, SignIn } = useAuthStore();
  const navigation = useNavigation();

  useEffect(() => {
    configureGoogleSignin();
  }, [configureGoogleSignin]);

  useEffect(() => {
    getLocalStorageItem();
  }, []);

  return (
    <View style={styles.loginPage} className="flex-1 justify-center">
      {/* Bacground Image Section */}
      <View style={styles.backgroundImageContainer}>
        <BackgroundImage />
      </View>

      <View className="justify-center items-center">
        {/* Field Container */}
        <View
          style={styles.container}
          className="h-fit w-fit justify-center items-center rounded-md drop-shadow-md shadow-2xl shadow-gray-500">
          <View className="m-5">
            <Text style={styles.loginText}>Login Page</Text>
          </View>

          <View className="mt-2 px-5 pb-6 items-center">
            {/* Input Field */}
            <View>
              <InputFieldWithIconComponent
                secureTextEntry={false}
                leftIcon={<EmailIcon height={hp('4%')} width={wp('6%')} />}
                placeholder="Email"
              />
              <InputFieldWithIconComponent
                secureTextEntry={true}
                leftIcon={<PasswordIcon height={hp('4%')} width={wp('6%')} />}
                placeholder="Email"
              />
            </View>

            {/* Separator */}
            <View
              style={styles.separatorContainer}
              className="flex flex-row items-center space-x-2 mt-4">
              <View style={styles.separator} className="flex-1" />
              <Text style={styles.separatorText}>atau</Text>
              <View style={styles.separator} className="flex-1" />
            </View>

            {/* Other Login Method */}
            <View className="mt-5">
              <TouchableOpacity onPress={SignIn}>
                <GoogleIcon height={hp('4%')} width={wp('7%')} />
              </TouchableOpacity>
            </View>

            {/* Button */}
            <View className="mt-5">
              <ButtonComponent
                buttonText="Masuk"
                style={styles.loginButton}
                className="rounded-full h-fit w-fit px-3 py-1"
                onPress={() => console.log('Login Button Pressed')}
              />
            </View>
          </View>
        </View>

        {/* Redirect to Register Page */}
        <View className="mt-6 justify-center items-center flex-row space-x-1">
          <Text style={styles.redirectText}>Belum memiliki akun?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('RegisterPage')}>
            <Text style={styles.redirectToLogin} className="justify-center">
              Daftar disini
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loginPage: {
    backgroundColor: CONSTANT.themeColors.complementary,
  },
  backgroundImageContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  container: {
    backgroundColor: CONSTANT.themeColors.base,
  },
  loginText: {
    fontFamily: CONSTANT.customFonts.heading1,
    fontSize: CONSTANT.fontSizes.heading1,
    color: CONSTANT.themeColors.font,
  },
  separatorContainer: {
    width: wp('75%'),
  },
  separatorText: {
    fontFamily: CONSTANT.customFonts.caption,
    fontSize: CONSTANT.fontSizes.body,
    color: CONSTANT.themeColors.disable,
  },
  separator: {
    backgroundColor: CONSTANT.themeColors.complementary,
    height: 1,
  },
  loginButton: {
    backgroundColor: CONSTANT.themeColors.secondary,
    fontFamily: CONSTANT.customFonts.caption,
    fontSize: CONSTANT.fontSizes.body,
    color: CONSTANT.themeColors.base,
  },
  redirectText: {
    fontFamily: CONSTANT.customFonts.caption,
    fontSize: CONSTANT.fontSizes.body,
    color: CONSTANT.themeColors.font,
  },
  redirectToLogin: {
    fontFamily: CONSTANT.customFonts.heading2,
    color: CONSTANT.themeColors.primary,
  },
});

export default LoginPage;
