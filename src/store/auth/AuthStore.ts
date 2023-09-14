import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {
  // BASE_URL,
  SCOPES_USERINFO_EMAIL,
  SCOPES_USERINFO_PROFILE,
  WEBCLIENT_ID,
} from '@env';
import auth, { firebase } from '@react-native-firebase/auth';
import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { storage, zustandStorage } from '../mmkv/mmkv';

type AuthStoreState = {
  isConfigured: boolean;
  userToken: string | null;
};

type AuthStoreAction = {
  configureGoogleSignin: () => void;
  SignIn: () => Promise<void>;
  SignOut: () => Promise<void>;
};

const useAuthStore = create<AuthStoreState & AuthStoreAction>()(
  persist(
    set => ({
      isConfigured: false,
      userToken: '',

      configureGoogleSignin: () => {
        GoogleSignin.configure({
          scopes: [SCOPES_USERINFO_EMAIL, SCOPES_USERINFO_PROFILE],
          webClientId: WEBCLIENT_ID,
        });

        set({ isConfigured: true });
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
          // const value = {
          //   email: userInfo?.email,
          //   name: userInfo?.displayName,
          //   photo: userInfo?.photoURL,
          //   uid: userInfo?.uid,
          // };

          // const response =
          await axios.get(
            'https://webhook.site/900527eb-07c1-46fd-9141-0c4e9ad8d65e',
            // `${BASE_URL}/auth/${userInfo?.uid}`,
          );

          const uid = userInfo?.uid;

          uid && storage.set('user-token', uid);

          console.log(uid);
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
        } catch (error: any) {
          error.code === statusCodes.SIGN_IN_REQUIRED &&
            console.log('SignIn Required');
        }
      },
    }),
    {
      name: 'user-token',
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
);

export default useAuthStore;
