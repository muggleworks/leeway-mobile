import {View, SafeAreaView} from 'react-native-styled';
import React from 'react';
import Header from 'components/Header';
import Input from 'components/Input';
import FloatingActionButton from 'components/FloatingActionButton';

export default function Transaction() {
  return (
    <SafeAreaView flex={1} position="relative">
      <Header
        title="fuel expense"
        left={{
          iconName: 'left',
          actionHandler: () => console.log('Back pressed'),
        }}
      />
      <View px={24} pt={32} gap={20}>
        <Input placeholder="current km" />
        <Input placeholder="amount" />
        <Input placeholder="unit price" />
        <Input placeholder="liters" />
        <Input placeholder="date" disabled />
      </View>

      <View
        position="absolute"
        bottom={40}
        left="50%"
        style={{transform: [{translateX: -28}]}}
        alignItems="center">
        <FloatingActionButton
          onPress={() => console.log('Save Button')}
          icon="check"
        />
      </View>
    </SafeAreaView>
  );
}
