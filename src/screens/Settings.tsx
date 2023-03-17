import {Button} from 'react-native';
import React from 'react';
import {SafeAreaView, Text} from 'react-native-styled';

export default function Settings() {
  return (
    <SafeAreaView gap={24} p={24}>
      <Text fontSize="h1">Settings</Text>
      <Button title="go back" />
      <Button title="sign out" />
    </SafeAreaView>
  );
}
