import {View, SafeAreaView} from 'react-native-styled';
import React, {useEffect, useState} from 'react';
import Header from 'components/Header';
import Input from 'components/Input';
import FloatingActionButton from 'components/FloatingActionButton';
import {TransactionType} from 'components/Transaction';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {Alert, ScrollView} from 'react-native';

type FormData = {
  key?: string;
  odometerReading?: string;
  amount?: string;
  quantity?: string;
  unitPrice?: string;
  createdAt?: string;
};

type DataCardInfo = {
  totalAmount: number;
  totalQuantity: number;
};

export default function Transaction({navigation, route}) {
  const [formData, setFormData] = useState<FormData>();
  const [transaction, setTransaction] = useState<TransactionType>();
  const [dataCard, setDataCard] = useState<DataCardInfo>({
    totalAmount: 0,
    totalQuantity: 0,
  });
  const transactionCollection = firestore()
    .collection('users')
    .doc(auth().currentUser?.uid)
    .collection('transactions');

  const updateFromData = (value: FormData) => {
    const valueChanged = Object.keys(value)[0];
    if (valueChanged === 'amount' && formData?.unitPrice) {
      value.quantity = (
        Number(value.amount) / Number(formData.unitPrice)
      ).toString();
    }

    if (valueChanged === 'quantity' && formData?.unitPrice) {
      value.amount = (
        Number(value.quantity) * Number(formData.unitPrice)
      ).toString();
    }

    if (valueChanged === 'unitPrice' && formData?.amount && formData.quantity) {
      value.quantity = (
        Number(formData.amount) / Number(value.unitPrice)
      ).toString();
    }

    setFormData({...formData, ...value});
  };

  useEffect(() => {
    const transactionData = route.params.transaction as TransactionType;
    setTransaction(transactionData);
    if (transactionData) {
      setFormData({
        odometerReading: transactionData.odometerReading.toString(),
        unitPrice: transactionData.unitPrice.toString(),
        quantity: transactionData.quantity.toString(),
        amount: transactionData.amount.toString(),
        createdAt: transactionData.createdAt.toString(),
        key: transactionData.key,
      });
    } else {
      setFormData({createdAt: new Date().toDateString()});
    }
  }, [route]);

  useEffect(() => {
    const user = auth().currentUser;
    const subscriber = firestore()
      .collection('users')
      .doc(user?.uid)
      .onSnapshot(snapshot => {
        const data = snapshot.data();
        setDataCard(dc => data?.dataCard || dc);
      });
    return subscriber;
  }, []);

  const updateDataCard = (newData: DataCardInfo) => {
    const user = auth().currentUser;
    firestore().collection('users').doc(user?.uid).update({dataCard: newData});
  };

  const saveTransaction = () => {
    if (
      formData?.odometerReading &&
      formData.amount &&
      formData.createdAt &&
      formData.quantity &&
      formData.unitPrice
    ) {
      const data = {
        odometerReading: Number(formData.odometerReading),
        unitPrice: Number(formData.unitPrice),
        amount: Number(formData.amount),
        quantity: Number(formData.quantity),
        createdAt: new Date(formData.createdAt),
      };

      const newDataCard: DataCardInfo = {
        ...dataCard,
      };

      if (formData.key) {
        newDataCard.totalQuantity +=
          Number(formData.quantity) - (transaction?.quantity ?? 0);
        newDataCard.totalAmount +=
          Number(formData.amount) - (transaction?.amount ?? 0);

        transactionCollection
          .doc(formData.key)
          .set(data)
          .then(() => navigation.goBack());
      } else {
        newDataCard.totalQuantity += Number(formData.quantity);
        newDataCard.totalAmount += Number(formData.amount);

        transactionCollection.add(data).then(() => navigation.goBack());
      }

      updateDataCard(newDataCard);
    }
  };

  const deleteTransaction = () => {
    if (formData?.key) {
      const newDataCard: DataCardInfo = {
        ...dataCard,
      };

      if (
        transaction?.odometerReading &&
        transaction.amount &&
        transaction.quantity
      ) {
        newDataCard.totalAmount -= transaction.amount;
        newDataCard.totalQuantity -= transaction.quantity;
      }

      transactionCollection
        .doc(formData.key)
        .delete()
        .then(() => navigation.goBack());

      updateDataCard(newDataCard);
    }
  };

  const handleDelete = () => {
    if (formData?.key) {
      Alert.alert(
        'Delete Transaction',
        'Are you sure you want to delete this transaction?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {text: 'Delete', style: 'destructive', onPress: deleteTransaction},
        ],
      );
    }
  };

  return (
    <SafeAreaView flex={1} position="relative" bg="white">
      <Header
        title="fuel expense"
        left={{
          iconName: 'left',
          actionHandler: navigation.goBack,
        }}
        right={
          formData?.key
            ? {iconName: 'trash', actionHandler: handleDelete}
            : undefined
        }
      />
      <ScrollView>
        <View px={24} py={32} gap={20}>
          <Input
            label="odometer (km)"
            value={formData?.odometerReading}
            inputMode="decimal"
            keyboardType="decimal-pad"
            onChangeText={value => updateFromData({odometerReading: value})}
          />
          <Input
            label="unit price (₹)"
            inputMode="decimal"
            value={formData?.unitPrice}
            keyboardType="decimal-pad"
            onChangeText={value => updateFromData({unitPrice: value})}
          />
          <Input
            label="purchase amount (₹)"
            inputMode="decimal"
            value={formData?.amount}
            keyboardType="decimal-pad"
            onChangeText={value => updateFromData({amount: value})}
          />
          <Input
            label="quantity (l)"
            inputMode="decimal"
            keyboardType="decimal-pad"
            value={formData?.quantity}
            onChangeText={value => updateFromData({quantity: value})}
          />
          <Input label="date" disabled value={formData?.createdAt} />
        </View>
      </ScrollView>

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
