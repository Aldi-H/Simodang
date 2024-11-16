import React, { useEffect, useState } from 'react';
import { Linking, StyleSheet, Text, View } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import { CONSTANT } from '../../themes';
import BackgroundImage from '../../assets/images/BackgroundCircleStyle.svg';
import InputFieldWithIconComponent from '../../components/input/InputFieldWithIconComponent';
import EmailIcon from '../../assets/icons/EmailIcon.svg';
import PasswordIcon from '../../assets/icons/PasswordIcon.svg';
import ButtonComponent from '../../components/button/ButtonComponent';
import GoogleIcon from '../../assets/icons/GoogleIcon.svg';
import useAuthStore from '../../store/auth/AuthStore';
// import useAuth from '../../store/auth/Auth';

const RegisterPage = () => {
  const { configureGoogleSignin, getCurrentUser, SignIn, signInBasic } = useAuthStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Login Pressed');
    signInBasic(email, password);
  }

  useEffect(() => {
    configureGoogleSignin();
  }, [configureGoogleSignin]);

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <View style={styles.registerPage} className="flex-1 justify-center">
      {/* Background Image Section */}
      <View style={styles.backgroudImageContainer}>
        <BackgroundImage />
      </View>

      <View className="justify-center items-center">
        {/* Field Container */}
        <View
          style={styles.container}
          className="h-fit w-fit justify-center items-center rounded-md drop-shadow-md shadow-2xl shadow-gray-500">
          <View className="m-5">
            <Text style={styles.registerText}>Selamat Datang</Text>
          </View>

          {/* <LoginForm /> */}
          <View className="mt-2 px-5 pb-6 items-center">
          <View>
              <InputFieldWithIconComponent
                secureTextEntry={false}
                leftIcon={<EmailIcon height={hp('4%')} width={wp('6%')} />}
                placeholder="Email"
                onChangeText={(text) => setEmail(text)}
              />
              <InputFieldWithIconComponent
                secureTextEntry={true}
                leftIcon={<PasswordIcon height={hp('4%')} width={wp('6%')} />}
                placeholder="Password"
                onChangeText={(text) => setPassword(text)}
              />
            </View>

            <View className="mt-5">
              <ButtonComponent
                buttonText="Masuk"
                style={styles.registerButton}
                className="rounded-full h-fit w-fit px-3 py-1"
                onPress={handleLogin}
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

            {/* Other Register Method */}
            <View className="mt-5">
              <TouchableOpacity onPress={SignIn}>
                <GoogleIcon height={hp('4%')} width={wp('7%')} />
              </TouchableOpacity>
            </View>
            <View className="mt-3 px-5">
              <Text
              className='text-black text-center text-md'
              style={{
                lineHeight: 25,
              }}
            >Dengan masuk ke aplikasi ini anda akan menyetujui{' '}
            <Text
              className='underline text-blue-600'
              onPress={() => Linking.openURL('https://lumen-sobatps.devel-filkomub.site/')}
            >Syarat & Ketentuan serta Kebijakan Privasi</Text>
            {' '}dari SIMODANG</Text>
            </View>
          </View>
        </View>

        {/* <TouchableOpacity onPress={SignOut}>
          <Text style={styles.redirectToLogin} className="justify-center">
            Logout
          </Text>
        </TouchableOpacity> */}

        {/* {loading && <ActivityIndicator />} */}
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
  backgroudImageContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  registerText: {
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
  registerButton: {
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

export default RegisterPage;
