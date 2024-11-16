import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import {
  RouteProp,
  // useNavigation,
  useRoute,
} from '@react-navigation/native';

import { RootStackParamList } from '../routes/NavigationTypes';

type WebViewScreenProps = RouteProp<RootStackParamList, 'WebViewScreen'>;

const WebViewScreen = () => {
  const url = useRoute<WebViewScreenProps>().params?.url ?? '';

  return (
    <WebView source={{ uri: url }} style={styles.webViewStyle} />
  );
};

const styles = StyleSheet.create({
  webViewStyle: {
    flex: 1,
  },
});

export default WebViewScreen;
