import React, {useState} from 'react';
import {Text, TouchableHighlight} from 'react-native-styled';
import {useTheme} from 'styled-components/native';

type Props = {
  label: string;
  onPress: () => void;
  size?: 'small' | 'large';
  active?: boolean;
};

export default function Button({
  label,
  onPress,
  size = 'small',
  active,
}: Props) {
  const [isActive, setIsActive] = useState(false);
  const theme = useTheme();

  return (
    <TouchableHighlight
      onPress={onPress}
      py={size === 'large' ? '14px' : '8px'}
      px="16px"
      borderRadius="s"
      borderWidth="normal"
      underlayColor={theme.colors.bgActive}
      bg={active ? 'border' : null}
      borderColor={isActive ? 'borderActive' : 'border'}
      onPressIn={() => setIsActive(true)}
      onPressOut={() => setIsActive(false)}>
      <Text color="text" fontSize={size === 'large' ? 'h4' : 'p1'}>
        {label}
      </Text>
    </TouchableHighlight>
  );
}
