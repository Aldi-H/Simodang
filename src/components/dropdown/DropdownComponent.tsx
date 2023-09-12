import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import {
  // widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { CONSTANT } from '../../themes';
import axios from 'axios';

// type DataDropdown = {
//   Value: string;
//   Label: string;
// };

type DropdownProps = {
  dropdownStyle: ViewStyle;
};

const DropdownComponent = ({ dropdownStyle }: DropdownProps) => {
  const [value, setValue] = useState<string | undefined>();
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [dropdownData, setDropdownData] = useState<
    { value: string; label: string }[]
  >([]);

  const getDeviceData = async () => {
    try {
      const response = await axios.get(
        'http://www.devel-filkomub.site/devices',
      );
      const data = response.data.map(
        (valueItem: { id: string; name: string }) => {
          return {
            value: valueItem.id,
            label: valueItem.id,
          };
        },
      );
      setDropdownData(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getDeviceData();
  }, []);

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
  /* dropdown: {
    height: hp('4%'),
    width: wp('30%'),
    borderColor: CONSTANT.themeColors.disable,
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  }, */
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
