import {View, SafeAreaView} from 'react-native-styled';
import React, {useEffect, useState} from 'react';
import Header from 'components/Header';
import Input from 'components/Input';
import FloatingActionButton from 'components/FloatingActionButton';
import {TransactionType} from 'components/Transaction';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {Alert, ScrollView} from 'react-native';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {useToast} from 'react-native-toast-notifications';

type FormData = {
  key?: string;
  odometerReading?: string;
  amount?: string;
  quantity?: string;
  unitPrice?: string;
  createdAt?: string;
};
type Props = {
  navigation: NavigationProp<any>;
  route: RouteProp<any>;
};
export default function Transaction({navigation, route}: Props) {
  const toast = useToast();
  const [formData, setFormData] = useState<FormData>();
  const [transaction, setTransaction] = useState<TransactionType>();
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

  const saveTransaction = (data: TransactionType) => {
    const user = auth().currentUser;
    const userDocumentRef = firestore().collection('users').doc(user?.uid);
    return firestore().runTransaction(async firestoreTransaction => {
      const userSnapshot = await firestoreTransaction.get(userDocumentRef);
      const transactionSnapshot = data.key
        ? await firestoreTransaction.get(transactionCollection.doc(data.key))
        : null;

      firestoreTransaction.set(userDocumentRef, {
        dataCard: {
          totalAmount:
            (userSnapshot.data()?.dataCard.totalAmount || 0) +
            data.amount -
            (transactionSnapshot?.data()?.amount || 0),
          totalQuantity:
            (userSnapshot.data()?.dataCard.totalQuantity || 0) +
            data.quantity -
            (transactionSnapshot?.data()?.totalQuantity || 0),
        },
      });

      firestoreTransaction.set(
        transactionCollection.doc(data.key || undefined),
        {
          unitPrice: data.unitPrice,
          odometerReading: data.odometerReading,
          amount: data.amount,
          quantity: data.quantity,
          createdAt: data.createdAt,
        },
      );
      toast.show('Saved Successfully!', {
        type: 'success',
      });
    });
  };

  const handleSave = async () => {
    try {
      if (
        formData?.odometerReading &&
        formData.amount &&
        formData.createdAt &&
        formData.quantity &&
        formData.unitPrice
      ) {
        const data: TransactionType = {
          key: formData.key || '',
          odometerReading: Number(formData.odometerReading),
          unitPrice: Number(formData.unitPrice),
          amount: Number(formData.amount),
          quantity: Number(formData.quantity),
          createdAt: new Date(formData.createdAt),
        };

        console.log(data);

        await saveTransaction(data);
        navigation.goBack();
      }
    } catch (error) {
      toast.show('Sorry, your submission has failed!', {type: 'danger'});
      console.log('Error while submitting expense', error);
    }
  };

  const deleteTransaction = () => {
    const user = auth().currentUser;
    const userDocumentRef = firestore().collection('users').doc(user?.uid);
    return firestore().runTransaction(async firestoreTransaction => {
      const userSnapshot = await firestoreTransaction.get(userDocumentRef);

      if (userSnapshot.exists && transaction) {
        firestoreTransaction.update(userDocumentRef, {
          dataCard: {
            totalAmount:
              userSnapshot.data()!.dataCard.totalAmount - transaction.amount,
            totalQuantity:
              userSnapshot.data()!.dataCard.totalQuantity -
              transaction.quantity,
          },
        });

        firestoreTransaction.delete(transactionCollection.doc(formData?.key));
      }
    });
  };

  const deleteFunction = () => {
    if (formData?.key) {
      deleteTransaction()
        .then(navigation.goBack)
        .catch(error => console.log(error));
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
          {text: 'Delete', style: 'destructive', onPress: deleteFunction},
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
        <FloatingActionButton onPress={handleSave} icon="check" />
      </View>
    </SafeAreaView>
  );
}
