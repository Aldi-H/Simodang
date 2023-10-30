import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Pressable, Alert, Image } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import * as Progress from 'react-native-progress';

import { CONSTANT } from '../../themes';

import usePondStore from '../../store/pond/PondStore';
import useDeviceStore from '../../store/device/DeviceStore';
import useFirebaseStore from '../../store/firebase/FirebaseStore';
import { PondsStatusDropdown } from '../../utils/dropdownData/DropdownData';

import { PhotoIcon } from 'react-native-heroicons/solid';
import CalendarIconOutline from '../../assets/icons/CalendarIconOutline.svg';
import IconQROutline from '../../assets/icons/IconQROutline.svg';
import DeleteIconOutline from '../../assets/icons/DeleteIconOutline.svg';
import InputFieldComponent from '../../components/input/InputFieldComponent';
import ButtonComponent from '../../components/button/ButtonComponent';
import DropdownComponent from '../../components/dropdown/DropdownComponent';
import { ModalComponent } from '../../components/popupDialog/ModalComponent';

const PoolUpdatePage = () => {
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

  const { inputData, handleChangeForm, pondDetail } = usePondStore();

  const [isFocusIdDevices, setIsFocusIdDevices] = useState<boolean>(false);
  const [isFocusPondStatus, setIsFocusPondStatus] = useState<boolean>(false);
  const [dropdownPondStatusValue, setDropdownPondStatusValue] = useState<
    string | undefined
  >();

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const [date, setDate] = useState(new Date());
  // const [mode, setMode] = useState('date');
  // const [show, setShow] = useState(false);

  const navigation = useNavigation();

  const handleModal = () => {
    setIsModalVisible(() => !isModalVisible);
  };

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;

    if (event?.type === 'dismissed') {
      setDate(date);
      return;
    }

    setDate(currentDate);
    console.log(selectedDate);
  };

  const showMode = (currentMode: any) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
    });
  };

  const showDatePicker = () => {
    showMode('date');
  };

  useEffect(() => {
    getAllDevices();
    filterIdDeviceId();
  }, [deviceId, getAllDevices, filterIdDeviceId]);

  return (
    <View className="my-1">
      {/* Page Title Section */}
      <View>
        <Text style={styles.poolUpdateTitle}>Ubah Data Kolam</Text>
      </View>

      {/* Input Field Section */}
      <View className="mt-4">
        <InputFieldComponent inputTitle="Nama Kolam" placeholder="Nama Kolam" />
        <InputFieldComponent
          inputTitle="Alamat Kolam"
          placeholder="Alamat Kolam"
        />
        <InputFieldComponent inputTitle="Kota" placeholder="Kota" />
        <InputFieldComponent
          inputTitle="Jumlah Benih Udang"
          placeholder="Jumlah Benih Udang"
        />

        <View className="flex flex-row">
          <InputFieldComponent
            inputTitle="Tanggal Masuk Benih"
            placeholder="Tanggal Masuk Benih"
            editable={false}
            extededInputStyle={{ width: wp('73%') }}
            rightIcon={
              <Pressable
                className="mx-2 justify-center justify-items-center"
                onPress={showDatePicker}>
                <CalendarIconOutline
                  height={hp('3.5%')}
                  width={wp('7%')}
                  fill={CONSTANT.themeColors.font}
                />
              </Pressable>
            }
          />
        </View>
      </View>

      <View className="flex mt-4">
        <View className="flex-row items-center">
          <DropdownComponent
            dropdownPlaceholder={
              deviceId === filteredDeviceId[0]?.value
                ? deviceId
                : 'Id Perangkat'
            }
            valueField="label"
            labelField="value"
            value={dropdownIdDevicesValue}
            disable={pondDetail.deviceId ? false : true}
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

          {pondDetail.deviceId ? (
            <Pressable
              className="mx-4"
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
          ) : (
            <Pressable
              className="mx-4"
              onPress={() => {
                Alert.alert('Perangkat Berhasil di Hapus');
              }}>
              <DeleteIconOutline
                height={hp('3.5%')}
                width={wp('5%')}
                fill={CONSTANT.themeColors.warningRed}
              />
            </Pressable>
          )}
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
                    <Text style={styles.maxFileSize} className="text-center">
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
                <Text style={styles.footerModalTextStyle}>Buka Kamera</Text>
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
                style={[styles.footerModalTextStyle, styles.footerModalCancel]}>
                Cancel
              </Text>
            </Pressable>
          </ModalComponent.Footer>
        </ModalComponent.Container>
      </ModalComponent>

      {/* Buttoon Section */}
      <View className="mt-12 mb-6">
        <ButtonComponent
          buttonText="Simpan"
          style={styles.submitButton}
          className="rounded-md h-fit py-1"
          onPress={() => {
            console.log('Pressed');
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  poolUpdateTitle: {
    fontFamily: CONSTANT.customFonts.heading2,
    fontSize: CONSTANT.fontSizes.heading2,
    color: CONSTANT.themeColors.font,
  },
  inputContainer: {
    borderColor: CONSTANT.themeColors.disable,
    height: hp('6%'),
    width: wp('75%'),
  },
  submitButton: {
    fontFamily: CONSTANT.customFonts.heading2,
    fontSize: CONSTANT.fontSizes.heading2,
    color: CONSTANT.themeColors.base,
    backgroundColor: CONSTANT.themeColors.primary,
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
});

export default PoolUpdatePage;
