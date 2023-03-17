import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Onboarding from 'screens/Onboarding';
import Home from 'screens/Home';
import Transaction from 'screens/Transaction';
import Settings from 'screens/Settings';
import {screens} from 'screens/index';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={screens.Onboarding}>
      <Stack.Screen name={screens.Onboarding} component={Onboarding} />
      <Stack.Screen name={screens.Home} component={Home} />
      <Stack.Screen name={screens.Transaction} component={Transaction} />
      <Stack.Screen name={screens.Settings} component={Settings} />
    </Stack.Navigator>
  );
};

export default MainStack;
