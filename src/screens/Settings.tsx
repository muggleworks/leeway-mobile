import {Button} from 'react-native';
import React from 'react';
import {SafeAreaView, Text} from 'react-native-styled';
import {useNavigation} from '@react-navigation/native';
import {screens} from 'screens/index';
import auth from '@react-native-firebase/auth';

export default function Settings() {
  const {navigate} = useNavigation();

  const signOut = async () => {
    try {
      await auth().signOut();
    } catch (error) {
      console.log('Failed to sign out', error);
    }
  };

  return (
    <SafeAreaView gap={24} p={24}>
      <Text fontSize="h1">Settings</Text>
      <Button title="go back" onPress={() => navigate(screens.Home)} />
      <Button title="sign out" onPress={signOut} />
    </SafeAreaView>
  );
}
