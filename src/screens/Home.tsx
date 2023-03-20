import React, {useEffect, useState} from 'react';
import {SafeAreaView, View, LinearGradient} from 'react-native-styled';
import FloatingActionButton from 'components/FloatingActionButton';
import DataCard from 'components/DataCard';
import {TransactionType} from 'components/Transaction';
import {useTheme} from 'styled-components/native';
import Header from 'components/Header';
import {useNavigation} from '@react-navigation/native';
import {screens} from 'screens/index';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import TransactionList from 'components/TransactionList';

const Home = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const [transactions, setTransactions] = useState<TransactionType[]>([]);

  const openSettings = () => {
    navigation.navigate(screens.Settings);
  };

  const openTransaction = (transaction?: TransactionType) => {
    navigation.navigate(
      screens.Transaction,
      transaction
        ? {
            transaction: {
              ...transaction,
              createdAt: transaction?.createdAt.toDateString(),
            },
          }
        : {},
    );
  };

  useEffect(() => {
    const user = auth().currentUser;
    const subscriber = firestore()
      .collection('users')
      .doc(user?.uid)
      .collection('transactions')
      .limit(100)
      .orderBy('createdAt', 'desc')
      .onSnapshot(querySnapshot => {
        const transactionList: TransactionType[] = [];
        querySnapshot.forEach(documentSnapshot => {
          transactionList.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
            // @ts-ignore
            createdAt: documentSnapshot.get('createdAt')?.toDate(),
          } as TransactionType);
        });
        setTransactions(transactionList);
      });
    return subscriber;
  }, []);

  return (
    <SafeAreaView edges={['top', 'left', 'right']} bg="white" flex={1}>
      <Header
        title="leeway"
        right={{
          iconName: 'settings',
          actionHandler: openSettings,
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
        <TransactionList
          transactions={transactions}
          openTransaction={openTransaction}
        />
      </View>

      <View
        position="absolute"
        bottom={40}
        left="50%"
        style={{transform: [{translateX: -28}]}}
        alignItems="center">
        <FloatingActionButton onPress={() => openTransaction()} icon="plus" />
      </View>
    </SafeAreaView>
  );
};

export default Home;
