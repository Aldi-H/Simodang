import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { CONSTANT } from '../../themes';

type TransactionCardProps = {
  title: string;
  status: number
  createdAt: string;
  expiredAt: string;
  onPress?: () => void;
};

const TransactionCardComponent = ({
  title,
  status,
  createdAt,
  expiredAt,
  onPress,
}: TransactionCardProps) => {

  return (
    <View
      style={styles.WebViewCardContainer}
      className="rounded-md shadow-md drop-shadow-sm shadow-gray-600 mx-2">
      <TouchableOpacity
        className="flex flex-row mr-32 ml-4 my-3  "
        onPress={onPress}>
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
            <Text style={styles.articleDate}>{createdAt} - {expiredAt}</Text>
          </View>
            <Text className={`${bgColor(status)} rounded-full px-3 py-1 text-sm font-semibold text-black text-center`}>{statusText(status)}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const statusText = (status: number) => {
  if (status === 0) {
    return 'Pending';
  } else if (status === 1) {
    return 'Success';
  } else {
    return 'Failed';
  }
}

const bgColor = (status: number) => {
  if (status === 0) {
    return 'bg-red-400';
  } else if (status === 1) {
    return 'bg-green-400';
  } else {
    return 'bg-amber-400';
  }
}

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

export default TransactionCardComponent;
