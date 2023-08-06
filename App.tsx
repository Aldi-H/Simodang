/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import SplashScreen from './src/screen/SplashScreen';
import HomePage from './src/screen/HomePage';

const App = () => {
  const [isloading, setIsLoading] = useState<boolean>(true);

  return isloading ? (
    <>
      <StatusBar hidden={true} />
      <SplashScreen setIsLoading={setIsLoading} />
    </>
  ) : (
    <HomePage />
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
