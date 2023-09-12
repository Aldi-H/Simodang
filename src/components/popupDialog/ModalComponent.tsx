import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import RNModal from 'react-native-modal';
import { CONSTANT } from '../../themes';

type ModalProps = {
  isVisible: boolean;
  children: React.ReactNode;
  [x: string]: any;
};

export const ModalComponent = ({
  isVisible = false,
  children,
  ...props
}: ModalProps) => {
  return (
    <RNModal
      isVisible={isVisible}
      animationInTiming={500}
      animationOutTiming={500}
      backdropTransitionInTiming={1000}
      backdropTransitionOutTiming={1000}
      {...props}>
      {children}
    </RNModal>
  );
};

const ModalContainer = ({ children }: { children: React.ReactNode }) => (
  <View style={styles.container} className="rounded-lg pb-5">
    {children}
  </View>
);

const ModalHeader = ({ title }: { title: string }) => (
  <View className="items-center justify-center">
    <Text style={styles.text} className="text-center p-5">
      {title}
    </Text>
  </View>
);

const ModalBody = ({ children }: { children?: React.ReactNode }) => (
  <View className="justify-center items-center px-5 min-h-[100]">
    {children}
  </View>
);

const ModalFooter = ({ children }: { children?: React.ReactNode }) => (
  <View className="justify-center items-center">{children}</View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: CONSTANT.themeColors.base,
  },
  text: {
    fontFamily: CONSTANT.customFonts.body,
    fontSize: CONSTANT.fontSizes.heading1,
    color: CONSTANT.themeColors.font,
  },
  // body: {
  //   fontFamily: CONSTANT.customFonts.body,
  //   fontSize: CONSTANT.fontSizes.heading2,
  //   // justifyContent: 'center',
  //   // paddingHorizontal: 15,
  //   // minHeight: 100,
  // },
  footer: {
    borderBottomColor: CONSTANT.themeColors.disable,
    borderBottomWidth: StyleSheet.hairlineWidth,
    // justifyContent: 'center',
    // alignItems: 'center',
    // padding: 10,
    // flexDirection: 'row',
  },
});

ModalComponent.Header = ModalHeader;
ModalComponent.Container = ModalContainer;
ModalComponent.Body = ModalBody;
ModalComponent.Footer = ModalFooter;
