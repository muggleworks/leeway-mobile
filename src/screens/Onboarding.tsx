import React from 'react';
import OnboardingLogo from 'assets/images/onboarding-logo.svg';
import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native-styled';
import AuthButton from 'components/AuthButton';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {appleAuth} from '@invertase/react-native-apple-authentication';
import {Linking, Platform, StatusBar} from 'react-native';
import UnderlineText from 'components/UnderlineText';
import {useTheme} from 'styled-components/native';

const Onboarding = () => {
  const [loading, setLoading] = React.useState({google: false, apple: false});
  const theme = useTheme();

  const handleGoogleAuth = async () => {
    try {
      setLoading({...loading, google: true});
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      return auth().signInWithCredential(googleCredential);
    } catch (error) {
      console.log('Not signed in!', error);
    } finally {
      setLoading({...loading, google: false});
    }
  };

  const handleAppleAuth = async () => {
    try {
      setLoading({...loading, apple: true});
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      if (!appleAuthRequestResponse.identityToken) {
        throw new Error('Apple Sign-In failed - no identify token returned');
      }

      const {identityToken, nonce} = appleAuthRequestResponse;
      const appleCredential = auth.AppleAuthProvider.credential(
        identityToken,
        nonce,
      );

      return auth().signInWithCredential(appleCredential);
    } catch (error) {
      console.log('Not signed in!', error);
    } finally {
      setLoading({...loading, apple: false});
    }
  };

  const openTermsAndConditions = () => {
    Linking.openURL('https://leeway.zympl.com/terms-and-conditions');
  };

  return (
    <SafeAreaView flex={1} bg="white">
      <View
        alignItems="center"
        justifyContent="center"
        flex={1}
        position="relative">
        <StatusBar
          backgroundColor={theme.colors.white}
          barStyle="dark-content"
        />
        <OnboardingLogo width={220} />
        <View position="absolute" bottom={60} alignItems="center">
          <Text color="text" fontSize="p1">
            continue with
          </Text>
          <View flexDirection="row" gap={28} marginTop={16}>
            {Platform.OS === 'ios' && (
              <AuthButton
                provider="apple"
                onPress={handleAppleAuth}
                loading={loading.apple}
              />
            )}
            <AuthButton
              provider="google"
              onPress={handleGoogleAuth}
              loading={loading.google}
            />
          </View>
          <View flexDirection="row" marginTop="28px">
            <Text fontSize="p2" color="textSecondary">
              by continuing, you agree to our{' '}
            </Text>
            <TouchableOpacity onPress={openTermsAndConditions}>
              <UnderlineText fontSize="p2" color="text">
                terms & conditions
              </UnderlineText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Onboarding;
