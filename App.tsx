import React from 'react';
import {
  NavigationContainer,
} from '@react-navigation/native';
import {
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import WelcomeScreen from './screens/WelcomeScreen';
import SignUpScreen from './screens/SignUpScreen';
import LoginScreen from './screens/LoginScreen';
import VerificationScreen from './screens/VerificationScreen';
import HomeScreen from './screens/HomeScreen';
import ExchangeScreen from './screens/ExchangeScreen';
import QuoteScreen from './screens/QuoteScreen';
import ConfirmationScreen from './screens/ConfirmationScreen';
import SuccessScreen from './screens/SuccessScreen';
import TransactionDetailsScreen from './screens/TransactionDetailsScreen';
import TransactionHistoryScreen from './screens/TransactionHistoryScreen';
import SettingsScreen from './screens/SettingsScreen';
import CustomerProfileScreen from './screens/CustomerProfileScreen';

import type { RootStackParamList } from './navigation/types';

const Stack =
  createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
        />

        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
        />

        <Stack.Screen
          name="Login"
          component={LoginScreen}
        />

        <Stack.Screen
          name="Verification"
          component={VerificationScreen}
        />

        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />

        <Stack.Screen
          name="Exchange"
          component={ExchangeScreen}
        />

        <Stack.Screen
          name="Quote"
          component={QuoteScreen}
        />

        <Stack.Screen
          name="Confirmation"
          component={ConfirmationScreen}
        />

        <Stack.Screen
          name="Success"
          component={SuccessScreen}
        />

        <Stack.Screen
          name="TransactionDetails"
          component={TransactionDetailsScreen}
        />

        <Stack.Screen
          name="TransactionHistory"
          component={TransactionHistoryScreen}
        />

        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
        />

        <Stack.Screen
          name="CustomerProfile"
          component={CustomerProfileScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
