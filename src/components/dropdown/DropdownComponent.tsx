import React, { useState } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import {
  // widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { CONSTANT } from '../../themes';
import { ChartDropdown } from '../../utils/dropdownData/DropdownData';

type DropdownProps = {
  dropdownStyle: ViewStyle;
  dropdownPlaceholder?: string;
  dropdownData?: { value: string; label: string }[];
};

const DropdownComponent = ({
  dropdownStyle,
  dropdownPlaceholder,
  dropdownData = ChartDropdown,
}: DropdownProps) => {
  const [value, setValue] = useState<string | undefined>();
  const [isFocus, setIsFocus] = useState<boolean>(false);

  const initialPlaceholder = dropdownData[0]?.label;

  return (
    <View style={styles.container}>
      <Dropdown
        style={[dropdownStyle, isFocus && styles.dropdownFocus]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        containerStyle={styles.dropdownContainer}
        itemTextStyle={styles.itemTextStyle}
        itemContainerStyle={styles.dropdownItemContainer}
        fontFamily={CONSTANT.customFonts.body}
        data={dropdownData}
        labelField="label"
        valueField="value"
        placeholder={
          !isFocus ? dropdownPlaceholder || initialPlaceholder : '...'
        }
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
