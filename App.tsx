/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import SplashScreen from './src/screen/SplashScreen';
import AppNavigator from './src/routes/AppNavigator';

const App = () => {
  const [isloading, setIsLoading] = useState<boolean>(true);

  return (
    <GestureHandlerRootView style={styles.gestureHandlerContainer}>
      {isloading ? (
        <>
          <SplashScreen setIsLoading={setIsLoading} />
        </>
      ) : (
        <>
          <AppNavigator />
        </>
      )}
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  gestureHandlerContainer: {
    flex: 1,
  },
});

export default App;
