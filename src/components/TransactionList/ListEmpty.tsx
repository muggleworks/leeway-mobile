import {View, Text} from 'react-native-styled';
import React from 'react';

export default function ListEmpty() {
  return (
    <View gap={8} alignItems="center" justifyContent="center" height="400px">
      <Text color="primary" fontSize="h3">
        No transactions recorded!
      </Text>
      <Text color="textSecondary" fontSize="p1">
        Use the below + button to add transactions
      </Text>
    </View>
  );
}
