import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Onboarding from 'screens/Onboarding';
import Home from 'screens/Home';
import Transaction from 'screens/Transaction';
import Settings from 'screens/Settings';
import {screens} from 'screens/index';

import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import config from 'config.json';

GoogleSignin.configure({
  webClientId: config.webClientId,
});

const Stack = createNativeStackNavigator();

const MainStack = () => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>();

  const onAuthStateChanged = (userObject: FirebaseAuthTypes.User | null) => {
    setUser(userObject);
  };

  useEffect(() => {
    const authSubscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return authSubscriber;
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={screens.Onboarding}>
      {!user ? (
        <Stack.Screen name={screens.Onboarding} component={Onboarding} />
      ) : (
        <>
          <Stack.Screen name={screens.Home} component={Home} />
          <Stack.Screen name={screens.Transaction} component={Transaction} />
          <Stack.Screen name={screens.Settings} component={Settings} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default MainStack;
