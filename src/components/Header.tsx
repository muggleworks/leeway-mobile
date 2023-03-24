import {View} from 'react-native-styled';
import React from 'react';
import Svg, {Defs, LinearGradient, Stop, Text} from 'react-native-svg';
import IconButton from './IconButton';
import {useTheme} from 'styled-components/native';
import {IconName} from 'assets/icons';
import {StatusBar} from 'react-native';

function GradientText({text}: {text: string}) {
  return (
    <Svg width="100%" height={26} fill="none">
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
  right?: {iconName: IconName; actionHandler: () => void};
  left?: {iconName: IconName; actionHandler: () => void};
}

export default function Header({title, right, left}: Props) {
  const theme = useTheme();
  return (
    <View
      paddingX={left ? 16 : 24}
      marginTop={16}
      flexDirection="row"
      alignItems="center">
      <StatusBar backgroundColor={theme.colors.white} barStyle="dark-content" />
      {left && (
        <View mr={12}>
          <IconButton
            name={left.iconName}
            color={theme.colors.textSecondary}
            onPress={left.actionHandler}
          />
        </View>
      )}
      <View flex={1}>
        <GradientText text={title} />
      </View>
      {right && (
        <View ml={12}>
          <IconButton
            name={right.iconName}
            color={theme.colors.textSecondary}
            onPress={right.actionHandler}
          />
        </View>
      )}
    </View>
  );
}
