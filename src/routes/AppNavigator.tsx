import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  HomeIcon as HomeSolid,
  ChartBarIcon as ChartBarSolid,
  UserIcon as UserSolid,
} from 'react-native-heroicons/solid';
import {
  HomeIcon as HomeOutline,
  ChartBarIcon as ChartBarOutline,
  UserIcon as UserOutline,
} from 'react-native-heroicons/outline';

import HomePage from '../screen/HomePage';
import ProfilePage from '../screen/ProfilePage';
import MonitorPage from '../screen/MonitorPage';
import NotificationPage from '../screen/NotificationPage';
import WebView from '../screen/WebView';
import RegisterPage from '../screen/RegisterPage';
import LoginPage from '../screen/LoginPage';
import { RootStackParamList } from './NavigationTypes';

interface MenuIconsProps {
  route: { name: keyof RootStackParamList };
  focused: Boolean;
}

const Tab = createBottomTabNavigator<RootStackParamList>();
const Stack = createNativeStackNavigator();

const HomeNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused }) => menuIcons({ route, focused }),
      })}>
      <Tab.Screen name="Homes" component={HomePage} />
      <Tab.Screen name="Monitor" component={MonitorPage} />
      <Tab.Screen name="Profile" component={ProfilePage} />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeNavigator} />
        <Stack.Screen name="Register" component={RegisterPage} />
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="WebView" component={WebView} />
        <Stack.Screen name="Notification" component={NotificationPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const menuIcons = ({ route, focused }: MenuIconsProps) => {
  let icon;

  if (route.name === 'Homes') {
    icon = focused ? (
      <HomeSolid height="24" width="24" color="#204E7C" />
    ) : (
      <HomeOutline size="24" color="#6F6F6F" />
    );
  } else if (route.name === 'Monitor') {
    icon = focused ? (
      <ChartBarSolid size="24" color="#204E7C" />
    ) : (
      <ChartBarOutline size="24" color="#6F6F6F" />
    );
  } else if (route.name === 'Profile') {
    icon = focused ? (
      <UserSolid size="24" color="#204E7C" />
    ) : (
      <UserOutline size="24" color="#6F6F6F" />
    );
  }

  // const buttonClass = focused ? 'bg-white' : '';

  return <View>{icon}</View>;
};

export default AppNavigator;
