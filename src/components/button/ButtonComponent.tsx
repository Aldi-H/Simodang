import React from 'react';
import { Text, ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

type ButtonComponent = {
  buttonText: string;
  onPress: () => void;
  className: string;
  style?: ViewStyle;
};

const ButtonComponent = ({
  buttonText,
  onPress,
  style,
  className,
}: ButtonComponent) => {
  return (
    <TouchableOpacity style={style} className={className} onPress={onPress}>
      <Text style={style} className="text-center">
        {buttonText}
      </Text>
    </TouchableOpacity>
  );
};

export default ButtonComponent;
