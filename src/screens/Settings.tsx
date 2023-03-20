import React from 'react';
import {SafeAreaView, View} from 'react-native-styled';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import Button from 'components/Button';
import Header from 'components/Header';

export default function Settings() {
  const {goBack} = useNavigation();

  const signOut = async () => {
    try {
      await auth().signOut();
    } catch (error) {
      console.log('Failed to sign out', error);
    }
  };

  return (
    <SafeAreaView flex={1}>
      <Header
        title="settings"
        left={{iconName: 'left', actionHandler: goBack}}
      />
      <View flex={1} px="24px" py="32px">
        <View flex={1}></View>
        <View alignItems="center">
          <Button label="sign out" onPress={signOut} />
        </View>
      </View>
    </SafeAreaView>
  );
}
