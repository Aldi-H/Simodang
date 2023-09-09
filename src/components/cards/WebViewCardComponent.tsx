import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import {
  // widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { TouchableOpacity } from 'react-native-gesture-handler';

import WebViewImage1 from '../../assets/images/WebViewImage1.svg';
import { CONSTANT } from '../../themes';
import { useNavigation } from '@react-navigation/native';

const WebViewCardComponent = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.WebViewCardContainer}
      className="flex rounded-md shadow-md shadow-gray-600"
      onPress={() => {
        console.log('WebView Card Pressed');
        navigation.navigate('WebViewPage');
      }}>
      <View className="absolute self-center inset-0 object-cover z-0 my-16">
        <WebViewImage1 height={hp('13%')} />
      </View>
      <View className="relative z-10 mt-4 mx-6 items-center">
        {/* Change This Text later */}
        <Text style={styles.WebViewContentTitle} className="text-center ">
          Ketahui Parameter Kondisi Kolam Udang yang Baik dalam Mengelola Kolam
          Udang
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  WebViewCardContainer: {
    backgroundColor: CONSTANT.themeColors.base,
    height: hp('22%'),
  },
  imageContainer: {
    height: hp('1%'),
  },
  WebViewContentTitle: {
    fontFamily: CONSTANT.customFonts.heading2,
    fontSize: CONSTANT.fontSizes.body,
    color: CONSTANT.themeColors.font,
  },
});

export default WebViewCardComponent;
