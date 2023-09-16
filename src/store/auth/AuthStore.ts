import { create } from 'zustand';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {
  BASE_URL,
  SCOPES_USERINFO_EMAIL,
  SCOPES_USERINFO_PROFILE,
  WEBCLIENT_ID,
} from '@env';
import auth, { firebase } from '@react-native-firebase/auth';
import axios from 'axios';
import * as Keychain from 'react-native-keychain';

type userDetail = {
  userName: string;
  token: string;
};

type AuthStoreState = {
  isConfigured: boolean;
  _isSignIn: boolean;
  userToken: string | null;
  userDetail: userDetail;
};

type AuthStoreAction = {
  configureGoogleSignin: () => void;
  SignIn: () => Promise<void>;
  SignOut: () => Promise<void>;
  configureKeychain: () => Promise<void>;
};

const useAuthStore = create<AuthStoreState & AuthStoreAction>()(set => ({
  isConfigured: false,
  _isSignIn: false,
  userToken: '',
  userDetail: { userName: '', token: '' },

  configureGoogleSignin: () => {
    GoogleSignin.configure({
      scopes: [SCOPES_USERINFO_EMAIL, SCOPES_USERINFO_PROFILE],
      webClientId: WEBCLIENT_ID,
    });

    set({ isConfigured: true });
  },

  configureKeychain: async () => {
    try {
      const credential = await Keychain.getGenericPassword();

      // const { userName, token } = credential;
      console.log(credential);

      if (credential) {
        const { username, password } = credential;

        set({
          _isSignIn: true,
          userDetail: {
            userName: username,
            token: password,
          },
        });
      } else {
        console.log('No Credential stored');
      }
    } catch (error) {
      console.log(error);
    }
  },

  SignIn: async () => {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });

      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      auth().signInWithCredential(googleCredential);
      const userInfo = firebase.auth().currentUser;
      const value = {
        email: userInfo?.email,
        name: userInfo?.displayName,
        photo: userInfo?.photoURL,
        uid: userInfo?.uid,
      };

      const response = await axios.post(
        // 'https://webhook.site/900527eb-07c1-46fd-9141-0c4e9ad8d65e',
        `${BASE_URL}/auth/${userInfo?.uid}`,
        value,
      );

      const userName = response.data.name;
      const token = response.data.token;
      const keychainResponse = await Keychain.setGenericPassword(
        userName,
        token,
      );

      set({
        _isSignIn: true,
        userDetail: {
          userName,
          token,
        },
      });

      console.log(keychainResponse);
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
  },

  SignOut: async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();

      const removeToken = await Keychain.resetGenericPassword();
      console.log({ removeToken });

      if (removeToken) {
        set({
          _isSignIn: false,
          userDetail: {
            userName: '',
            token: '',
          },
        });
      }
    } catch (error: any) {
      error.code === statusCodes.SIGN_IN_REQUIRED &&
        console.log('SignIn Required');
    }
  },
}));

export default useAuthStore;
