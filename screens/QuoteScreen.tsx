import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { RootStackParamList } from '../navigation/types';
import { Currency } from '../data/wallets';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'Quote'
>;

const currencySymbols: Record<Currency, string> = {
  GBP: '£',
  NGN: '₦',
  USD: '$',
  EUR: '€',
  CAD: 'C$',
};

const currencyNames: Record<Currency, string> = {
  GBP: 'British Pound',
  NGN: 'Nigerian Naira',
  USD: 'US Dollar',
  EUR: 'Euro',
  CAD: 'Canadian Dollar',
};

export default function QuoteScreen({
  navigation,
  route,
}: Props) {
  const {
    amount,
    fromCurrency,
    toCurrency,
    rate,
    receiveAmount,
  } = route.params;

  const formatAmount = (
    currency: Currency,
    value: number,
  ) => {
    return `${currencySymbols[currency]}${value.toLocaleString(
      'en-GB',
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      },
    )}`;
  };

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
            Review quote
          </Text>

          <View style={styles.headerSpacer} />
        </View>

        {/* Quote */}

        <View style={styles.quoteCard}>
          <Text style={styles.quoteLabel}>
            You send
          </Text>

          <Text style={styles.sendAmount}>
            {formatAmount(
              fromCurrency,
              amount,
            )}
          </Text>

          <Text style={styles.currencyName}>
            {currencyNames[fromCurrency]}
          </Text>

          <View style={styles.divider} />

          <Text style={styles.quoteLabel}>
            You receive
          </Text>

          <Text style={styles.receiveAmount}>
            {formatAmount(
              toCurrency,
              receiveAmount,
            )}
          </Text>

          <Text style={styles.currencyName}>
            {currencyNames[toCurrency]}
          </Text>
        </View>

        {/* Rate */}

        <View style={styles.detailCard}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>
              Exchange rate
            </Text>

            <Text style={styles.detailValue}>
              1 {fromCurrency} ={' '}
              {rate.toLocaleString('en-GB', {
                maximumFractionDigits: 4,
              })}{' '}
              {toCurrency}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>
              Exchange amount
            </Text>

            <Text style={styles.detailValue}>
              {formatAmount(
                fromCurrency,
                amount,
              )}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>
              Fee
            </Text>

            <Text style={styles.detailValue}>
              £0.00
            </Text>
          </View>
        </View>

        {/* Expiry */}

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>
            Quote information
          </Text>

          <Text style={styles.infoText}>
            This is a sandbox exchange quote.
            The final rate will be confirmed
            before the transaction is executed.
          </Text>
        </View>

        {/* Confirm */}

        <Pressable
          style={styles.button}
          onPress={() =>
            navigation.navigate(
              'Confirmation',
              {
                amount,
                fromCurrency,
                toCurrency,
                rate,
                receiveAmount,
              },
            )
          }
        >
          <Text style={styles.buttonText}>
            Continue
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

  quoteCard: {
    backgroundColor: '#111827',
    borderRadius: 22,
    padding: 24,
    marginBottom: 18,
  },

  quoteLabel: {
    fontSize: 13,
    color: '#9CA3AF',
    marginBottom: 8,
  },

  sendAmount: {
    fontSize: 30,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  receiveAmount: {
    fontSize: 30,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  currencyName: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 4,
  },

  divider: {
    height: 1,
    backgroundColor: '#374151',
    marginVertical: 24,
  },

  detailCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },

  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },

  detailLabel: {
    fontSize: 13,
    color: '#6B7280',
  },

  detailValue: {
    fontSize: 13,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'right',
  },

  infoCard: {
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    padding: 18,
    marginBottom: 24,
  },

  infoTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 6,
  },

  infoText: {
    fontSize: 12,
    lineHeight: 18,
    color: '#6B7280',
  },

  button: {
    backgroundColor: '#111827',
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});