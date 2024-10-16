import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Pressable,
  Image,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import * as Progress from 'react-native-progress';

import { CONSTANT } from '../themes';

import usePondStore from '../store/pond/PondStore';
import useDeviceStore from '../store/device/DeviceStore';
import useFirebaseStore from '../store/firebase/FirebaseStore';
import { PondsStatusDropdown } from '../utils/dropdownData/DropdownData';

import { PhotoIcon } from 'react-native-heroicons/solid';
import BackIcon from '../assets/icons/BackIcon.svg';
import IconQROutline from '../assets/icons/IconQROutline.svg';
import InputFieldComponent from '../components/input/InputFieldComponent';
import DropdownComponent from '../components/dropdown/DropdownComponent';
import { ModalComponent } from '../components/popupDialog/ModalComponent';
import ButtonComponent from '../components/button/ButtonComponent';
import useProfileStore from '../store/profile/ProfileStore';

const AddPoolPage = () => {
  const {
    filePath,
    imageUri,
    firebaseImageURL,
    uploading,
    transfered,
    captureImage,
    chooseFile,
    uploadImage,
  } = useFirebaseStore();

  const {
    getAllDevices,
    filterIdDeviceId,
    dropdownData,
    deviceId,
    filteredDeviceId,
    dropdownIdDevicesValue,
  } = useDeviceStore();

  const { addPond, inputData, handleChangeForm, pondsData } = usePondStore();
  const { userDetail } = useProfileStore();

  const canAddPond = pondsData.length < userDetail.pondLimit;

  //* Dropdown State
  const [isFocusIdDevices, setIsFocusIdDevices] = useState<boolean>(false);
  const [isFocusPondStatus, setIsFocusPondStatus] = useState<boolean>(false);
  // const [dropdownIdDevicesValue, setDropdownIdDevicesValue] = useState<
  //   string | undefined
  // >();
  const [dropdownPondStatusValue, setDropdownPondStatusValue] = useState<
    string | undefined
  >();

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const navigation = useNavigation();

  const handleModal = () => {
    setIsModalVisible(() => !isModalVisible);
  };

  useEffect(() => {
    getAllDevices();
    filterIdDeviceId();
  }, [deviceId, getAllDevices, filterIdDeviceId]);

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
          <View
            style={{
              display: canAddPond ? 'none' : 'flex',
            }}
            className='py-5'>
            <Text className='text-center text-black text-lg font-bold'>Tidak dapat menambah kolam karena melebihi limit</Text>
            <Text className='text-center text-black text-lg font-bold'>Silahkan upgrade ke Simodang Premium</Text>
          </View>
          <View
          style={{
            display: canAddPond ? 'flex' : 'none',
          }}
          className="mt-10">
            <InputFieldComponent
              inputTitle="Nama Kolam"
              placeholder="Nama Kolam"
              // value={formik.values.name}
              // onChangeText={(text: string) => formik.handleChange('name')(text)}
              value={inputData.pondName}
              onChangeText={text => handleChangeForm({ pondName: text })}
            />
            <InputFieldComponent
              inputTitle="Alamat Kolam"
              placeholder="Alamat Kolam"
              // value={formik.values.address}
              // onChangeText={(text: string) =>
              //   formik.handleChange('address')(text)
              // }
              value={inputData.pondAddress}
              onChangeText={text => handleChangeForm({ pondAddress: text })}
            />
            <InputFieldComponent
              inputTitle="Kota"
              placeholder="Kota"
              // value={formik.values.city}
              // onChangeText={(text: string) => formik.handleChange('city')(text)}
              value={inputData.city}
              onChangeText={text => handleChangeForm({ city: text })}
            />

            <View className="flex mt-4">
              <View className="flex-row items-center">
                <DropdownComponent
                  // dropdownPlaceholder="Id Perangkat"
                  dropdownPlaceholder={
                    deviceId === filteredDeviceId[0]?.value
                      ? deviceId
                      : 'Id Perangkat'
                  }
                  valueField="label"
                  labelField="value"
                  value={dropdownIdDevicesValue}
                  // value={formik.values.deviceId}
                  // dropdownData={dropdownData}
                  dropdownData={
                    deviceId === filteredDeviceId[0]?.value
                      ? filteredDeviceId
                      : dropdownData
                  }
                  dropdownStyle={{ ...styles.dropdown, width: wp('75%') }}
                  isFocus={isFocusIdDevices}
                  onFocus={() => {
                    setIsFocusIdDevices(true);
                  }}
                  onBlur={() => setIsFocusIdDevices(false)}
                  onChange={(item: any) => {
                    if (deviceId === filteredDeviceId[0]?.value) {
                      useDeviceStore.setState({
                        dropdownIdDevicesValue: deviceId,
                      });

                      handleChangeForm({
                        deviceId: useDeviceStore.getState().deviceId,
                      });
                      setIsFocusIdDevices(false);
                    } else {
                      useDeviceStore.setState({
                        dropdownIdDevicesValue: item.value,
                      });

                      handleChangeForm({ deviceId: item.value });
                      setIsFocusIdDevices(false);
                    }
                  }}
                />

                <Pressable
                  className="mx-2"
                  onPress={() => {
                    navigation.navigate('QRCode');
                    useDeviceStore.setState({ scan: true });
                  }}>
                  <IconQROutline
                    height={hp('3.5%')}
                    width={wp('7%')}
                    fill={CONSTANT.themeColors.font}
                  />
                </Pressable>
              </View>

              <View className="mt-4">
                <DropdownComponent
                  dropdownPlaceholder="Status Kolam"
                  valueField="value"
                  labelField="label"
                  value={dropdownPondStatusValue}
                  dropdownData={PondsStatusDropdown}
                  dropdownStyle={{ ...styles.dropdown, width: wp('75%') }}
                  isFocus={isFocusPondStatus}
                  onFocus={() => setIsFocusPondStatus(true)}
                  onBlur={() => setIsFocusPondStatus(false)}
                  onChange={(item: any) => {
                    setDropdownPondStatusValue(item.value);
                    handleChangeForm({ isFilled: item.status });
                    console.log(inputData.isFilled);
                    setIsFocusPondStatus(false);
                  }}
                />
              </View>
            </View>

            <Pressable className="mt-6" onPress={handleModal}>
              <View
                style={styles.photoUploadContainer}
                className="border-2 border-dashed">
                {filePath === null ? (
                  <View className="m-10">
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
                ) : (
                  <View className="items-center m-2">
                    {firebaseImageURL ? (
                      <Image
                        source={{
                          uri: firebaseImageURL,
                        }}
                        height={150}
                        width={270}
                      />
                    ) : (
                      <View className="m-10">
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
                          <Text
                            style={styles.maxFileSize}
                            className="text-center">
                            Mak. Ukuran File: 5MB
                          </Text>
                        </View>
                      </View>
                    )}
                  </View>
                )}
              </View>
            </Pressable>

            {/* Modal */}
            <ModalComponent isVisible={isModalVisible}>
              <ModalComponent.Container>
                <ModalComponent.Header title="Unggah Gambar" />
                <ModalComponent.Body>
                  {filePath === null ? (
                    <Text
                      style={[
                        styles.uploadImageText,
                        { color: CONSTANT.themeColors.disable },
                      ]}>
                      Unggah Gambar
                    </Text>
                  ) : (
                    <View>
                      <Image
                        source={{
                          uri: imageUri,
                        }}
                        height={100}
                        width={200}
                      />
                    </View>
                  )}
                </ModalComponent.Body>

                <ModalComponent.Footer>
                  <View className="flex-row space-x-5 py-3">
                    <Pressable
                      className="items-center"
                      onPress={() => captureImage('photo')}>
                      <Text style={styles.footerModalTextStyle}>
                        Buka Kamera
                      </Text>
                    </Pressable>
                    <View style={styles.separator} />
                    <Pressable
                      // style={styles.footerModal}
                      className="items-center">
                      <Text
                        style={styles.footerModalTextStyle}
                        onPress={() => chooseFile('photo')}>
                        Buka Galeri
                      </Text>
                    </Pressable>
                  </View>

                  {uploading ? (
                    <View>
                      <Progress.Bar progress={transfered} width={300} />
                    </View>
                  ) : (
                    <Pressable
                      onPress={() => {
                        uploadImage();
                      }}
                      style={[
                        styles.footerModal,
                        {
                          borderTopColor: CONSTANT.themeColors.complementary,
                          borderTopWidth: StyleSheet.hairlineWidth,
                        },
                      ]}
                      className="py-3 w-full items-center">
                      <Text
                        style={[
                          styles.footerModalTextStyle,
                          styles.footerModalSubmit,
                        ]}>
                        Submit
                      </Text>
                    </Pressable>
                  )}

                  <Pressable
                    onPress={handleModal}
                    className="pt-3 w-full items-center">
                    <Text
                      style={[
                        styles.footerModalTextStyle,
                        styles.footerModalCancel,
                      ]}>
                      Cancel
                    </Text>
                  </Pressable>
                </ModalComponent.Footer>
              </ModalComponent.Container>
            </ModalComponent>
          </View>

          {/* Buttoon Section */}
          <View className="mt-12 mb-6">
            <ButtonComponent
              buttonText="Simpan"
              style={{
                ...styles.submitButton,
                display: canAddPond ? 'flex' : 'none',
              }}
              className="rounded-md h-fit py-1"
              onPress={() => {
                addPond();

                usePondStore.setState({
                  inputData: {
                    pondName: '',
                    pondAddress: '',
                    city: '',
                    deviceId: '',
                    imageUrl: '',
                    isFilled: true,
                  },
                });

                useFirebaseStore.setState({
                  firebaseImageURL: '',
                });

                useDeviceStore.setState({
                  filteredDeviceId: [],
                  deviceId: '',
                });

                console.log(inputData);
              }}
            />
          </View>
        </SafeAreaView>
      </ScrollView>

      {/* Activity Indicator
      {isLoading && (
        <ActivityIndicator
          size={hp('10%')}
          hidesWhenStopped={true}
          color={CONSTANT.themeColors.primary}
          style={styles.indicatorWrapper}
        />
      )} */}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  indicatorWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(200, 200, 200, 0.15)',
  },
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
    // width: wp('40%'),
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
  footerModal: {
    borderBottomColor: CONSTANT.themeColors.complementary,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  separator: {
    borderRightColor: CONSTANT.themeColors.complementary,
    borderRightWidth: 1,
  },
  footerModalTextStyle: {
    fontFamily: CONSTANT.customFonts.heading2,
    fontSize: CONSTANT.fontSizes.heading2,
    color: CONSTANT.themeColors.primary,
  },
  footerModalCancel: {
    color: CONSTANT.themeColors.warningRed,
  },
  footerModalSubmit: {
    color: CONSTANT.themeColors.success,
  },
  submitButton: {
    fontFamily: CONSTANT.customFonts.heading2,
    fontSize: CONSTANT.fontSizes.heading2,
    color: CONSTANT.themeColors.base,
    backgroundColor: CONSTANT.themeColors.primary,
  },
});

export default AddPoolPage;
