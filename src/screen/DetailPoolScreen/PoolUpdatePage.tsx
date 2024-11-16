import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Pressable, Alert, Image } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import * as Progress from 'react-native-progress';
import moment from 'moment';

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
    reset,
    toggleModal,
    showModal,
  } = useFirebaseStore();

  const {
    getAllDevices,
    dropdownData,
    deviceId,
    filteredDeviceId,
    dropdownIdDevicesValue,
    resetQrCode,
    availableDevices,
    devicesCount,
  } = useDeviceStore();

  const {
    // inputData,
    handleChangeForm,
    pondDetail,
    updatePondData,
    updateOnePond,
    getAllPonds,
  } = usePondStore();

  const [isFocusIdDevices, setIsFocusIdDevices] = useState<boolean>(false);
  const [isFocusPondStatus, setIsFocusPondStatus] = useState<boolean>(false);
  const [dropdownPondStatusValue, setDropdownPondStatusValue] = useState<
    string | undefined
  >();

  const [date, setDate] = useState(pondDetail.seedDate);
  // const [mode, setMode] = useState('date');
  // const [show, setShow] = useState(false);

  const [newPondData, setNewPondData] = useState({
    newPondName: updatePondData.name,
    newPondAddress: updatePondData.address,
    newPondCity: updatePondData.city,
    newPondSeedCount: updatePondData.seedCount,
    newPondSeedDate: updatePondData.seedDate,
    newPondIdDevice: updatePondData.deviceId,
    newPondIsFilled: updatePondData.isFilled,
    newPondImageUrl: updatePondData.imageUrl,
  });

  const navigation = useNavigation();

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;

    if (event?.type === 'dismissed') {
      setDate(date);
      return;
    }

    setDate(currentDate);
    setNewPondData(prevState => ({
      ...prevState,
      newPondSeedDate: selectedDate,
    }));
    console.log(selectedDate);
  };

  const showMode = (currentMode: any) => {
    DateTimePickerAndroid.open({
      value: new Date(),
      onChange,
      mode: currentMode,
    });
  };

  const showDatePicker = () => {
    showMode('date');
  };

  const handleUpdatePond = async () => {
    const updateNewPondData = {
      ...updatePondData,
      name: newPondData.newPondName,
      address: newPondData.newPondAddress,
      city: newPondData.newPondCity,
      seedCount: newPondData.newPondSeedCount,
      seedDate: newPondData.newPondSeedDate,
      deviceId: newPondData.newPondIdDevice === '' ? null : newPondData.newPondIdDevice,
      isFilled: newPondData.newPondIsFilled,
      imageUrl:
        String(useFirebaseStore.getState().firebaseImageURL) === ''
          ? pondDetail.imageUrl
          : String(useFirebaseStore.getState().firebaseImageURL),
    };

    console.log('new pond data: ', updateNewPondData);
    console.log('dropdownIdDevicesValue: ', dropdownIdDevicesValue);

    await updateOnePond(updateNewPondData);

    getAllPonds();

    navigation.goBack();
  };

  useEffect(() => {
    getAllDevices();
    // filterIdDeviceId();
    resetQrCode();
    reset();
  }, []);

  return (
    <View className="my-1">
      {/* Page Title Section */}
      <View>
        <Text style={styles.poolUpdateTitle}>Ubah Data Kolam</Text>
      </View>

      {/* Input Field Section */}
      <View className="mt-4">
        <InputFieldComponent
          inputTitle="Nama Kolam"
          placeholder="Nama Kolam"
          defaultValue={pondDetail.pondName}
          onChangeText={value =>
            setNewPondData(prevState => ({
              ...prevState,
              newPondName: value,
            }))
          }
        />
        <InputFieldComponent
          inputTitle="Alamat Kolam"
          placeholder="Alamat Kolam"
          defaultValue={pondDetail.address}
          onChangeText={value =>
            setNewPondData(prevState => ({
              ...prevState,
              newPondAddress: value,
            }))
          }
        />
        <InputFieldComponent
          inputTitle="Kota"
          placeholder="Kota"
          defaultValue={pondDetail.city}
          onChangeText={value =>
            setNewPondData(prevState => ({
              ...prevState,
              newPondCity: value,
            }))
          }
        />
        <InputFieldComponent
          inputTitle="Jumlah Benih Udang"
          placeholder="Jumlah Benih Udang"
          defaultValue={String(pondDetail.seedCount)}
          onChangeText={value =>
            setNewPondData(prevState => ({
              ...prevState,
              newPondSeedCount: Number(value),
            }))
          }
        />

        <View className="flex flex-row">
          <InputFieldComponent
            inputTitle="Tanggal Masuk Benih"
            placeholder="Tanggal Masuk Benih"
            defaultValue={
              date === null
                ? String(
                    moment(pondDetail.seedDate)
                      .utcOffset('+0700')
                      .format('D MMMM YYYY'),
                  )
                : String(moment(date).utcOffset('+0700').format('D MMMM YYYY'))
            }
            editable={false}
            extededInputStyle={{ width: wp('73%') }}
            onChangeText={() => {
              setNewPondData(prevState => ({
                ...prevState,
                newPondSeedDate: date,
              }));
            }}
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
        <View>
          <Text className="text-black mb-2">Perangkat Tersedia {availableDevices}/{devicesCount}</Text>
        </View>
        <View className="flex-row items-center">
          {pondDetail.deviceId ? (
            <DropdownComponent
              dropdownPlaceholder={
                pondDetail.deviceId ? pondDetail.deviceId : 'Id Perangkat'
              }
              valueField="label"
              labelField="value"
              value={dropdownIdDevicesValue}
              disable={pondDetail.deviceId ? true : false}
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
              onChange={() => {}}
            />
          ) : (
            <DropdownComponent
              dropdownPlaceholder={
                'ID Perangkat'
              }
              valueField="label"
              labelField="value"
              value={dropdownIdDevicesValue}
              disable={pondDetail.deviceId ? true : false}
              dropdownData={
                deviceId !== '' ? filteredDeviceId : dropdownData
              }
              dropdownStyle={{ ...styles.dropdown, width: wp('75%') }}
              isFocus={isFocusIdDevices}
              onFocus={() => {
                setIsFocusIdDevices(true);
              }}
              onBlur={() => setIsFocusIdDevices(false)}
              onChange={(item: any) => {
                // useDeviceStore.setState({
                //   dropdownIdDevicesValue: item.value,
                // });
                
                setNewPondData(prevState => ({
                  ...prevState,
                  newPondIdDevice: item.value,
                }));
              }}
            />
          )}

          {pondDetail.deviceId ? (
            <Pressable
              className="mx-4"
              onPress={() => {
                Alert.alert("Perangkat berhasil dihapus", "Silahkan tekan tombol simpan untuk menyimpan perubahan");
                setNewPondData(prevState => ({
                  ...prevState,
                  newPondIdDevice: null,
                }));
              }}>
              <DeleteIconOutline
                height={hp('3.5%')}
                width={wp('5%')}
                fill={CONSTANT.themeColors.warningRed}
              />
            </Pressable>
          ) : (
            <Pressable
              className="mx-4"
              onPress={() => {
                navigation.navigate('QRCode');
              }}>
              <IconQROutline
                height={hp('3.5%')}
                width={wp('7%')}
                fill={CONSTANT.themeColors.font}
              />
            </Pressable>
          )}
        </View>

        <View className="mt-4">
          <DropdownComponent
            // dropdownPlaceholder="Status Kolam"
            dropdownPlaceholder={pondDetail.isFilled ? 'Terisi' : 'Kosong'}
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

              setNewPondData(prevState => ({
                ...prevState,
                newPondIsFilled: item.status,
              }));

              console.log(isFocusPondStatus);
              setIsFocusPondStatus(false);
            }}
          />
        </View>
      </View>

      <Pressable className="mt-6" onPress={toggleModal}>
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
      <ModalComponent isVisible={showModal}>
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
                  // setNewPondData(prevState => ({
                  //   ...prevState,
                  //   newPondImageUrl: String(firebaseImageURL),
                  // }));
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
              onPress={toggleModal}
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
            handleUpdatePond();
            useFirebaseStore.setState({
              firebaseImageURL: '',
            });
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
