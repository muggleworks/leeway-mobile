import {View} from 'react-native-styled';
import React from 'react';
import {ActivityIndicator} from 'react-native';
import {useTheme} from 'styled-components/native';

export default function LoadingOverlay() {
  const theme = useTheme();

  return (
    <View
      position="absolute"
      width="100%"
      height="100%"
      justifyContent="center"
      bg="#00000080"
      alignItems="center">
      <ActivityIndicator size="small" color={theme.colors.white} />
    </View>
  );
}
