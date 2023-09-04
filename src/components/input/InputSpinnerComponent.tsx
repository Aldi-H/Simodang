import React from 'react';
import { Text, View, ViewStyle, TextInput, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { CONSTANT } from '../../themes';
import MinusIcon from '../../assets/icons/MinusIcon.svg';
import PlusIcon from '../../assets/icons/PlusIcon.svg';

type ThresholdFieldProps = {
  thresholdUnit?: string;
  thresholdUnitContainer?: string;
  width?: ViewStyle;
};

const InputSpinnerComponent = ({
  thresholdUnit,
  width,
  thresholdUnitContainer,
}: ThresholdFieldProps) => {
  return (
    <View className="flex flex-row items-center space-x-1 content-center justify-between">
      <View>
        <TouchableOpacity>
          <MinusIcon
            fill={CONSTANT.themeColors.primary}
            height={hp('5%')}
            width={wp('7%')}
          />
        </TouchableOpacity>
      </View>
      <View className="flex-row items-center">
        <TextInput
          textAlign="center"
          style={[styles.inputContainer, width]}
          placeholderTextColor={CONSTANT.themeColors.disable}
          defaultValue="50"
          className="my-2 rounded-md text-center p-0"
          placeholder=""
        />
        <View className={thresholdUnitContainer}>
          <Text style={styles.thresholdUnit}>{thresholdUnit}</Text>
        </View>
      </View>
      <View>
        <TouchableOpacity>
          <PlusIcon
            fill={CONSTANT.themeColors.primary}
            height={hp('5%')}
            width={wp('7%')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    fontFamily: CONSTANT.customFonts.body,
    fontSize: CONSTANT.fontSizes.body,
    color: CONSTANT.themeColors.font,
    backgroundColor: CONSTANT.themeColors.base,
    // width: wp('15%'),
    height: hp('4%'),
  },
  thresholdUnit: {
    fontFamily: CONSTANT.customFonts.caption,
    fontSize: CONSTANT.fontSizes.body,
    color: CONSTANT.themeColors.disable,
  },
});

export default InputSpinnerComponent;
