// import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { StackScreenProps } from '@react-navigation/stack';

export type RootStackParamList = {
  Beranda: undefined;
  Monitor: undefined;
  Profile: undefined;
  AddPool: undefined;
  PoolDetail: { pondId: string };
  ArticleDetail: { articleId: string };
  LoginPage: undefined;
  RegisterPage: undefined;
  ProfileSettingPage: undefined;
  NotificationPage: undefined;
  '404NotFound': undefined;
  QRCode: undefined;
  PricingPlan: undefined;
  PaymentConfirmation: undefined;
  PaymentWebView: { paymentLink: string };
  TransactionScreen: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
