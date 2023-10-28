import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

import { CONSTANT } from '../../themes';

import usePondStore from '../../store/pond/PondStore';
import { PondsStatusDropdown } from '../../utils/dropdownData/DropdownData';

import CalendarIconOutline from '../../assets/icons/CalendarIconOutline.svg';
import InputFieldComponent from '../../components/input/InputFieldComponent';
import ButtonComponent from '../../components/button/ButtonComponent';
import DropdownComponent from '../../components/dropdown/DropdownComponent';

const PoolUpdatePage = () => {
  const { inputData, handleChangeForm } = usePondStore();

  const [isFocusPondStatus, setIsFocusPondStatus] = useState<boolean>(false);
  const [dropdownPondStatusValue, setDropdownPondStatusValue] = useState<
    string | undefined
  >();

  const [date, setDate] = useState(new Date());
  // const [mode, setMode] = useState('date');
  // const [show, setShow] = useState(false);

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

  return (
    <View className="my-1">
      {/* Page Title Section */}
      <View>
        <Text style={styles.poolUpdateTitle}>Ubah Data Kolam</Text>
      </View>

      {/* Input Field Section */}
      <View className="mt-5">
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
});

export default PoolUpdatePage;
