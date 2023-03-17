import {Button} from 'react-native';
import React from 'react';
import {SafeAreaView, Text} from 'react-native-styled';
import {useNavigation} from '@react-navigation/native';
import {screens} from 'screens/index';

export default function Settings() {
  const {navigate} = useNavigation();
  return (
    <SafeAreaView gap={24} p={24}>
      <Text fontSize="h1">Settings</Text>
      <Button title="go back" onPress={() => navigate(screens.Home)} />
      <Button title="sign out" />
    </SafeAreaView>
  );
}
