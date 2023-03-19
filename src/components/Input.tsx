import {Text, TextInput, View} from 'react-native-styled';
import React, {useState} from 'react';
import {useTheme} from 'styled-components/native';
import {TextInputProps} from 'react-native';
interface Props extends TextInputProps {
  disabled?: boolean;
  label?: string;
}

export default function Input({disabled, label, ...otherProps}: Props) {
  const [focused, setFocused] = useState(false);
  const theme = useTheme();

  return (
    <View opacity={disabled ? 0.3 : 1}>
      <View flexDirection="row" alignItems="center">
        <View
          width="4px"
          height="1px"
          bg={focused ? 'secondary' : 'textSecondary'}
          marginRight="4px"
        />
        <Text marginBottom="4px" color={focused ? 'primary' : 'text'}>
          {label ?? otherProps.placeholder}
        </Text>
      </View>
      <TextInput
        {...otherProps}
        bg={focused ? 'bgActive' : 'transparent'}
        borderColor={
          (disabled && 'textSecondary') || (focused ? 'borderActive' : 'border')
        }
        editable={!disabled}
        px="16px"
        fontSize="p1"
        borderWidth="normal"
        height="48px"
        placeholderTextColor={theme.colors.textSecondary}
        color="text"
        borderRadius="s"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </View>
  );
}
