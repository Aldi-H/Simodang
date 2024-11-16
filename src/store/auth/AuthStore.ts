import { create } from 'zustand';
import { GoogleSignin, isErrorWithCode, isNoSavedCredentialFoundResponse, isSuccessResponse, statusCodes } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {
  BASE_URL,
  SCOPES_USERINFO_EMAIL,
  SCOPES_USERINFO_PROFILE,
  WEBCLIENT_ID,
} from '@env';
import axios from 'axios';

type AuthStoreState = {
  _isSignIn: boolean;
  token: string | null;
};

type AuthStoreAction = {
  SignIn: () => Promise<void>;
  signInBasic: (email: string, password: string) => Promise<void>;
  SignOut: () => Promise<void>;
  configureGoogleSignin: () => void;
  getCurrentUser: () => void;
};

const useAuthStore = create<AuthStoreState & AuthStoreAction>(set => ({
  _isSignIn: false,
  token: null,

  SignIn: async () => {
    try {
      // Google Sign In
      await GoogleSignin.hasPlayServices();
      const signInResponse = await GoogleSignin.signIn();
      if (isSuccessResponse(signInResponse)) {
        const idToken = signInResponse.data.idToken;
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        const googleUser = await auth().signInWithCredential(googleCredential);

        const token = await googleUser.user.getIdToken() ?? '';
        const response = await axios.post(
          `${BASE_URL}/auth`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        set({
          _isSignIn: true,
        });

        return;
      }

      set({
        _isSignIn: false,
      });
    } catch (error: any) {
      if (isErrorWithCode(error)) {
        console.log('Error Code: ', error.code);

        set({
          _isSignIn: false,
        });
        return;
      }
      console.log('Error Message: ', error);

      set({
        _isSignIn: false,
      });
    }
  },

  signInBasic: async (email: string, password: string) => {
    try {
      const basicUser = await auth().signInWithEmailAndPassword(email, password);

      const token = await basicUser.user?.getIdToken() ?? '';
      
      const response = await axios.post(
        `${BASE_URL}/auth`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      set({
        _isSignIn: true,
      });
    } catch (error: any) {
      if (isErrorWithCode(error)) {
        console.log('Error Code: ', error.code);

        set({
          _isSignIn: false,
        });
        return;
      }
      console.log('Error Message: ', error);

      set({
        _isSignIn: false,
      });
    }
  },

  SignOut: async () => {
    try {
      const currentUser = GoogleSignin.getCurrentUser();
      if (currentUser !== null) {
        await GoogleSignin.signOut();
      }
      await auth().signOut();

      set({
        _isSignIn: false,
      });
    } catch (error: any) {
      if (isErrorWithCode(error)) {
        console.log('Error Code: ', error.code);

        return;
      }
      console.log('Error Message: ', error);
    }
  },

  configureGoogleSignin: () => {
    GoogleSignin.configure({
      scopes: [SCOPES_USERINFO_EMAIL, SCOPES_USERINFO_PROFILE],
      webClientId: WEBCLIENT_ID,
    });
  },

  getCurrentUser: () => {
    const user = auth().currentUser;
    if (user) {
      console.log('getCurrentUser obtained');
      set({
        _isSignIn: true,
      });
    } else {
      console.log('getCurrentUser not obtained');
      set({
        _isSignIn: false,
      });
    }
  },
}));

export default useAuthStore;
