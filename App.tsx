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
import { DurationProvider } from './src/context/ChartDurationContext';
import Toast from 'react-native-toast-message';

const App = () => {
  const [isloading, setIsLoading] = useState<boolean>(true);

  return (
    <>
      <GestureHandlerRootView style={styles.gestureHandlerContainer}>
        <DurationProvider>
          {isloading ? (
            <>
              <SplashScreen setIsLoading={setIsLoading} />
            </>
          ) : (
            <>
              <AppNavigator />
            </>
          )}
        </DurationProvider>
      </GestureHandlerRootView>
      <Toast />
    </>
  );
};

const styles = StyleSheet.create({
  gestureHandlerContainer: {
    flex: 1,
  },
});

export default App;
