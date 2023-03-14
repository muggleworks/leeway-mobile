import React from 'react';
import OnboardingLogo from '../assets/images/onboarding-logo.svg';
import {View, Text, SafeAreaView} from '../styled';
import AuthButton from '../components/AuthButton';

const Onboarding = () => {
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
            <AuthButton provider="apple" onPress={() => console.log('Apple')} />
            <AuthButton
              provider="google"
              onPress={() => console.log('Google')}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Onboarding;
