import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  // Switch
} from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

import usePondStore from '../../store/pond/PondStore';

import { CONSTANT } from '../../themes';

import ThresholdFieldComponent from '../../components/Field/ThresholdFieldComponent';
import ButtonComponent from '../../components/button/ButtonComponent';

const PoolSettingPage = () => {
  const { pondDetail } = usePondStore();

  // const [isEnabled, setIsEnabled] = useState(false);
  // const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View className="my-1">
      {/* Notif Setting Section */}
      {/* <View className="flex flex-row justify-between items-center">
        <Text style={styles.poolSettingTitle}>Atur Notifikasi</Text>
        <Switch
          trackColor={{
            false: CONSTANT.themeColors.disable,
            true: CONSTANT.themeColors.complementary,
          }}
          thumbColor={
            isEnabled ? CONSTANT.themeColors.primary : CONSTANT.themeColors.base
          }
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View> */}

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
            type="float"
            max={14.0}
            thresholdTitle="pH"
          />
          <ThresholdFieldComponent
            valueLow={pondDetail.device.tdoLow}
            valueHigh={pondDetail.device.tdoHigh}
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
          onPress={() => console.log('Button Save Pressed')}
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
