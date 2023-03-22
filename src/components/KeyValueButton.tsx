import React, {useState} from 'react';
import {TouchableHighlight, Text, View} from 'react-native-styled';
import {useTheme} from 'styled-components/native';

type Props = {
  label: string;
  value: string;
  onPress: () => void;
};

export default function KeyValueButton({label, value, onPress}: Props) {
  const [isActive, setIsActive] = useState(false);
  const theme = useTheme();

  return (
    <TouchableHighlight
      onPress={onPress}
      px="16px"
      py="14px"
      borderWidth="normal"
      underlayColor={theme.colors.bgActive}
      borderColor={isActive ? 'borderActive' : 'border'}
      onPressIn={() => setIsActive(true)}
      onPressOut={() => setIsActive(false)}
      borderRadius="s">
      <View flexDirection="row" justifyContent="space-between">
        <Text fontWeight="500" color="text" fontSize="p1">
          {label}
        </Text>
        <Text color="textSecondary" fontSize="p1">
          {value}
        </Text>
      </View>
    </TouchableHighlight>
  );
}
