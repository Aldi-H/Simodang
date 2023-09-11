import axios from 'axios';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Pressable,
  Alert,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import {
  // ImagePickerResponse,
  // launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import { PhotoIcon } from 'react-native-heroicons/solid';

import { CONSTANT } from '../themes';

import BackIcon from '../assets/icons/BackIcon.svg';
import InputFieldComponent from '../components/input/InputFieldComponent';
import DropdownComponent from '../components/dropdown/DropdownComponent';

const AddPoolPage = () => {
  const [filePath, setFilePath] = useState<any | null>(null);
  const [inputData, setInputData] = useState({
    name: '',
    address: '',
    city: '',
    deviceId: '',
  });

  const navigation = useNavigation();

  // //* Camera permission
  // const requestCameraPermission = async () => {
  //   if (Platform.OS === 'android') {
  //     try {
  //       const granted = await PermissionsAndroid.request(
  //         PermissionsAndroid.PERMISSIONS.CAMERA,
  //         {
  //           title: 'Camera Permission',
  //           message:
  //             'Aplikasi membutuhkan izin akses kamera untuk mengambil gambar',
  //           buttonPositive: 'OK',
  //           buttonNegative: 'CANCEL',
  //         },
  //       );

  //       return granted === PermissionsAndroid.RESULTS.GRANTED;
  //     } catch (error) {
  //       console.warn(error);
  //       return false;
  //     }
  //   } else {
  //     return true;
  //   }
  // };

  // //* external write permission
  // const requestExternalWritePermission = async () => {
  //   if (Platform.OS === 'android') {
  //     try {
  //       const granted = await PermissionsAndroid.request(
  //         PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
  //         {
  //           title: 'External Storage Write Permission',
  //           message: 'App needs write permission for storing files.',
  //           buttonPositive: 'OK',
  //           buttonNegative: 'Cancel',
  //         },
  //       );
  //       return granted === PermissionsAndroid.RESULTS.GRANTED;
  //     } catch (err: any) {
  //       console.warn(err);
  //       Alert.alert('Write permission err', err.toString());
  //     }
  //     return false;
  //   } else {
  //     return true;
  //   }
  // };

  const chooseFile = (type: 'photo') => {
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

      setFilePath(response.assets);
    });
  };

  const handleChangeForm = (key: string, value: string) => {
    setInputData(prevData => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      formData.append('name', inputData.name);
      formData.append('address', inputData.address);
      formData.append('city', inputData.city);
      formData.append('file', {
        uri: filePath![0].uri,
        type: filePath![0].type,
        name: filePath![0].fileName,
      });

      const response = await axios.post(
        'http://www.devel-filkomub.site/ponds',
        formData,
        {
          headers: {
            Authorization:
              'Bearer c55395c467dc5f4d8caee3d6b53c5f17d4c24b28976bcf387f1b9feb563e',
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      console.log('Response from server:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingView}
      behavior={Platform.OS === 'android' ? 'height' : 'padding'}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SafeAreaView className="m-4 my-5 px-3">
          {/* Header Title */}
          <View className="flex flex-row items-center justify-between mt-4">
            <Pressable
              className="items-start"
              onPress={() => navigation.goBack()}>
              <BackIcon fill={CONSTANT.themeColors.font} />
            </Pressable>

            <View className="items-center">
              <Text style={styles.addPoolHeaderTitle}>Tambah Kolam</Text>
            </View>

            <View />
          </View>

          {/* Input Field Section */}
          <View className="mt-10">
            <InputFieldComponent
              inputTitle="Nama Kolam"
              placeholder="Nama Kolam"
              value={inputData.name}
              onChangeText={text => handleChangeForm('name', text)}
            />
            <InputFieldComponent
              inputTitle="Alamat Kolam"
              placeholder="Alamat Kolam"
              value={inputData.address}
              onChangeText={text => handleChangeForm('address', text)}
            />
            <InputFieldComponent
              inputTitle="Kota"
              placeholder="Kota"
              value={inputData.city}
              onChangeText={text => handleChangeForm('city', text)}
            />
            {/* <InputFieldComponent
              inputTitle="Kode Alat"
              placeholder="Kode Alat"
              value={inputData.city}
              onChangeText={text => handleChangeForm('city', text)}
            /> */}

            <View className="flex-row justify-between mt-4">
              <DropdownComponent dropdownStyle={styles.dropdown} />
              <DropdownComponent dropdownStyle={styles.dropdown} />
            </View>

            <Pressable className="mt-6" onPress={() => chooseFile('photo')}>
              <View
                style={styles.photoUploadContainer}
                className="border-2 border-dashed p-10">
                <View className="items-center opacity-50">
                  <PhotoIcon
                    size={hp('5%')}
                    fill={CONSTANT.themeColors.disable}
                  />
                </View>

                <View>
                  <Text
                    style={styles.uploadImageText}
                    className="text-center opacity-80">
                    Unggah Gambar
                  </Text>
                  <Text style={styles.maxFileSize} className="text-center">
                    Mak. Ukuran File: 5MB
                  </Text>
                </View>
              </View>
            </Pressable>
          </View>

          <View className="mt-6">
            <Button onPress={() => handleSubmit()} title="Submit" />
          </View>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  addPoolHeaderTitle: {
    fontFamily: CONSTANT.customFonts.heading1,
    fontSize: CONSTANT.fontSizes.heading1,
    color: CONSTANT.themeColors.font,
  },
  dropdown: {
    height: hp('6%'),
    width: wp('40%'),
    borderColor: CONSTANT.themeColors.disable,
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  photoUploadContainer: {
    borderColor: CONSTANT.themeColors.complementary,
  },
  uploadImageText: {
    fontFamily: CONSTANT.customFonts.body,
    fontSize: CONSTANT.fontSizes.body,
    color: CONSTANT.themeColors.primary,
  },
  maxFileSize: {
    fontFamily: CONSTANT.customFonts.caption,
    fontSize: CONSTANT.fontSizes.caption,
    color: CONSTANT.themeColors.disable,
  },

  buttonStyle: {
    backgroundColor: '#307ecc',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#307ecc',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 15,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  textStyle: {
    backgroundColor: '#fff',
    fontSize: 15,
    marginTop: 16,
    marginLeft: 35,
    marginRight: 35,
    textAlign: 'center',
  },
});

export default AddPoolPage;
