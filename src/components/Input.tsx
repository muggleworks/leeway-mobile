import {TextInput} from 'react-native-styled';
import React, {useState} from 'react';
import {useTheme} from 'styled-components/native';

interface Props {
  disabled?: boolean;
  placeholder?: string;
  value?: string;
}

export default function Input({disabled, ...otherProps}: Props) {
  const [focused, setFocused] = useState(false);
  const theme = useTheme();

  return (
    <TextInput
      {...otherProps}
      bg={focused ? 'bgActive' : 'transparent'}
      borderColor={
        (disabled && 'textSecondary') || (focused ? 'borderActive' : 'border')
      }
      opacity={disabled ? 0.3 : 1}
      editable={!disabled}
      px={16}
      fontSize="p1"
      borderWidth="normal"
      height={48}
      placeholderTextColor={theme.colors.textSecondary}
      color="text"
      borderRadius="s"
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    />
  );
}
