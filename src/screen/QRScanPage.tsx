import React from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import useDeviceStore from '../store/device/DeviceStore';
import { StackActions, useNavigation } from '@react-navigation/native';
import usePondStore from '../store/pond/PondStore';

const QRScanPage = () => {
  const navigation = useNavigation();

  const { setQrCode, filterIdDeviceId } = useDeviceStore();

  const onSuccess = (event: string) => {
    setQrCode(event);

    filterIdDeviceId();

    navigation.goBack();
  };

  return (
    <>
      <QRCodeScanner
          onRead={({ data }) => onSuccess(data)}
          reactivate={true}
          reactivateTimeout={1000}
          showMarker={true}
        />
    </>
  );
};

export default QRScanPage;
