import React from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import useDeviceStore from '../store/device/DeviceStore';
import { useNavigation } from '@react-navigation/native';

const QRScanPage = () => {
  const { scan } = useDeviceStore();

  const navigation = useNavigation();

  const onSuccess = (event: string) => {
    useDeviceStore.setState({ scan: false });
    useDeviceStore.setState({ scanResult: true });
    useDeviceStore.setState({ deviceId: event });

    navigation.navigate('AddPool');

    // console.log(event);
  };

  return (
    <>
      {scan && (
        <QRCodeScanner
          onRead={({ data }) => onSuccess(data)}
          reactivate={true}
          reactivateTimeout={1000}
          showMarker={true}
        />
      )}
    </>
  );
};

export default QRScanPage;
