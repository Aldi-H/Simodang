import { Alert, Platform, PermissionsAndroid } from 'react-native';
import { create } from 'zustand';
import storage from '@react-native-firebase/storage';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

type FirebaseStoreState = {
  filePath: any | null;
  imageUri: string;
  firebaseImageURL: string | undefined;
  uploading: boolean;
  transfered: number;
};

type FirebaseStoreAction = {
  requestCameraPermission: () => Promise<boolean>;
  requestExternalWritePermission: () => Promise<boolean>;
  captureImage: (type: 'photo') => Promise<void>;
  chooseFile: (type: 'photo') => Promise<void>;
  uploadImage: () => Promise<void>;
};

const useFirebaseStore = create<FirebaseStoreState & FirebaseStoreAction>()(
  (set, get) => ({
    filePath: null,
    imageUri: '',
    firebaseImageURL: '',
    uploading: false,
    transfered: 0,

    //* Permission
    requestCameraPermission: async () => {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: 'Camera Permission',
              message:
                'Aplikasi membutuhkan izin akses kamera untuk mengambil gambar',
              buttonPositive: 'OK',
              buttonNegative: 'CANCEL',
            },
          );

          return granted === PermissionsAndroid.RESULTS.GRANTED;
        } catch (error) {
          console.warn(error);
          return false;
        }
      } else {
        return true;
      }
    },

    requestExternalWritePermission: async () => {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
              title: 'External Storage Write Permission',
              message: 'App needs write permission for storing files.',
              buttonPositive: 'OK',
              buttonNegative: 'Cancel',
            },
          );
          return granted === PermissionsAndroid.RESULTS.GRANTED;
        } catch (err: any) {
          console.warn(err);
          Alert.alert('Write permission err', err.toString());
        }
        return false;
      } else {
        return true;
      }
    },

    captureImage: async (type: 'photo') => {
      const options = {
        mediaType: type,
        saveToPhotos: true,
      };

      const isCameraPermitted = await get().requestCameraPermission();
      const isStoragePermitted = await get().requestExternalWritePermission();

      if (isCameraPermitted && isStoragePermitted) {
        launchCamera(options, response => {
          console.log('Response = ', response);

          if (response.didCancel) {
            Alert.alert('User cancelled camera picker');
            return;
          } else if (response.errorCode === 'camera_unavailable') {
            Alert.alert('Camera not available on device');
            return;
          } else if (response.errorCode === 'permission') {
            Alert.alert('Permission not satisfied');
            return;
          } else if (response.errorCode === 'others') {
            const errorMessage = response.errorMessage || 'Unknown error';
            Alert.alert(errorMessage);
            return;
          }

          set({
            imageUri: response.assets?.[0].uri,
            filePath: response.assets,
          });
        });
      }
    },

    chooseFile: async (type: 'photo') => {
      const options = {
        mediaType: type,
      };

      launchImageLibrary(options, response => {
        console.log('Response = ', response);

        if (response.didCancel) {
          Alert.alert('User cancelled camera picker');
          return;
        } else if (response.errorCode === 'camera_unavailable') {
          Alert.alert('Camera not available on device');
          return;
        } else if (response.errorCode === 'permission') {
          Alert.alert('Permission not satisfied');
          return;
        } else if (response.errorCode === 'others') {
          const errorMessage = response.errorMessage || 'Unknown error';
          Alert.alert(errorMessage);
          return;
        }

        set({
          imageUri: response.assets?.[0].uri,
          filePath: response.assets,
        });
      });
    },

    //* Upload Image to Firebase
    uploadImage: async () => {
      try {
        if (Object.keys(get().filePath).length === 0) {
          return Alert.alert('Silahkan Pilih Gambar Terebih Dahulu');
        }

        set({ uploading: true, transfered: 0 });

        const fileName = get().filePath[0].uri.substring(
          get().filePath[0].uri.lastIndexOf('/') + 1,
        );

        const uploadUri =
          Platform.OS === 'ios'
            ? get().filePath[0].uri.replace('file://', '')
            : get().filePath[0].uri;

        const task = storage()
          .ref(`/addPond/img/${fileName}`)
          .putFile(uploadUri);

        await task.on('state_changed', taskSnapshot => {
          set({
            transfered:
              Math.round(
                taskSnapshot.bytesTransferred / taskSnapshot.totalBytes,
              ) * 10000,
          });
        });

        await task.then(() => {
          Alert.alert('Image Uploaded');
          set({
            transfered: 0,
          });

          storage()
            .ref(`/addPond/img/${fileName}`)
            .getDownloadURL()
            .then(downloadedURL => {
              console.log(`DownloadedURL: ${downloadedURL}`);
              set({
                firebaseImageURL: String(downloadedURL),
              });
            });
        });

        set({
          filePath: {},
        });
      } catch (error) {
        console.log(error);
      }

      set({
        uploading: false,
      });
    },
  }),
);

export default useFirebaseStore;
