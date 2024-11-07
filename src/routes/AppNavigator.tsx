import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { CONSTANT } from '../themes';
import { RootStackParamList } from './NavigationTypes';

import HomeIconSvg from '../assets/icons/HomeIcon.svg';
import ChartIconSvg from '../assets/icons/ChartIcon.svg';
import UserIconSvg from '../assets/icons/UserIconSolid.svg';

import HomePage from '../screen/HomePage';
import ProfilePage from '../screen/ProfileScreen/ProfilePage';
import MonitorPage from '../screen/MonitorPage';
import NotificationPage from '../screen/NotificationPage';
import WebViewPage from '../screen/WebViewPage';
import RegisterPage from '../screen/AuthScreen/RegisterPage';
import LoginPage from '../screen/AuthScreen/LoginPage';
import PoolConditionPage from '../screen/DetailPoolScreen/PoolConditionPage';
import PoolHistoryPage from '../screen/DetailPoolScreen/PoolHistoryPage';
import PoolSettingPage from '../screen/DetailPoolScreen/PoolSettingPage';
import PoolDetailPage from '../screen/DetailPoolScreen/PoolDetailPage';
import ProfileSettingPage from '../screen/ProfileScreen/ProfileSettingPage';
import AddPoolPage from '../screen/AddPoolPage';
import useAuthStore from '../store/auth/AuthStore';
import QRScanPage from '../screen/QRScanPage';
import PricingPlanScreen from '../screen/SubscriptionScreen/PricingPlanScreen';
import PaymentConfirmationScreen from '../screen/SubscriptionScreen/PaymentConfirmationScreen';
import PaymentWebView from '../screen/SubscriptionScreen/PaymentWebView';
import TransactionScreen from '../screen/SubscriptionScreen/TransactionScreen';

interface MenuProps {
  route: { name: keyof RootStackParamList };
  focused: boolean;
}

const Tab = createBottomTabNavigator<RootStackParamList>();
const Stack = createNativeStackNavigator();

const HomeNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused }) => menuIcons({ route, focused }),
        tabBarStyle: {
          paddingBottom: 16,
          paddingTop: 12,
          height: hp('10%'),
          alignItems: 'center',
          borderTopStartRadius: 30,
          borderTopEndRadius: 30,
        },
        tabBarLabelStyle: {
          fontFamily: 'Roboto-Medium',
          fontSize: 12,
        },
        tabBarActiveTintColor: CONSTANT.themeColors.primary,
      })}>
      <Tab.Screen name="Beranda" component={HomePage} />
      <Tab.Screen name="Monitor" component={MonitorPage} />
      <Tab.Screen name="Profile" component={ProfilePage} />
    </Tab.Navigator>
  );
};

const MainNavigator = () => {
  return (
    <Stack.Navigator
      // initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: CONSTANT.themeColors.base },
      }}>
      <Stack.Screen name="Home" component={HomeNavigator} />
      <Stack.Screen
        name="WebViewScreen"
        component={WebViewPage}
        // options={({ route }) => {
        //   return {
        //     title: (route.params as { title?: string }).title ?? '',
        //   };
        // }}
      />
      <Stack.Screen name="Notification" component={NotificationPage} />
      <Stack.Screen
        name="PoolDetail"
        component={PoolDetailPage}
        options={({ route }) => {
          return {
            title: (route.params as { pondName?: string }).pondName ?? '',
          };
        }}
      />
      <Stack.Screen name="AddPool" component={AddPoolPage} />
      <Stack.Screen name="PoolConditionPage" component={PoolConditionPage} />
      <Stack.Screen name="PoolHistoryPage" component={PoolHistoryPage} />
      <Stack.Screen name="PoolSettingPage" component={PoolSettingPage} />
      <Stack.Screen name="ProfileSettingPage" component={ProfileSettingPage} />
      <Stack.Screen name="NotificationPage" component={NotificationPage} />
      <Stack.Screen name="QRCode" component={QRScanPage} />
      <Stack.Screen name={"PricingPlan"} component={PricingPlanScreen} />
      <Stack.Screen name="PaymentConfirmation" component={PaymentConfirmationScreen} />
      <Stack.Screen name="PaymentWebView" component={PaymentWebView} />
      <Stack.Screen name="TransactionScreen" component={TransactionScreen} />
    </Stack.Navigator>
  );
};

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      // initialRouteName="LoginPage"
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: CONSTANT.themeColors.base },
      }}>
      <Stack.Screen name="RegisterPage" component={RegisterPage} />
      <Stack.Screen name="LoginPage" component={LoginPage} />
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  const { _isSignIn } = useAuthStore();

  return (
    <NavigationContainer>
      {_isSignIn ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

const menuIcons = ({ route, focused }: MenuProps) => {
  let icon;

  if (route.name === 'Beranda') {
    icon = focused ? (
      <HomeIconSvg height={hp('3%')} fill={CONSTANT.themeColors.primary} />
    ) : (
      <HomeIconSvg height={hp('3%')} fill={CONSTANT.themeColors.disable} />
    );
  } else if (route.name === 'Monitor') {
    icon = focused ? (
      <ChartIconSvg height={hp('3%')} fill={CONSTANT.themeColors.primary} />
    ) : (
      <ChartIconSvg height={hp('3%')} fill={CONSTANT.themeColors.disable} />
    );
  } else if (route.name === 'Profile') {
    icon = focused ? (
      <UserIconSvg height={hp('3%')} fill={CONSTANT.themeColors.primary} />
    ) : (
      <UserIconSvg height={hp('3%')} fill={CONSTANT.themeColors.disable} />
    );
  }

  return <View>{icon}</View>;
};

export default AppNavigator;
