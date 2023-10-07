/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';
// import usePondStore from './src/store/pond/PondStore';

const requestPermission = async () => {
  const authStatus = await messaging().requestPermission();
  console.log('Authorization status(authStatus):', authStatus);

  return (
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL
  );
};

const getToken = async () => {
  const authStatus = await requestPermission();
  if (authStatus) {
    await messaging().registerDeviceForRemoteMessages();
    await messaging()
      .getToken()
      .then(fcmToken => {
        console.log(`${fcmToken}`);
      });
  } else {
    console.log('Not Authorization Status: ', authStatus);
  }
};

getToken();

AppRegistry.registerComponent(appName, () => App);
