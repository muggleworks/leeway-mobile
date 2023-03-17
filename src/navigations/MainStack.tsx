import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Onboarding from 'screens/Onboarding';
import Home from 'screens/Home';
import Transaction from 'screens/Transaction';
import Settings from 'screens/Settings';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Settings">
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Transaction" component={Transaction} />
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
};

export default MainStack;
