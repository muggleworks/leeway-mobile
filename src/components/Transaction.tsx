import {View, Text, TouchableHighlight} from 'react-native-styled';
import React, {useState} from 'react';
import {useTheme} from 'styled-components/native';

export default function Transaction({item, onPress}) {
  const [isActive, setIsActive] = useState(false);
  const theme = useTheme();

  return (
    <TouchableHighlight
      height={65}
      borderWidth="normal"
      borderRadius="s"
      paddingX={16}
      onPress={onPress}
      underlayColor={theme.colors.bgActive}
      borderColor={isActive ? 'borderActive' : 'border'}
      onPressIn={() => setIsActive(true)}
      onPressOut={() => setIsActive(false)}
      justifyContent="center">
      <View>
        <View
          flexDirection="row"
          justifyContent="space-between"
          alignItems="flex-start"
          paddingBottom={2}>
          <Text fontWeight="bold" color="text" fontSize="h2">
            {item.amount}₹
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
            {item.quantity} l
          </Text>
          <Text color="textSecondary" fontSize="p2">
            {item.date.toString()}({item.totalDistanceCovered}km)
          </Text>
        </View>
      </View>
    </TouchableHighlight>
  );
}
