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

type AuthStoreState = {
  _isSignIn: boolean;
  token: string | null;
};

type AuthStoreAction = {
  SignIn: () => Promise<void>;
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
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const googleUser = await auth().signInWithCredential(googleCredential);

      const token = await googleUser.user?.getIdToken();
      set({ token: token });

      // console.log('GoogleUser: ', googleUser.user);

      // Send token to endpoint
      console.log('Token: ', token);
      const response = await axios.post(
        `${BASE_URL}/auth`,
        {},
        {
          headers: {
            Authorization: `Bearer ${useAuthStore.getState().token}`,
          },
        },
      );

      set({
        _isSignIn: true,
      });
    } catch (error: any) {
      console.log(error);
    }
  },

  SignOut: async () => {
    try {
      // Remove token from server and local storage

      // console.log(token);

      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      // await Keychain.resetGenericPassword();

      set({
        _isSignIn: false,
        token: null,
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

  getCurrentUser: () => {
    const user = auth().currentUser;
    if (user) {
      set({
        _isSignIn: true,
      });
    } else {
      set({
        _isSignIn: false,
      });
    }
  },
}));

export default useAuthStore;
