import {View, Text, TouchableHighlight} from 'react-native-styled';
import React, {useState} from 'react';
import {useTheme} from 'styled-components/native';

export type TransactionType = {
  key: string;
  odometerReading: number;
  amount: number;
  unitPrice: number;
  quantity: number;
  createdAt: Date;
};

type Props = {
  item: TransactionType;
  onPress: (transaction: TransactionType) => void;
};

export default function Transaction({item, onPress}: Props) {
  const [isActive, setIsActive] = useState(false);
  const theme = useTheme();

  return (
    <TouchableHighlight
      height={65}
      borderWidth="normal"
      borderRadius="s"
      paddingX={16}
      onPress={() => onPress(item)}
      underlayColor={theme.colors.bgActive}
      borderColor={isActive ? 'borderActive' : 'border'}
      onPressIn={() => setIsActive(true)}
      onPressOut={() => setIsActive(false)}
      justifyContent="center">
      <View>
        <View
          flexDirection="row"
          justifyContent="space-between"
          alignItems="flex-start">
          <Text fontWeight="bold" color="text" fontSize="h2">
            {Math.round(item.amount * 100) / 100}₹
          </Text>
          <Text fontWeight="500" color="text" fontSize="h3">
            {item.unitPrice}₹/l
          </Text>
        </View>
        <View
          flexDirection="row"
          justifyContent="space-between"
          alignItems="flex-end">
          <Text color="textSecondary" fontSize="p1">
            {Math.round(item.quantity * 100) / 100}l
          </Text>
          <Text color="textSecondary" fontSize="p2">
            {item.createdAt.toDateString()}({item.odometerReading}km)
          </Text>
        </View>
      </View>
    </TouchableHighlight>
  );
}
