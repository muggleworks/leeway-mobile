import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainStack from './src/navigations/MainStack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import theme from './src/styled/theme';
import {ThemeProvider} from 'styled-components/native';
import RNBootSplash from 'react-native-bootsplash';

const App = () => {
  const hideSplashScreen = () => {
    RNBootSplash.hide();
  };

  return (
    <ThemeProvider theme={theme}>
      <SafeAreaProvider>
        <NavigationContainer onReady={hideSplashScreen}>
          <MainStack />
        </NavigationContainer>
      </SafeAreaProvider>
    </ThemeProvider>
  );
};

export default App;
