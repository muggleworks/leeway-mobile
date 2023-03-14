import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Onboarding from 'screens/Onboarding';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Onboarding" component={Onboarding} />
    </Stack.Navigator>
  );
};

export default MainStack;
