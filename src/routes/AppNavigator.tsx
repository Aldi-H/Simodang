import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import HomeIconSvg from '../assets/icons/HomeIcon.svg';
import ChartIconSvg from '../assets/icons/ChartIcon.svg';
import UserIconSvg from '../assets/icons/UserIcon.svg';

import HomePage from '../screen/HomePage';
import ProfilePage from '../screen/ProfilePage';
import MonitorPage from '../screen/MonitorPage';
import NotificationPage from '../screen/NotificationPage';
import WebView from '../screen/WebView';
import RegisterPage from '../screen/RegisterPage';
import LoginPage from '../screen/LoginPage';
import { RootStackParamList } from './NavigationTypes';
import { CONSTANT } from '../themes';
import ConditionPoolPage from '../screen/DetailPoolScreen/ConditionPoolPage';

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

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: CONSTANT.themeColors.base },
        }}>
        <Stack.Screen name="Home" component={HomeNavigator} />
        <Stack.Screen name="Register" component={RegisterPage} />
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="WebView" component={WebView} />
        <Stack.Screen name="Notification" component={NotificationPage} />
        <Stack.Screen name="PoolDetail" component={ConditionPoolPage} />
      </Stack.Navigator>
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
