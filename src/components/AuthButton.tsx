import React, {useState} from 'react';
import {TouchableHighlight} from 'react-native-styled';
import AppleLogo from 'assets/icons/apple.svg';
import GoogleLogo from 'assets/icons/google.svg';
import {useTheme} from 'styled-components/native';
import LoadingOverlay from './LoadingOverlay';

interface Props {
  provider: 'google' | 'apple';
  onPress: () => void;
  loading?: boolean;
}

const AuthButton = ({provider, onPress, loading}: Props) => {
  const [isActive, setIsActive] = useState(false);
  const theme = useTheme();

  const handlePress = () => {
    if (loading) {
      return;
    }
    onPress();
  };

  return (
    <TouchableHighlight
      width={48}
      height={48}
      bg="white"
      borderWidth="normal"
      borderRadius="s"
      borderColor={isActive ? 'borderActive' : 'border'}
      justifyContent="center"
      alignItems="center"
      overflow="hidden"
      underlayColor={theme.colors.bgActive}
      onPressIn={() => setIsActive(true)}
      onPressOut={() => setIsActive(false)}
      onPress={handlePress}>
      <>
        {provider === 'google' && <GoogleLogo />}
        {provider === 'apple' && <AppleLogo />}

        {loading && <LoadingOverlay />}
      </>
    </TouchableHighlight>
  );
};

export default AuthButton;
