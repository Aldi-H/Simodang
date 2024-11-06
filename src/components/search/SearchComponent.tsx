import React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { MagnifyingGlassIcon } from 'react-native-heroicons/solid';

import { CONSTANT } from '../../themes';
import { TouchableOpacity } from 'react-native-gesture-handler';

// search component props
interface SearchComponentProps {
  onChange: React.Dispatch<React.SetStateAction<string>>;
}

const SearchComponent = ({
  onChange,
}: SearchComponentProps) => {
  return (
    <View
      style={styles.searchContainer}
      className="flex flex-row items-center w-full rounded-md text-gray-500">
      <TouchableOpacity className="ml-2">
        <MagnifyingGlassIcon strokeWidth={2} fill="black" size={hp('3.5%')} />
      </TouchableOpacity>
      <View className="mx-2">
        <TextInput style={styles.searchPlaceholder} placeholder="Cari Disini" onChangeText={onChange} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    backgroundColor: CONSTANT.themeColors.base,
    height: hp('5.5%'),
  },
  searchPlaceholder: {
    fontFamily: CONSTANT.customFonts.body,
    fontSize: CONSTANT.fontSizes.body,
    color: CONSTANT.themeColors.disable,
    width: wp('70%'),
  },
});

export default SearchComponent;
