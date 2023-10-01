import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

import usePondStore from '../../store/pond/PondStore';

import { CONSTANT } from '../../themes';

import ThresholdFieldComponent from '../../components/Field/ThresholdFieldComponent';
import ButtonComponent from '../../components/button/ButtonComponent';

const PoolSettingPage = () => {
  const { pondDetail, updateThresholdData } = usePondStore();

  const [newLowValue, setNewLowValue] = useState({
    newTempLow: pondDetail.device.tempLow,
    newPHLow: pondDetail.device.phLow,
    newTDOLow: pondDetail.device.tdoLow,
    newTDSLow: pondDetail.device.tdsLow,
    newTurbiditiesLow: pondDetail.device.turbiditiesLow,
  });
  const [newHighValue, setNewHighValue] = useState({
    newTempHigh: pondDetail.device.tempHigh,
    newPHHigh: pondDetail.device.phHigh,
    newTDOHigh: pondDetail.device.tdoHigh,
    newTDSHigh: pondDetail.device.tdsHigh,
    newTurbiditiesHigh: pondDetail.device.turbiditiesHigh,
  });

  const handleUpdateThresholdData = async () => {
    const updatedData = {
      ...pondDetail,
      device: {
        ...pondDetail.device,
        tempLow: String(newLowValue.newTempLow),
        tempHigh: String(newHighValue.newTempHigh),
        phLow: String(newLowValue.newPHLow),
        phHigh: String(newHighValue.newPHHigh),
        tdoLow: String(newLowValue.newTDOLow),
        tdoHigh: String(newHighValue.newTDOHigh),
        tdsLow: String(newLowValue.newTDSLow),
        tdsHigh: String(newHighValue.newTDSHigh),
        turbiditiesLow: String(newLowValue.newTurbiditiesLow),
        turbiditiesHigh: String(newHighValue.newTurbiditiesHigh),
      },
    };

    await updateThresholdData(updatedData);
  };

  return (
    <View className="my-1">
      {/* Threshold Setting Section */}
      <View className="mt-4">
        <View>
          <Text style={styles.poolSettingTitle}>Atur Threshold Parameter</Text>
        </View>

        {/* Threshold Parameter Setup Section */}
        <View className="mb-2">
          <ThresholdFieldComponent
            valueLow={pondDetail.device.tempLow}
            valueHigh={pondDetail.device.tempHigh}
            onChangeLowValue={value =>
              setNewLowValue(prevState => ({
                ...prevState,
                newTempLow: String(value),
              }))
            }
            onChangeHighValue={value =>
              setNewHighValue(prevState => ({
                ...prevState,
                newTempHigh: String(value),
              }))
            }
            type="float"
            thresholdTitle="Suhu"
            thresholdUnit={
              <Text style={styles.appendTextStyle} className="mr-1">
                &#176;C
              </Text>
            }
          />
          <ThresholdFieldComponent
            valueLow={pondDetail.device.phLow}
            valueHigh={pondDetail.device.phHigh}
            onChangeLowValue={value =>
              setNewLowValue(prevState => ({
                ...prevState,
                newPHLow: String(value),
              }))
            }
            onChangeHighValue={value =>
              setNewHighValue(prevState => ({
                ...prevState,
                newPHHigh: String(value),
              }))
            }
            type="float"
            max={14.0}
            thresholdTitle="pH"
          />
          <ThresholdFieldComponent
            valueLow={pondDetail.device.tdoLow}
            valueHigh={pondDetail.device.tdoHigh}
            onChangeLowValue={value =>
              setNewLowValue(prevState => ({
                ...prevState,
                newTDOLow: String(value),
              }))
            }
            onChangeHighValue={value =>
              setNewHighValue(prevState => ({
                ...prevState,
                newTDOHigh: String(value),
              }))
            }
            type="float"
            thresholdTitle="TDO"
            thresholdUnit={
              <Text style={styles.appendTextStyle} className="mr-1">
                mg/L
              </Text>
            }
          />
          <ThresholdFieldComponent
            valueLow={pondDetail.device.tdsLow}
            valueHigh={pondDetail.device.tdsHigh}
            onChangeLowValue={value =>
              setNewLowValue(prevState => ({
                ...prevState,
                newTDSLow: String(value),
              }))
            }
            onChangeHighValue={value =>
              setNewHighValue(prevState => ({
                ...prevState,
                newTDSHigh: String(value),
              }))
            }
            type="int"
            thresholdTitle="TDS"
            thresholdUnit={
              <Text style={styles.appendTextStyle} className="mr-1">
                ppm
              </Text>
            }
          />
          <ThresholdFieldComponent
            valueLow={pondDetail.device.turbiditiesLow}
            valueHigh={pondDetail.device.turbiditiesHigh}
            onChangeLowValue={value =>
              setNewLowValue(prevState => ({
                ...prevState,
                newTurbiditiesLow: String(value),
              }))
            }
            onChangeHighValue={value =>
              setNewHighValue(prevState => ({
                ...prevState,
                newTurbiditiesHigh: String(value),
              }))
            }
            type="float"
            thresholdTitle="Turbiditas"
            thresholdUnit={
              <Text style={styles.appendTextStyle} className="mr-1">
                NTU
              </Text>
            }
          />
        </View>
      </View>

      {/* Button Section */}
      <View className="my-10">
        <ButtonComponent
          buttonText="Simpan Perubahan"
          style={styles.saveButton}
          className="rounded-md w-fit px-3 py-1.5 text-center align-middle"
          onPress={() => {
            handleUpdateThresholdData();
            // console.log('Button Save Pressed');
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  poolSettingTitle: {
    fontFamily: CONSTANT.customFonts.heading2,
    fontSize: CONSTANT.fontSizes.heading2,
    color: CONSTANT.themeColors.font,
  },
  saveButton: {
    backgroundColor: CONSTANT.themeColors.primary,
    fontFamily: CONSTANT.customFonts.body,
    fontSize: CONSTANT.fontSizes.body,
    color: CONSTANT.themeColors.base,
  },
  widthInputContainer: {
    width: wp('15%'),
  },
  appendTextStyle: {
    fontFamily: CONSTANT.customFonts.body,
    fontSize: CONSTANT.fontSizes.caption,
    color: CONSTANT.themeColors.font,
  },
});

export default PoolSettingPage;
