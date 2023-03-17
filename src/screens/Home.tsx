import React from 'react';
import {SafeAreaView, Text, View, LinearGradient} from 'react-native-styled';
import FloatingActionButton from 'components/FloatingActionButton';
import DataCard from 'components/DataCard';
import {FlashList} from '@shopify/flash-list';
import Transaction from 'components/Transaction';
import {useTheme} from 'styled-components/native';
import Header from 'components/Header';

const tempData = [
  {
    amount: 500,
    quantity: 4.3,
    unitPrice: 104.3,
    date: new Date(),
    totalDistanceCovered: 41232,
  },
  {
    amount: 500,
    quantity: 4.3,
    unitPrice: 104.3,
    date: new Date(),
    totalDistanceCovered: 41232,
  },
  {
    amount: 500,
    quantity: 4.3,
    unitPrice: 104.3,
    date: new Date(),
    totalDistanceCovered: 41232,
  },
  {
    amount: 500,
    quantity: 4.3,
    unitPrice: 104.3,
    date: new Date(),
    totalDistanceCovered: 41232,
  },
  {
    amount: 500,
    quantity: 4.3,
    unitPrice: 104.3,
    date: new Date(),
    totalDistanceCovered: 41232,
  },
  {
    amount: 500,
    quantity: 4.3,
    unitPrice: 104.3,
    date: new Date(),
    totalDistanceCovered: 41232,
  },
  {
    amount: 500,
    quantity: 4.3,
    unitPrice: 104.3,
    date: new Date(),
    totalDistanceCovered: 41232,
  },
  {
    amount: 500,
    quantity: 4.3,
    unitPrice: 104.3,
    date: new Date(),
    totalDistanceCovered: 41232,
  },
  {
    amount: 500,
    quantity: 4.3,
    unitPrice: 104.3,
    date: new Date(),
    totalDistanceCovered: 41232,
  },
  {
    amount: 500,
    quantity: 4.3,
    unitPrice: 104.3,
    date: new Date(),
    totalDistanceCovered: 41232,
  },
  {
    amount: 500,
    quantity: 4.3,
    unitPrice: 104.3,
    date: new Date(),
    totalDistanceCovered: 41232,
  },
  {
    amount: 500,
    quantity: 4.3,
    unitPrice: 104.3,
    date: new Date(),
    totalDistanceCovered: 41232,
  },
];

const Home = () => {
  const theme = useTheme();

  return (
    <SafeAreaView edges={['top', 'left', 'right']} bg="white" flex={1}>
      <Header
        title="leeway"
        right={{
          iconName: 'settings',
          actionHandler: () => console.log('Settings pressed'),
        }}
      />
      <View
        zIndex={1}
        paddingX={24}
        paddingTop={12}
        paddingBottom={28}
        flexDirection="row"
        alignItems="center">
        <View zIndex={1}>
          <DataCard name="millage" value="14km/l" />
        </View>
        <View marginLeft={-10}>
          <DataCard type="secondary" value="7.6₹/km" />
        </View>
      </View>

      <View flex={1} marginTop={-48}>
        <LinearGradient
          colors={[theme.colors.white, '#FFFFFF00']}
          height={40}
          position="absolute"
          zIndex={2}
          width="100%"
        />
        <FlashList
          data={tempData}
          ListHeaderComponent={() => (
            <Text paddingBottom={12} fontSize="p1" color="textSecondary">
              Transactions
            </Text>
          )}
          ItemSeparatorComponent={() => <View height={8} />}
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingBottom: 120,
            paddingTop: 48,
          }}
          estimatedItemSize={65}
          renderItem={({item}) => (
            <Transaction
              item={item}
              onPress={() => console.log('Transaction Pressed')}
            />
          )}
        />
      </View>

      <View
        position="absolute"
        bottom={40}
        left="50%"
        style={{transform: [{translateX: -28}]}}
        alignItems="center">
        <FloatingActionButton
          onPress={() => console.log('Add Button')}
          icon="plus"
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;
