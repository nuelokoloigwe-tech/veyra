import React, { useState } from 'react';
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
import {
  exchangeFromGbp,
  getWalletBalance,
} from '../data/walletStore';
import { addTransaction } from '../data/transactionStore';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'Confirmation'
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

export default function ConfirmationScreen({
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

  const [isProcessing, setIsProcessing] =
    useState(false);

  const [errorMessage, setErrorMessage] =
    useState('');

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

  const handleConfirm = async () => {
    if (isProcessing) {
      return;
    }

    setErrorMessage('');

    try {
      setIsProcessing(true);

      // Validate exchange amount.
      if (!Number.isFinite(amount) || amount <= 0) {
        throw new Error(
          'Please enter a valid exchange amount.',
        );
      }

      // Validate FX rate.
      if (!Number.isFinite(rate) || rate <= 0) {
        throw new Error(
          'The exchange rate is unavailable.',
        );
      }

      // Validate calculated receive amount.
      if (
        !Number.isFinite(receiveAmount) ||
        receiveAmount <= 0
      ) {
        throw new Error(
          'The exchange amount could not be calculated.',
        );
      }

      // Validate source wallet balance.
      const availableBalance =
        getWalletBalance(fromCurrency);

      if (availableBalance < amount) {
        throw new Error(
          `Insufficient ${fromCurrency} balance. Available balance: ${formatAmount(
            fromCurrency,
            availableBalance,
          )}.`,
        );
      }

      // Execute the wallet debit.
      await exchangeFromGbp(
        amount,
        toCurrency,
        receiveAmount,
      );

      // Generate transaction reference.
      const reference =
        `VYR-${Math.random()
          .toString(36)
          .substring(2, 8)
          .toUpperCase()}`;

      // Record transaction.
      await addTransaction({
        reference,
        type: 'FX Exchange',
        status: 'Completed',
        fromCurrency,
        toCurrency,
        amount,
        receiveAmount,
        rate,
        fee: 0,
        createdAt: new Date().toISOString(),
      });

      // Navigate only after wallet debit
      // and transaction creation succeed.
      navigation.navigate('Success', {
        amount,
        fromCurrency,
        toCurrency,
        rate,
        receiveAmount,
        reference,
      });
    } catch (error) {
      console.error(
        'Exchange failed:',
        error,
      );

      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage(
          'The exchange could not be completed. Please try again.',
        );
      }
    } finally {
      setIsProcessing(false);
    }
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
            disabled={isProcessing}
          >
            <Text style={styles.backButton}>
              ‹
            </Text>
          </Pressable>

          <Text style={styles.title}>
            Confirm exchange
          </Text>

          <View style={styles.headerSpacer} />
        </View>

        {/* Main Summary */}

        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>
            You are exchanging
          </Text>

          <Text style={styles.amount}>
            {formatAmount(
              fromCurrency,
              amount,
            )}
          </Text>

          <Text style={styles.currencyName}>
            {currencyNames[fromCurrency]}
          </Text>

          <View style={styles.arrowContainer}>
            <Text style={styles.arrow}>
              ↓
            </Text>
          </View>

          <Text style={styles.summaryLabel}>
            You will receive
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

        {/* Transaction Details */}

        <View style={styles.detailsCard}>
          <Text style={styles.sectionTitle}>
            Exchange details
          </Text>

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
              Fee
            </Text>

            <Text style={styles.detailValue}>
              £0.00
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>
              Source
            </Text>

            <Text style={styles.detailValue}>
              {fromCurrency} balance
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>
              Destination
            </Text>

            <Text style={styles.detailValue}>
              {toCurrency}
            </Text>
          </View>
        </View>

        {/* Error */}

        {errorMessage.length > 0 && (
          <View style={styles.errorCard}>
            <Text style={styles.errorTitle}>
              Exchange unsuccessful
            </Text>

            <Text style={styles.errorText}>
              {errorMessage}
            </Text>
          </View>
        )}

        {/* Sandbox Notice */}

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>
            Sandbox transaction
          </Text>

          <Text style={styles.infoText}>
            This transaction uses test balances
            and does not move real money.
          </Text>
        </View>

        {/* Confirm */}

        <Pressable
          style={[
            styles.button,
            isProcessing && styles.buttonDisabled,
          ]}
          onPress={handleConfirm}
          disabled={isProcessing}
        >
          <Text style={styles.buttonText}>
            {isProcessing
              ? 'Processing...'
              : 'Confirm exchange'}
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

  summaryCard: {
    backgroundColor: '#111827',
    borderRadius: 22,
    padding: 24,
    marginBottom: 18,
    alignItems: 'center',
  },

  summaryLabel: {
    fontSize: 13,
    color: '#9CA3AF',
    marginBottom: 8,
  },

  amount: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  receiveAmount: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  currencyName: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 4,
  },

  arrowContainer: {
    marginVertical: 20,
  },

  arrow: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '700',
  },

  detailsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 10,
  },

  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 9,
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

  errorCard: {
    backgroundColor: '#FEF2F2',
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#FECACA',
  },

  errorTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#991B1B',
    marginBottom: 6,
  },

  errorText: {
    fontSize: 12,
    lineHeight: 18,
    color: '#B91C1C',
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

  buttonDisabled: {
    opacity: 0.6,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});