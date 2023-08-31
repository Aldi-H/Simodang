import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

import { CONSTANT } from '../../themes';

type InputCheckBoxProps = {
  toggleCheckBox: boolean;
  onValueChange: (newValue: boolean) => void;
};

const InputCheckBoxComponent = ({
  toggleCheckBox,
  onValueChange,
}: InputCheckBoxProps) => {
  return (
    <View className="flex flex-row space-x-2 items-center">
      <View>
        <CheckBox
          disabled={false}
          value={toggleCheckBox}
          onValueChange={onValueChange}
        />
      </View>
      <View style={styles.labelContainer}>
        <Text style={styles.checkBoxLabel}>
          Data di atas adalah milik saya dan saya telah menyetujui
          <Text style={styles.warningCheckBoxLabel}>
            {' '}
            Syarat & Ketentuan
          </Text>{' '}
          serta
          <Text style={styles.warningCheckBoxLabel}> Kebijakan Privasi.</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  labelContainer: {
    width: wp('65%'),
  },
  checkBoxLabel: {
    fontFamily: CONSTANT.customFonts.caption,
    fontSize: CONSTANT.fontSizes.caption,
    color: CONSTANT.themeColors.font,
  },
  warningCheckBoxLabel: {
    color: CONSTANT.themeColors.warningRed,
  },
});

export default InputCheckBoxComponent;
