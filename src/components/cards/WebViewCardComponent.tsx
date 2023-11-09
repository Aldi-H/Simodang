import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { CONSTANT } from '../../themes';

type WebViewCardProps = {
  title: string;
  imageUri: string;
  createdAt: string;
  onPress?: () => void;
};

const WebViewCardComponent = ({
  title,
  imageUri,
  createdAt,
  onPress,
}: WebViewCardProps) => {
  return (
    <View
      style={styles.WebViewCardContainer}
      className="rounded-md shadow-md drop-shadow-sm shadow-gray-600 mx-2">
      <TouchableOpacity
        className="flex flex-row mr-32 ml-4 my-3  "
        onPress={onPress}>
        <View>
          {/* <WebViewImage1 height={hp('13%')} /> */}
          <Image
            source={{ uri: imageUri }}
            style={{
              height: hp('10%'),
              width: wp('20%'),
            }}
          />
        </View>
        <View className="flex flex-col justify-between space-y-2 ml-4 mr-1">
          <View>
            <Text
              style={styles.WebViewContentTitle}
              numberOfLines={4}
              className="text-ellipsis">
              {title}
            </Text>
          </View>
          <View>
            <Text style={styles.articleDate}>{createdAt}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  WebViewCardContainer: {
    backgroundColor: CONSTANT.themeColors.base,
  },
  WebViewContentTitle: {
    fontFamily: CONSTANT.customFonts.heading2,
    fontSize: CONSTANT.fontSizes.body,
    color: CONSTANT.themeColors.font,
  },
  articleDate: {
    fontFamily: CONSTANT.customFonts.caption,
    fontSize: CONSTANT.fontSizes.caption,
    color: CONSTANT.themeColors.font,
  },
});

export default WebViewCardComponent;
