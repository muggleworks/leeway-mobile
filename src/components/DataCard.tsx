import {View, Text, LinearGradient} from 'react-native-styled';
import React from 'react';
import {useTheme} from 'styled-components/native';
import {useWindowDimensions} from 'react-native';

interface Props {
  type?: 'primary' | 'secondary';
  value: string;
  name?: string;
}

export default function DataCard({type = 'primary', value, name}: Props) {
  const theme = useTheme();
  const {width} = useWindowDimensions();

  const isPrimary = type === 'primary';
  const size = isPrimary ? (width - 48) * 0.55 + 5 : (width - 48) * 0.45 + 5;
  return (
    <LinearGradient
      colors={
        isPrimary
          ? [theme.colors.primary, theme.colors.secondary]
          : [theme.colors.white, theme.colors.white]
      }
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      width={size}
      height={size}
      borderRadius="xl"
      justifyContent="center"
      alignItems="center"
      borderWidth={isPrimary ? 0 : 2}
      borderColor="secondary">
      <View>
        {name && (
          <Text color="white" fontSize={isPrimary ? 'h3' : 'p1'}>
            {name}
          </Text>
        )}
        <Text
          color={isPrimary ? 'white' : 'primary'}
          fontSize={isPrimary ? 'xl' : 'h1'}
          fontWeight={isPrimary ? 'bold' : 'normal'}>
          {value}
        </Text>
      </View>
    </LinearGradient>
  );
}
