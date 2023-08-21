import React, { Dispatch, SetStateAction } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

interface SplashProps {
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const SplashScreen = ({ setIsLoading }: SplashProps) => {
  return (
    <>
      <StatusBar hidden={true} />
      <LottieView
        style={styles.lottieContainer}
        source={require('../assets/splashScreen/SimodangSpalshScreen.json')}
        autoPlay
        loop={false}
        resizeMode="cover"
        onAnimationFinish={() => setIsLoading(false)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  lottieContainer: {
    flex: 1,
    alignItems: 'center',
    margin: 0,
    paddng: 0,
  },
});

export default SplashScreen;
