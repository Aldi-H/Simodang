import React, { Dispatch, SetStateAction } from 'react';
import { StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

interface SplashProps {
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const SplashScreen = ({ setIsLoading }: SplashProps) => {
  return (
    <LottieView
      style={styles.lottieContainer}
      source={require('../assets/splashScreen/SimodangSpalshScreen.json')}
      autoPlay
      loop={false}
      resizeMode="cover"
      onAnimationFinish={() => setIsLoading(false)}
    />
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
