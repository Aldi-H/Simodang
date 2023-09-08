import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import BackIcon from '../assets/icons/BackIcon.svg';
import { CONSTANT } from '../themes';
import InputFieldComponent from '../components/input/InputFieldComponent';

const AddPoolPage = () => {
  const navigation = useNavigation();

  return (
    <KeyboardAvoidingView
      style={styles.KeyboardAvoidingView}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView>
        <SafeAreaView className="m-4 my-5 px-3">
          {/* Header Title */}
          <View className="flex flex-row items-center justify-between mt-4">
            <Pressable
              onPress={() => navigation.goBack()}
              className="items-start">
              <BackIcon fill={CONSTANT.themeColors.font} />
            </Pressable>
            <View className="items-center">
              <Text style={styles.addPoolHeaderTitle}>Add Pool Page</Text>
            </View>
            <View />
          </View>

          {/* Input Section */}
          <View className="items-center">
            <InputFieldComponent
              inputTitle="Nama Kolam"
              placeholder="Nama Kolam"
            />
          </View>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  KeyboardAvoidingView: {
    flex: 1,
  },
  addPoolHeaderTitle: {
    fontFamily: CONSTANT.customFonts.heading1,
    fontSize: CONSTANT.fontSizes.heading1,
    color: CONSTANT.themeColors.font,
  },
});

export default AddPoolPage;
