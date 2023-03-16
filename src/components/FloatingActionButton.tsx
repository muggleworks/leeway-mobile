import Icon, {IconName} from 'assets/icons';
import React from 'react';
import {TouchableOpacity, LinearGradient} from 'react-native-styled';
import {useTheme} from 'styled-components/native';

interface Props {
  icon: IconName;
  onPress: () => void;
}

const FloatingActionButton = ({icon, onPress}: Props) => {
  const theme = useTheme();

  return (
    <TouchableOpacity
      width={56}
      height={56}
      borderRadius="m"
      onPress={onPress}
      overflow={'hidden'}
      bg="red">
      <LinearGradient
        colors={[theme.colors.secondary, theme.colors.primary]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        justifyContent="center"
        alignItems="center"
        flex={1}>
        <Icon name={icon} color={theme.colors.white} />
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default FloatingActionButton;
