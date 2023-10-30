// import React, { useState } from 'react';
import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import {
  // widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { CONSTANT } from '../../themes';
import { ChartDropdown } from '../../utils/dropdownData/DropdownData';

type DropdownProps = {
  isFocus: boolean;
  disable?: boolean;
  value: string | undefined;
  dropdownStyle: ViewStyle;
  labelField: 'value' | 'label';
  valueField: 'value' | 'label';
  itemContainerStyle?: ViewStyle;
  dropdownPlaceholder?: string;
  dropdownData?: { value: string; label: string }[];
  onFocus: () => void;
  onBlur: () => void;
  onChange: (item: any) => void;
};

const DropdownComponent = ({
  isFocus,
  value,
  onFocus,
  onBlur,
  disable,
  onChange,
  labelField,
  valueField,
  itemContainerStyle,
  dropdownStyle,
  dropdownPlaceholder,
  dropdownData = ChartDropdown,
}: DropdownProps) => {
  // const [value, setValue] = useState<string | undefined>();
  // const [isFocus, setIsFocus] = useState<boolean>(false);

  const initialPlaceholder = dropdownData[0]?.label;

  return (
    <View style={styles.container}>
      <Dropdown
        style={[dropdownStyle, isFocus && styles.dropdownFocus]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        containerStyle={styles.dropdownContainer}
        itemTextStyle={styles.itemTextStyle}
        itemContainerStyle={[styles.dropdownItemContainer, itemContainerStyle]}
        fontFamily={CONSTANT.customFonts.body}
        data={dropdownData}
        labelField={labelField}
        valueField={valueField}
        disable={disable}
        placeholder={
          !isFocus ? dropdownPlaceholder || initialPlaceholder : '...'
        }
        // placeholder={
        //   !isFocus ? dropdownPlaceholder || initialPlaceholder : '...'
        // }
        // value={value}
        value={value}
        // onFocus={() => setIsFocus(true)}
        // onBlur={() => setIsFocus(false)}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onChange}
        // onChange={item => {
        //   setValue(item.value);
        //   setIsFocus(false);
        // }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: CONSTANT.themeColors.base,
  },
  dropdownItemContainer: {
    height: hp('7.5%'),
    borderRadius: 4,
  },
  dropdownContainer: {
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
