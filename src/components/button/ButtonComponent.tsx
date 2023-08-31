import React from 'react';
import { Text, ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

type ButtonComponent = {
  buttonText: string;
  className: string;
  style?: ViewStyle;
};

const ButtonComponent = ({ buttonText, style, className }: ButtonComponent) => {
  return (
    <TouchableOpacity style={style} className={className}>
      <Text style={style}>{buttonText}</Text>
    </TouchableOpacity>
  );
};

export default ButtonComponent;
