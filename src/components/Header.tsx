import {View} from 'react-native-styled';
import React from 'react';
import Svg, {Defs, LinearGradient, Stop, Text} from 'react-native-svg';
import IconButton from './IconButton';
import {useTheme} from 'styled-components/native';

function GradientText({text}: {text: string}) {
  return (
    <Svg width="100%" height={30} fill="none">
      <Text
        fill="url(#textColor)"
        fontSize="24"
        fontWeight="bold"
        x="0"
        y="20"
        stroke="transparent">
        {text}
      </Text>
      <Defs>
        <LinearGradient id="textColor" x1={0} y1={0} x2={1} y2={0}>
          <Stop offset={0} stopColor="#EA6290" stopOpacity={1} />
          <Stop offset={1} stopColor="#EC7363" stopOpacity={1} />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}

interface Props {
  title: string;
}

export default function Header({title}: Props) {
  const theme = useTheme();
  return (
    <View paddingX={24} paddingTop={24} flexDirection="row" alignItems="center">
      <View flex={1}>
        <GradientText text={title} />
      </View>
      <IconButton
        name="settings"
        color={theme.colors.textSecondary}
        onPress={() => console.log('Settings')}
      />
    </View>
  );
}
