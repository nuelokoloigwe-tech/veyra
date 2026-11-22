import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  ScrollView,
} from 'react-native';
import { useState } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { RootStackParamList } from '../navigation/types';
import { getFxRate } from '../data/fxRates';
import { Currency } from '../data/wallets';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'Exchange'
>;

const destinationCurrencies: Currency[] = [
  'NGN',
  'USD',
  'EUR',
  'CAD',
];

const currencyNames: Record<Currency, string> = {
  GBP: 'British Pound',
  NGN: 'Nigerian Naira',
  USD: 'US Dollar',
  EUR: 'Euro',
  CAD: 'Canadian Dollar',
};

const currencySymbols: Record<Currency, string> = {
  GBP: '£',
  NGN: '₦',
  USD: '$',
  EUR: '€',
  CAD: 'C$',
};

export default function ExchangeScreen({
  navigation,
}: Props) {
  const [amount, setAmount] = useState('');
  const [toCurrency, setToCurrency] =
    useState<Currency>('NGN');

  const fromCurrency: Currency = 'GBP';

  const rate = getFxRate(
    fromCurrency,
    toCurrency,
  );

  const numericAmount = Number(amount) || 0;

  const receiveAmount =
    numericAmount * rate;

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}

        <View style={styles.header}>
          <Pressable
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButton}>
              ‹
            </Text>
          </Pressable>

          <Text style={styles.title}>
            Exchange
          </Text>

          <View style={styles.headerSpacer} />
        </View>

        {/* From Currency */}

        <Text style={styles.label}>
          You send
        </Text>

        <View style={styles.amountCard}>
          <View>
            <Text style={styles.currencyCode}>
              GBP
            </Text>

            <Text style={styles.currencyName}>
              {currencyNames.GBP}
            </Text>
          </View>

          <View style={styles.amountContainer}>
            <Text style={styles.symbol}>
              £
            </Text>

            <TextInput
              style={styles.amountInput}
              keyboardType="decimal-pad"
              placeholder="0.00"
              placeholderTextColor="#9CA3AF"
              value={amount}
              onChangeText={setAmount}
            />
          </View>
        </View>

        {/* Exchange Direction */}

        <View style={styles.arrowContainer}>
          <View style={styles.arrowCircle}>
            <Text style={styles.arrow}>
              ↓
            </Text>
          </View>
        </View>

        {/* Destination Currency */}

        <Text style={styles.label}>
          You receive
        </Text>

        <View style={styles.receiveCard}>
          <View>
            <Text style={styles.currencyCode}>
              {toCurrency}
            </Text>

            <Text style={styles.currencyName}>
              {currencyNames[toCurrency]}
            </Text>
          </View>

          <Text style={styles.receiveAmount}>
            {currencySymbols[toCurrency]}
            {receiveAmount.toLocaleString(
              'en-GB',
              {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              },
            )}
          </Text>
        </View>

        {/* Currency Selection */}

        <Text style={styles.label}>
          Select currency
        </Text>

        <View style={styles.currencyGrid}>
          {destinationCurrencies.map(
            (currency) => (
              <Pressable
                key={currency}
                style={[
                  styles.currencyOption,
                  toCurrency === currency &&
                    styles.selectedCurrency,
                ]}
                onPress={() =>
                  setToCurrency(currency)
                }
              >
                <Text
                  style={[
                    styles.currencyOptionCode,
                    toCurrency === currency &&
                      styles.selectedCurrencyText,
                  ]}
                >
                  {currency}
                </Text>

                <Text
                  style={[
                    styles.currencyOptionName,
                    toCurrency === currency &&
                      styles.selectedCurrencyText,
                  ]}
                >
                  {currencyNames[currency]}
                </Text>
              </Pressable>
            ),
          )}
        </View>

        {/* Rate */}

        <View style={styles.rateCard}>
          <Text style={styles.rateLabel}>
            Exchange rate
          </Text>

          <Text style={styles.rate}>
            1 GBP = {rate.toLocaleString(
              'en-GB',
              {
                maximumFractionDigits: 4,
              },
            )}{' '}
            {toCurrency}
          </Text>
        </View>

        {/* Review */}

        <Pressable
          style={[
            styles.button,
            numericAmount <= 0 &&
              styles.disabledButton,
          ]}
          disabled={numericAmount <= 0}
          onPress={() =>
            navigation.navigate('Quote', {
              amount: numericAmount,
              fromCurrency,
              toCurrency,
              rate,
              receiveAmount,
            })
          }
        >
          <Text style={styles.buttonText}>
            Review exchange
          </Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },

  content: {
    padding: 24,
    paddingTop: 55,
    paddingBottom: 40,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
  },

  backButton: {
    fontSize: 38,
    color: '#111827',
    lineHeight: 38,
  },

  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
  },

  headerSpacer: {
    width: 30,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 10,
  },

  amountCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  receiveCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 26,
  },

  currencyCode: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },

  currencyName: {
    fontSize: 12,
    color: '#9CA3AF',
  },

  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  symbol: {
    fontSize: 24,
    fontWeight: '600',
    color: '#111827',
    marginRight: 4,
  },

  amountInput: {
    fontSize: 30,
    fontWeight: '700',
    color: '#111827',
    minWidth: 130,
    textAlign: 'right',
  },

  arrowContainer: {
    alignItems: 'center',
    height: 45,
    justifyContent: 'center',
  },

  arrowCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#111827',
    alignItems: 'center',
    justifyContent: 'center',
  },

  arrow: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
  },

  receiveAmount: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },

  currencyGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },

  currencyOption: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  selectedCurrency: {
    backgroundColor: '#111827',
    borderColor: '#111827',
  },

  currencyOptionCode: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },

  currencyOptionName: {
    fontSize: 11,
    color: '#6B7280',
  },

  selectedCurrencyText: {
    color: '#FFFFFF',
  },

  rateCard: {
    backgroundColor: '#F3F4F6',
    borderRadius: 14,
    padding: 16,
    marginBottom: 24,
  },

  rateLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 5,
  },

  rate: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
  },

  button: {
    backgroundColor: '#111827',
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
  },

  disabledButton: {
    opacity: 0.4,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});