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

const RegisterPage = () => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const { configureGoogleSignin, configureKeychain, SignIn } = useAuthStore();
  const navigation = useNavigation();

  useEffect(() => {
    configureGoogleSignin();
  }, [configureGoogleSignin]);

  useEffect(() => {
    configureKeychain();
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
            <Text style={styles.registerText}>Buat Akun</Text>
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
                placeholder="Password"
              />
              <InputFieldWithIconComponent
                secureTextEntry={true}
                leftIcon={<PasswordIcon height={hp('4%')} width={wp('6%')} />}
                placeholder="Konfirmasi Password"
              />
            </View>

            <View className="mt-3">
              <InputCheckBoxComponent
                toggleCheckBox={toggleCheckBox}
                onValueChange={newValue => setToggleCheckBox(newValue)}
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

            {/* Button */}
            <View className="mt-5">
              <ButtonComponent
                buttonText="Buat Akun"
                style={styles.registerButton}
                className="rounded-full h-fit w-fit px-3 py-1"
                onPress={() => console.log('Register Pressed')}
              />
            </View>
          </View>
        </View>

        {/* Redirect to Login Page */}
        <View className="mt-6 justify-center items-center flex-row space-x-1">
          <Text style={styles.redirectText}>Sudah memiliki akun?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('LoginPage')}>
            <Text style={styles.redirectToLogin} className="justify-center">
              Masuk disini
            </Text>
          </TouchableOpacity>
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
