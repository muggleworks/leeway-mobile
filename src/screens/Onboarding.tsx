import React from 'react';
import OnboardingLogo from 'assets/images/onboarding-logo.svg';
import {View, Text, SafeAreaView} from 'react-native-styled';
import AuthButton from 'components/AuthButton';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const Onboarding = () => {
  const handleAuth = async () => {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      return auth().signInWithCredential(googleCredential);
    } catch (error) {
      console.log('Not signed in!', error);
    }
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
