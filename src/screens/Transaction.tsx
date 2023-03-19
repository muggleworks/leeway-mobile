import {View, SafeAreaView} from 'react-native-styled';
import React, {useEffect, useState} from 'react';
import Header from 'components/Header';
import Input from 'components/Input';
import FloatingActionButton from 'components/FloatingActionButton';
import {TransactionType} from 'components/Transaction';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

type FormData = {
  key?: string;
  currentKm?: string;
  amount?: string;
  quantity?: string;
  unitPrice?: string;
  createdAt?: string;
};

export default function Transaction({navigation, route}) {
  const [formData, setFormData] = useState<FormData>();
  const transactionCollection = firestore()
    .collection('users')
    .doc(auth().currentUser?.uid)
    .collection('transactions');

  const updateFromData = (value: FormData) => {
    setFormData({...formData, ...value});
  };

  useEffect(() => {
    const transaction = route.params.transaction as TransactionType;
    if (transaction) {
      setFormData({
        currentKm: transaction.currentKm.toString(),
        unitPrice: transaction.unitPrice.toString(),
        quantity: transaction.quantity.toString(),
        amount: transaction.amount.toString(),
        createdAt: transaction.createdAt.toString(),
        key: transaction.key,
      });
    } else {
      setFormData({createdAt: new Date().toDateString()});
    }
  }, [route]);

  const saveTransaction = () => {
    if (
      formData?.currentKm &&
      formData.amount &&
      formData.createdAt &&
      formData.quantity &&
      formData.unitPrice
    ) {
      const data = {
        currentKm: Number(Number(formData.currentKm).toFixed(2)),
        amount: Number(Number(formData.amount).toFixed(2)),
        quantity: Number(Number(formData.quantity).toFixed(2)),
        unitPrice: Number(Number(formData.unitPrice).toFixed(2)),
        createdAt: new Date(formData.createdAt),
      };
      if (formData.key) {
        transactionCollection
          .doc(formData.key)
          .set(data)
          .then(() => navigation.goBack());
      } else {
        transactionCollection.add(data).then(() => navigation.goBack());
      }
    }
  };

  const deleteTransaction = () => {
    if (formData?.key) {
      transactionCollection
        .doc(formData.key)
        .delete()
        .then(() => navigation.goBack());
    }
  };

  return (
    <SafeAreaView flex={1} position="relative">
      <Header
        title="fuel expense"
        left={{
          iconName: 'left',
          actionHandler: navigation.goBack,
        }}
        right={
          formData?.key
            ? {iconName: 'trash', actionHandler: deleteTransaction}
            : undefined
        }
      />
      <View px={24} pt={32} gap={20}>
        <Input
          label="current km"
          value={formData?.currentKm}
          onChangeText={value => updateFromData({currentKm: value})}
        />
        <Input
          label="unit price"
          value={formData?.unitPrice}
          onChangeText={value => updateFromData({unitPrice: value})}
        />
        <Input
          label="amount"
          value={formData?.amount}
          onChangeText={value => updateFromData({amount: value})}
        />
        <Input
          label="quantity"
          value={formData?.quantity}
          onChangeText={value => updateFromData({quantity: value})}
        />
        <Input label="date" disabled value={formData?.createdAt} />
      </View>

      <View
        position="absolute"
        bottom={40}
        left="50%"
        style={{transform: [{translateX: -28}]}}
        alignItems="center">
        <FloatingActionButton onPress={saveTransaction} icon="check" />
      </View>
    </SafeAreaView>
  );
}
