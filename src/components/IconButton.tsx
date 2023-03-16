import {TouchableOpacity} from 'react-native-styled';
import React from 'react';
import Icon, {IconName} from 'assets/icons';
import {ColorValue} from 'react-native';

interface Props {
  color?: ColorValue;
  name: IconName;
  onPress: () => void;
}

export default function IconButton({color, name, onPress}: Props) {
  return (
    <TouchableOpacity
      width={32}
      height={32}
      justifyContent="center"
      borderRadius="s"
      onPress={onPress}
      alignItems="center">
      <Icon name={name} color={color} />
    </TouchableOpacity>
  );
}
