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
  const { isConfigured, configureGoogleSignin, SignIn, SignOut } =
    useAuthStore();
  const navigation = useNavigation();

  useEffect(() => {
    !isConfigured && configureGoogleSignin();
  }, [isConfigured, configureGoogleSignin]);

  /* const SignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const value = {
        email: userInfo.user.email,
        name: userInfo.user.name,
        photo: userInfo.user.photo,
      };

      await axios.post(
        'http://www.devel-filkomub.site/auth/login-google',
        value,
      );

      const token = await GoogleSignin.getTokens();

      console.log(token.accessToken);
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User cancelled the login flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Signing in');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play services not available');
      } else {
        console.log('Some other error happened');
        console.log(error.message);
        console.log(error.code);
      }
    }
  }; */

  /* const SignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });

      const { idToken } = await GoogleSignin.signIn();

      const userInfo = firebase.auth().currentUser;

      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      const value = {
        email: userInfo?.email,
        name: userInfo?.displayName,
        photo: userInfo?.photoURL,
        uid: userInfo?.uid,
      };

      await axios.post(
        // 'http://www.devel-filkomub.site/auth/login-google',
        'https://webhook.site/900527eb-07c1-46fd-9141-0c4e9ad8d65e',
        value,
      );

      auth().signInWithCredential(googleCredential);

      console.log(value);
    } catch (error) {
      console.error(error);
    }
  }; */

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
              {/* {accessToken ? (
                <TouchableOpacity onPress={SignOut}>
                  <Text>Logout</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={SignIn}>
                  <GoogleIcon height={hp('4%')} width={wp('7%')} />
                </TouchableOpacity>
              )} */}

              <TouchableOpacity onPress={SignIn}>
                <GoogleIcon height={hp('4%')} width={wp('7%')} />
              </TouchableOpacity>
            </View>

            {/* Login method using deep linking */}
            {/* <View>
              <OpenUrlButton url={supportedURL} />
            </View> */}

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

        {/* Temporary Logout */}
        <View>
          <TouchableOpacity onPress={SignOut}>
            <Text>Logout</Text>
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
