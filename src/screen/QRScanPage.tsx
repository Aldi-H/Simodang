import React from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import useDeviceStore from '../store/device/DeviceStore';
import { useNavigation } from '@react-navigation/native';
import usePondStore from '../store/pond/PondStore';

const QRScanPage = () => {
  const { scan } = useDeviceStore();
  const { handleChangeForm } = usePondStore();

  const navigation = useNavigation();

  const onSuccess = (event: string) => {
    useDeviceStore.setState({ scan: false });
    useDeviceStore.setState({ scanResult: true });
    useDeviceStore.setState({ deviceId: event });

    handleChangeForm({
      deviceId: useDeviceStore.getState().deviceId,
    });

    navigation.goBack();

    // navigation.navigate('AddPool');
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
