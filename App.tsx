/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import SplashScreen from './src/screen/SplashScreen';
import AppNavigator from './src/routes/AppNavigator';

const App = () => {
  const [isloading, setIsLoading] = useState<boolean>(true);

  return isloading ? (
    <>
      <StatusBar hidden={true} />
      <SplashScreen setIsLoading={setIsLoading} />
    </>
  ) : (
    <>
      <AppNavigator />
    </>
  );
};

/* isloading ? (
  <>
    <StatusBar hidden={true} />
    <SplashScreen />
  </>
) : (
  <HomePage />
); */
export default App;
