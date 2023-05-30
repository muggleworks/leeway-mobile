import React, {useEffect, useState} from 'react';
import {SafeAreaView, View, LinearGradient, Text} from 'react-native-styled';
import FloatingActionButton from 'components/FloatingActionButton';
import DataCard from 'components/DataCard';
import {TransactionType} from 'components/Transaction';
import {useTheme} from 'styled-components/native';
import Header from 'components/Header';
import {NavigationProp} from '@react-navigation/native';
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

type Props = {
  navigation: NavigationProp<any>;
};

const Home = ({navigation}: Props) => {
  const theme = useTheme();
  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const [_1_Transaction, set_1_Transaction] = useState<TransactionType>(); // first transaction
  const [_N_Transaction, set_N_Transaction] = useState<TransactionType>(); // last transaction
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
      .orderBy('odometerReading', 'desc')
      .limit(100)
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
    const transactionCollection = firestore()
      .collection('users')
      .doc(user?.uid)
      .collection('transactions');
    const subscriber = transactionCollection
      .orderBy('odometerReading', 'desc')
      .limit(1)
      .onSnapshot(querySnapshot => {
        if (querySnapshot.docs.length === 0) {
          return;
        }
        const lastTransaction = querySnapshot.docs[0].data() as TransactionType;
        set_N_Transaction(lastTransaction);
        setDataCard(dc => ({
          ...dc,
          odometerLastReading: lastTransaction.odometerReading,
        }));
      });
    return subscriber;
  }, []);

  useEffect(() => {
    const user = auth().currentUser;
    const transactionCollection = firestore()
      .collection('users')
      .doc(user?.uid)
      .collection('transactions');
    const subscriber = transactionCollection
      .orderBy('odometerReading', 'asc')
      .limit(1)
      .onSnapshot(querySnapshot => {
        if (querySnapshot.docs.length === 0) {
          return;
        }
        const firstTransaction =
          querySnapshot.docs[0].data() as TransactionType;
        set_1_Transaction(firstTransaction);
        setDataCard(dc => ({
          ...dc,
          odometerFirstReading: firstTransaction.odometerReading,
        }));
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
        setDataCard(dc => ({...dc, ...data?.dataCard}));
      });
    return subscriber;
  }, []);

  const getMileage = () => {
    if (transactions.length < 2) {
      return;
    }
    const netQuantity =
      dataCard.totalQuantity - (_N_Transaction?.quantity || 0);
    return (
      (dataCard.odometerLastReading - dataCard.odometerFirstReading) /
      netQuantity
    );
  };

  const getRunningCost = () => {
    if (transactions.length < 2) {
      return;
    }
    const netAmount = dataCard.totalAmount - (_N_Transaction?.amount || 0);
    return (
      netAmount / (dataCard.odometerLastReading - dataCard.odometerFirstReading)
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
          <DataCard name="mileage" value={getMileage()} suffix="km/l" />
        </View>
        <View marginLeft={-10}>
          <DataCard type="secondary" value={getRunningCost()} suffix="₹/km" />
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
