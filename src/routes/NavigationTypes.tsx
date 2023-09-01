// import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { StackScreenProps } from '@react-navigation/stack';

export type RootStackParamList = {
  Beranda: undefined;
  Monitor: undefined;
  Profile: { userId: string };
  PoolDetail: { poolId: string };
  LoginPage: undefined;
  RegisterPage: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

// export type MonitorScreen = NativeStackScreenProps<
//   RootStackParamList,
//   'Monitor'
// >;

// export type ProfileScreen = NativeStackScreenProps<
//   RootStackParamList,
//   'Profile'
// >;
