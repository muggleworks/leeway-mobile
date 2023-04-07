import React from 'react';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native-styled';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import Button from 'components/Button';
import Header from 'components/Header';
import KeyValueButton from 'components/KeyValueButton';
import {Linking} from 'react-native';

export default function Settings() {
  const {goBack} = useNavigation();

  const signOut = async () => {
    try {
      await auth().signOut();
    } catch (error) {
      console.log('Failed to sign out', error);
    }
  };

  const openTermsAndConditions = () => {
    Linking.openURL('https://leeway.zympl.com/terms-and-conditions');
  };

  return (
    <SafeAreaView flex={1}>
      <Header
        title="settings"
        left={{iconName: 'left', actionHandler: goBack}}
      />
      <View flex={1} px="24px" py="32px">
        <View flex={1} gap={16}>
          <KeyValueButton
            label="distance unit"
            value="kilo meter(km)"
            onPress={() => console.log('Key value button')}
          />
          <KeyValueButton
            label="quantity unit"
            value="litre(l)"
            onPress={() => console.log('Key value button')}
          />
          <KeyValueButton
            label="currency"
            value="INR(₹)"
            onPress={() => console.log('Key value button')}
          />
        </View>
        <View alignItems="center" my="24px">
          <TouchableOpacity onPress={openTermsAndConditions}>
            <Text color="textSecondary" fontSize="p2">
              terms & conditions
            </Text>
          </TouchableOpacity>
        </View>
        <View alignItems="center">
          <Button label="sign out" onPress={signOut} />
        </View>
      </View>
    </SafeAreaView>
  );
}
