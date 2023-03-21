import {View} from 'react-native-styled';
import React from 'react';
import {FlashList} from '@shopify/flash-list';
import Transaction, {TransactionType} from 'components/Transaction';
import ListEmpty from './ListEmpty';
import ListHeader from './ListHeader';
import {Platform} from 'react-native';

type Props = {
  transactions: TransactionType[];
  openTransaction: (transaction?: TransactionType) => void;
};

export default function TransactionList({
  transactions,
  openTransaction,
}: Props) {
  return (
    <FlashList
      data={transactions}
      keyExtractor={item => item.key}
      ListHeaderComponent={transactions.length ? ListHeader : null}
      ListEmptyComponent={ListEmpty}
      ItemSeparatorComponent={() => <View height={8} />}
      contentContainerStyle={{
        paddingHorizontal: 24,
        paddingBottom: 120,
        paddingTop: 48,
      }}
      estimatedItemSize={65}
      renderItem={({item}) => (
        <Transaction item={item} onPress={openTransaction} />
      )}
    />
  );
}
