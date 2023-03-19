import React from 'react';
import Plus from 'assets/icons/plus.svg';
import Settings from 'assets/icons/settings.svg';
import Check from 'assets/icons/check.svg';
import Left from 'assets/icons/left.svg';
import Trash from 'assets/icons/trash.svg';
import {ColorValue} from 'react-native';

const icons = {
  plus: Plus,
  settings: Settings,
  check: Check,
  left: Left,
  trash: Trash,
};

export type IconName = keyof typeof icons;

interface Props {
  name: IconName;
  color?: ColorValue;
}

const Icon = ({name, color = 'black'}: Props) => {
  const I = icons[name];
  return <I fill={color} />;
};

export default Icon;
