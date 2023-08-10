import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Beranda: undefined;
  Monitor: { deviceId: string };
  Profile: { userId: string };
};

export type MonitorScreen = NativeStackScreenProps<
  RootStackParamList,
  'Monitor'
>;

export type ProfileScreen = NativeStackScreenProps<
  RootStackParamList,
  'Profile'
>;
