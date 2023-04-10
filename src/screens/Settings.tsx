import React, {useRef} from 'react';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native-styled';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import Button from 'components/Button';
import Header from 'components/Header';
import KeyValueButton from 'components/KeyValueButton';
import {Linking} from 'react-native';
import SelectSheet, {SelectSheetRef} from 'components/SelectSheet';
import CURRENCY_LIST from 'constants/currencyList';

export default function Settings() {
  const {goBack} = useNavigation();

  const unitsSheetRef = useRef<SelectSheetRef>(null);
  const currencySheetRef = useRef<SelectSheetRef>(null);

  const signOut = async () => {
    try {
      await auth().signOut();
    } catch (error) {
      console.log('Failed to sign out', error);
    }
  };

  const openTermsAndConditions = () => {
    Linking.openURL('https://leeway.zympl.com/terms-and-conditions');
  };

  const openUnitsSheet = () => {
    unitsSheetRef?.current?.open();
  };

  const onSelectUnit = (index: number) => {
    unitsSheetRef?.current?.close();
  };

  const openCurrencySheet = () => {
    currencySheetRef?.current?.open();
  };

  const onSelectCurrency = (index: number) => {
    currencySheetRef?.current?.close();
  };

  return (
    <>
      <SafeAreaView flex={1} bg="white">
        <Header
          title="settings"
          left={{iconName: 'left', actionHandler: goBack}}
        />
        <View flex={1} px="24px" py="32px">
          <View flex={1} gap={16}>
            <KeyValueButton
              label="display units"
              value="metric"
              onPress={openUnitsSheet}
            />
            <KeyValueButton
              label="display currency"
              value="INR(₹)"
              onPress={openCurrencySheet}
            />
          </View>
          <View alignItems="center" my="24px">
            <TouchableOpacity onPress={openTermsAndConditions}>
              <Text color="textSecondary" fontSize="p2">
                terms & conditions
              </Text>
            </TouchableOpacity>
          </View>
          <View alignItems="center">
            <Button label="sign out" onPress={signOut} />
          </View>
        </View>
      </SafeAreaView>
      <SelectSheet
        selectedIndex={0}
        ref={unitsSheetRef}
        title="display units"
        options={['metric (kilometer & litre)', 'imperial (mile & gallon)']}
        onPress={onSelectUnit}
      />
      <SelectSheet
        selectedIndex={2}
        ref={currencySheetRef}
        title="display currency"
        options={Object.keys(CURRENCY_LIST).map(
          key => key + `(${CURRENCY_LIST[key].symbol})`,
        )}
        onPress={onSelectCurrency}
      />
    </>
  );
}
