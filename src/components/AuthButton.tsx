import React, {useState} from 'react';
import {TouchableHighlight} from 'react-native-styled';
import AppleLogo from 'assets/icons/apple.svg';
import GoogleLogo from 'assets/icons/google.svg';
import {useTheme} from 'react-native-styled';

interface Props {
  provider: 'google' | 'apple';
  onPress: () => void;
}

const AuthButton = ({provider, onPress}: Props) => {
  const [isActive, setIsActive] = useState(false);
  const theme = useTheme();

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
      underlayColor={theme.colors.bgActive}
      onPressIn={() => setIsActive(true)}
      onPressOut={() => setIsActive(false)}
      onPress={onPress}>
      <>
        {provider === 'google' && <GoogleLogo />}
        {provider === 'apple' && <AppleLogo />}
      </>
    </TouchableHighlight>
  );
};

export default AuthButton;
