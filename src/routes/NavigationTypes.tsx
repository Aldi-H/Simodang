import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Homes: undefined;
  Monitor: { deviceId: String };
  Profile: { userId: String };
};

export type MonitorScreen = NativeStackScreenProps<
  RootStackParamList,
  'Monitor'
>;

export type ProfileScreen = NativeStackScreenProps<
  RootStackParamList,
  'Profile'
>;
