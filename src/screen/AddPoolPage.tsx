import axios from 'axios';
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Button,
} from 'react-native';
import DocumentPicker, {
  DocumentPickerResponse,
} from 'react-native-document-picker';

const AddPoolPage = () => {
  const [singleFile, setSingleFile] = useState<DocumentPickerResponse[] | null>(
    null,
  );
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [deviceId, setDeviceId] = useState('');
  // const [name, setName] = useState('');
  // const [data, setData] = useState(new FormData());
  // const [data, setData] = useState({
  //   name: '',
  //   address: '',
  //   city: '',
  //   deviceId: '',
  //   file: singleFile,
  // });

  const handleChangeName = (text: string) => {
    setName(text);
  };
  const handleChangeAddress = (text: string) => {
    setAddress(text);
  };
  const handleChangeCity = (text: string) => {
    setCity(text);
  };
  const handleChangeDeviceId = (text: string) => {
    setDeviceId(text);
  };

  const selectFile = async () => {
    try {
      const response = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      console.log(response);

      setSingleFile(response);
    } catch (error) {
      setSingleFile(null);
      if (DocumentPicker.isCancel(error)) {
        console.log('Canceled');
      } else {
        console.log('Unknown Error: ' + JSON.stringify(error));
        throw error;
      }
    }
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      formData.append('name', name);
      formData.append('address', address);
      formData.append('city', city);
      formData.append('deviceId', deviceId);
      formData.append('file', {
        uri: singleFile![0].uri,
        type: singleFile![0].type,
        name: singleFile![0].name,
      });

      const response = await axios.post(
        'http://www.devel-filkomub.site/ponds',
        formData,
        {
          headers: {
            Authorization:
              'Bearer c55395c467dc5f4d8caee3d6b53c5f17d4c24b28976bcf387f1b9feb563e',
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      console.log('Response from server:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Nama"
        onChangeText={handleChangeName}
        value={name}
      />
      <TextInput
        placeholder="Alamat"
        onChangeText={handleChangeAddress}
        value={address}
      />
      <TextInput
        placeholder="Kota"
        onChangeText={handleChangeCity}
        value={city}
      />
      <TextInput
        placeholder="Device Id"
        onChangeText={handleChangeDeviceId}
        value={deviceId}
      />
      <TouchableOpacity
        style={styles.buttonStyle}
        activeOpacity={0.5}
        onPress={selectFile}>
        <Text style={styles.buttonTextStyle}>Select File</Text>
      </TouchableOpacity>

      <Button onPress={() => handleSubmit()} title="Submit" />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: '#307ecc',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#307ecc',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 15,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  textStyle: {
    backgroundColor: '#fff',
    fontSize: 15,
    marginTop: 16,
    marginLeft: 35,
    marginRight: 35,
    textAlign: 'center',
  },
});

export default AddPoolPage;
