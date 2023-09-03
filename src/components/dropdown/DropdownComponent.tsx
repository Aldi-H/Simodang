import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { CONSTANT } from '../../themes';

const DropdownComponent = () => {
  const [value, setValue] = useState<string>();
  const [isFocus, setIsFocus] = useState<boolean>(false);

  const data = [
    {
      label: 'TDS',
      value: '1',
    },
    {
      label: 'TDO',
      value: '2',
    },
    {
      label: 'pH',
      value: '3',
    },
    {
      label: 'Suhu',
      value: '4',
    },
    {
      label: 'Turbiditas',
      value: '5',
    },
  ];

  return (
    <View style={styles.container}>
      <Dropdown
        style={[styles.dropdown, isFocus && styles.dropdownFocus]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        containerStyle={styles.dropdownContainer}
        itemTextStyle={styles.itemTextStyle}
        itemContainerStyle={styles.dropdownItemContainer}
        fontFamily={CONSTANT.customFonts.body}
        data={data}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Ubah Chart' : '...'}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item.value);
          setIsFocus(false);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: CONSTANT.themeColors.base,
  },
  dropdown: {
    height: hp('4%'),
    width: wp('30%'),
    borderColor: CONSTANT.themeColors.disable,
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  dropdownItemContainer: {
    height: hp('7.5%'),
    borderRadius: 4,
  },
  dropdownContainer: {
    height: hp('38%'),
    borderRadius: 4,
  },
  itemTextStyle: {
    fontFamily: CONSTANT.customFonts.body,
    fontSize: CONSTANT.fontSizes.body,
    color: CONSTANT.themeColors.font,
  },
  dropdownFocus: {
    borderColor: CONSTANT.themeColors.primary,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontFamily: CONSTANT.customFonts.body,
    fontSize: CONSTANT.fontSizes.body,
    color: CONSTANT.themeColors.font,
  },
  selectedTextStyle: {
    fontFamily: CONSTANT.customFonts.body,
    fontSize: CONSTANT.fontSizes.body,
    color: CONSTANT.themeColors.font,
  },
});

export default DropdownComponent;
