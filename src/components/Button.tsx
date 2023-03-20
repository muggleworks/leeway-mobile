import React, {useState} from 'react';
import {Text, TouchableHighlight} from 'react-native-styled';
import {useTheme} from 'styled-components/native';

type Props = {
  label: string;
  onPress: () => void;
};

export default function Button({label, onPress}: Props) {
  const [isActive, setIsActive] = useState(false);
  const theme = useTheme();

  return (
    <TouchableHighlight
      onPress={onPress}
      py="8px"
      px="16px"
      borderRadius="s"
      borderWidth="normal"
      underlayColor={theme.colors.bgActive}
      borderColor={isActive ? 'borderActive' : 'border'}
      onPressIn={() => setIsActive(true)}
      onPressOut={() => setIsActive(false)}>
      <Text color="text" fontSize="p1">
        {label}
      </Text>
    </TouchableHighlight>
  );
}
