import React from 'react';
import OnboardingLogo from 'assets/images/onboarding-logo.svg';
import {View, Text, SafeAreaView} from 'react-native-styled';
import AuthButton from 'components/AuthButton';
import {useNavigation} from '@react-navigation/native';
import {screens} from 'screens/index';

const Onboarding = () => {
  const navigation = useNavigation();

  const handleAuth = () => {
    navigation.navigate(screens.Home);
  };

  return (
    <SafeAreaView flex={1} bg="white">
      <View
        alignItems="center"
        justifyContent="center"
        flex={1}
        position="relative">
        <OnboardingLogo />
        <View position="absolute" bottom={60} alignItems="center">
          <Text color="text" fontSize="p1">
            continue with
          </Text>
          <View flexDirection="row" gap={28} marginTop={16}>
            <AuthButton provider="apple" onPress={handleAuth} />
            <AuthButton provider="google" onPress={handleAuth} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Onboarding;
