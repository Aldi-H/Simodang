import { create } from 'zustand';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {
  BASE_URL,
  SCOPES_USERINFO_EMAIL,
  SCOPES_USERINFO_PROFILE,
  WEBCLIENT_ID,
} from '@env';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

type UserDetail = {
  userName?: string | null;
  email?: string | null;
  phoneNum?: string | null;
  address?: string | null;
  photo?: string | undefined;
  token: string | null;
};

type AuthStoreState = {
  userDetail: UserDetail;
  _isSignIn: boolean;
};

type AuthStoreAction = {
  SignIn: () => Promise<void>;
  SignOut: () => Promise<void>;
  configureGoogleSignin: () => void;
  getLocalStorageItem: () => Promise<void>;
};

const useAuthStore = create<AuthStoreState & AuthStoreAction>(set => ({
  userDetail: {
    userName: null,
    email: null,
    phoneNum: null,
    photo: undefined,
    address: null,
    token: null,
  },
  _isSignIn: false,

  SignIn: async () => {
    try {
      // Google Sign In
      await GoogleSignin.hasPlayServices();
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const googleUser = await auth().signInWithCredential(googleCredential);

      // console.log('GoogleUser: ', googleUser.user);

      // Send token to endpoint
      const response = await axios.post(
        `${BASE_URL}/auth/${googleUser.user?.uid}`,
        {
          email: googleUser.user?.email,
          name: googleUser.user?.displayName,
          photo: googleUser.user?.photoURL,
          phoneNum: googleUser.user?.phoneNumber,
          uid: googleUser.user?.uid,
        },
      );

      await AsyncStorage.setItem('user', JSON.stringify(response.data));

      set({
        _isSignIn: true,
        userDetail: {
          userName: response.data.name,
          email: googleUser.user.email,
          phoneNum: googleUser.user.phoneNumber,
          photo: googleUser.user.photoURL || '',
          token: response.data.token,
        },
      });
    } catch (error: any) {
      console.log(error.code);
    }
  },

  SignOut: async () => {
    try {
      // Remove token from server and local storage
      const { userName } = useAuthStore.getState().userDetail;

      // console.log(token);
      await axios.post(`${BASE_URL}/auth/logout`, null, {
        headers: {
          Authorization: `Bearer ${useAuthStore.getState().userDetail.token}`,
        },
      });

      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      // await Keychain.resetGenericPassword();
      await AsyncStorage.removeItem('user');

      set({
        _isSignIn: false,
        userDetail: {
          userName: userName,
          email: null,
          phoneNum: null,
          address: null,
          photo: undefined,
          token: null,
        },
      });
    } catch (error: any) {
      console.log(error.code);
    }
  },

  configureGoogleSignin: () => {
    GoogleSignin.configure({
      scopes: [SCOPES_USERINFO_EMAIL, SCOPES_USERINFO_PROFILE],
      webClientId: WEBCLIENT_ID,
    });
  },

  getLocalStorageItem: async () => {
    try {
      // const credential = await Keychain.getGenericPassword();
      const credential = await AsyncStorage.getItem('user');
      console.log(credential);

      if (credential) {
        const { name, token, photo, email, phoneNum, address } = JSON.parse(
          credential,
        ) as {
          name: string;
          email: string;
          phoneNum: string;
          address: string;
          photo: string;
          token: string;
        };

        set({
          _isSignIn: true,
          userDetail: {
            userName: name,
            email: email,
            phoneNum: phoneNum,
            address: address,
            photo: photo,
            token: token,
          },
        });
      } else {
        console.log('No Credential stored');
      }
    } catch (error) {
      console.log(error);
    }
  },
}));

export default useAuthStore;
