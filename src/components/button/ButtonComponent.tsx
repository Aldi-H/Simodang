import React from 'react';
import { Pressable, Text, ViewStyle } from 'react-native';

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
    <Pressable style={style} className={className} onPress={onPress}>
      <Text style={style} className="text-center">
        {buttonText}
      </Text>
    </Pressable>
  );
};

export default ButtonComponent;
