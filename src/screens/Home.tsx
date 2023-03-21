import React, {useEffect, useState} from 'react';
import {SafeAreaView, View, LinearGradient, Text} from 'react-native-styled';
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
import {useWindowDimensions} from 'react-native';

export type DataCardType = {
  odometerFirstReading: number;
  odometerLastReading: number;
  totalQuantity: number;
  totalAmount: number;
};

const Home = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const [dataCard, setDataCard] = useState<DataCardType>({
    odometerFirstReading: 0,
    odometerLastReading: 0,
    totalAmount: 0,
    totalQuantity: 0,
  });

  const {width} = useWindowDimensions();

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

  const getKmpl = () => {
    if (transactions.length < 2) {
      return;
    }
    return (
      (dataCard.odometerLastReading - dataCard.odometerFirstReading) /
      dataCard.totalQuantity
    );
  };

  const getRspkm = () => {
    if (transactions.length < 2) {
      return;
    }
    return (
      dataCard.totalAmount /
      (dataCard.odometerLastReading - dataCard.odometerFirstReading)
    );
  };

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
          <DataCard name="millage" value={getKmpl()} suffix="km/l" />
        </View>
        <View marginLeft={-10}>
          <DataCard type="secondary" value={getRspkm()} suffix="₹/km" />
        </View>
        {transactions.length < 2 && (
          <View
            zIndex={2}
            width={width + 20}
            px={40}
            position="absolute"
            left="-10px"
            bottom="40px"
            style={{transform: [{rotate: '-5deg'}]}}
            bg="textSecondary"
            py="8px">
            <Text color="white" fontSize="p1" textAlign="center">
              This data will be available once we have enough transaction data
            </Text>
          </View>
        )}
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
