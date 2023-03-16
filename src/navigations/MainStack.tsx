import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Onboarding from 'screens/Onboarding';
import Home from 'screens/Home';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Home">
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};

export default MainStack;
