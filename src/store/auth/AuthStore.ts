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
import * as Keychain from 'react-native-keychain';

type UserDetail = {
  userName: string | null;
  token: string | null;
};

type AuthStoreState = {
  userDetail: UserDetail;
  _isSignIn: boolean;
};

interface AuthStoreAction {
  SignIn: () => Promise<void>;
  SignOut: () => Promise<void>;
  configureGoogleSignin: () => void;
  configureKeychain: () => Promise<void>;
}

const useAuthStore = create<AuthStoreState & AuthStoreAction>(set => ({
  userDetail: {
    userName: null,
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

      // Send token to endpoint
      const response = await axios.post(
        `${BASE_URL}/auth/${googleUser.user?.uid}`,
        {
          email: googleUser.user?.email,
          name: googleUser.user?.displayName,
          photo: googleUser.user?.photoURL,
          uid: googleUser.user?.uid,
        },
      );

      console.log('UserName: ', googleUser.user?.displayName?.split(' ', 1));

      // Store token in local storage
      await Keychain.setGenericPassword(
        googleUser.user?.displayName?.split(' ')[0] || '',
        response.data.token,
      );

      set({
        _isSignIn: true,
        userDetail: {
          userName: googleUser.user?.displayName?.split(' ')[0] || '',
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
      const signOutResponse = await axios.post(
        `${BASE_URL}/auth/logout`,
        null,
        {
          headers: {
            Authorization: `Bearer ${useAuthStore.getState().userDetail.token}`,
          },
        },
      );

      console.log(signOutResponse.data);

      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      await Keychain.resetGenericPassword();

      set({
        _isSignIn: false,
        userDetail: {
          userName: userName || null,
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

  configureKeychain: async () => {
    try {
      const credential = await Keychain.getGenericPassword();

      if (credential) {
        const { username, password } = credential;
        console.log(credential);

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
}));

export default useAuthStore;
