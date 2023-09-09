import React from 'react';
import { StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const WebViewScreen = () => {
  return (
    <WebView
      source={{ uri: 'https://github.com/Aldi-H' }}
      style={styles.webViewStyle}
    />
  );
};

const styles = StyleSheet.create({
  webViewStyle: {
    flex: 1,
  },
});

export default WebViewScreen;
