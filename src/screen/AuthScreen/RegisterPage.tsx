import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
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
import InputCheckBoxComponent from '../../components/checkbox/InputCheckBoxComponent';
import ButtonComponent from '../../components/button/ButtonComponent';
import GoogleIcon from '../../assets/icons/GoogleIcon.svg';
import useAuthStore from '../../store/auth/AuthStore';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
// import useAuth from '../../store/auth/Auth';

const RegisterPage = () => {
  const { configureGoogleSignin, getCurrentUser, SignIn } = useAuthStore();

  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const navigation = useNavigation();

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

          <View className="mt-2 px-5 pb-6 items-center">
            <GoogleSigninButton
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Dark}
              onPress={SignIn}
            />
            <View className="mt-3 px-5">
              <Text
              className='text-black text-center text-md'
              style={{
                lineHeight: 25,
              }}
            >Dengan menekan tombol di atas anda akan menyetujui Syarat & Ketentuan serta Kebijakan Privasi dari SIMODANG</Text>
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
