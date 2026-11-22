import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';
import { getTransactions } from '../data/transactionStore';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'TransactionHistory'
>;

export default function TransactionHistoryScreen({
  navigation,
}: Props) {
  const [transactions, setTransactions] = useState(
    getTransactions(),
  );

  useFocusEffect(
    useCallback(() => {
      const loadTransactions = async () => {
        const storedTransactions =
          getTransactions();

        setTransactions([
          ...storedTransactions,
        ]);
      };

      loadTransactions();
    }, []),
  );

  const formatCurrency = (
    currency: string,
    amount: number,
  ) => {
    const symbols: Record<string, string> = {
      GBP: '£',
      NGN: '₦',
      USD: '$',
      EUR: '€',
      CAD: 'C$',
    };

    return `${symbols[currency] ?? ''}${amount.toLocaleString(
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
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Header */}

        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>

          <Text style={styles.headerTitle}>
            Transaction history
          </Text>

          <View style={styles.headerSpacer} />
        </View>

        {transactions.length === 0 ? (
          <View style={styles.emptyCard}>
            <View style={styles.emptyIcon}>
              <Text style={styles.emptyIconText}>
                ⇄
              </Text>
            </View>

            <Text style={styles.emptyTitle}>
              No transactions yet
            </Text>

            <Text style={styles.emptyText}>
              Your completed exchanges will appear
              here.
            </Text>
          </View>
        ) : (
          <View>
            {transactions.map((transaction) => (
              <TouchableOpacity
                key={transaction.reference}
                style={styles.transactionCard}
                activeOpacity={0.7}
                onPress={() =>
                  navigation.navigate(
                    'TransactionDetails',
                    {
                      transaction,
                    },
                  )
                }
              >
                <View style={styles.transactionIcon}>
                  <Text
                    style={
                      styles.transactionIconText
                    }
                  >
                    ⇄
                  </Text>
                </View>

                <View style={styles.transactionInfo}>
                  <Text
                    style={styles.transactionTitle}
                  >
                    {transaction.fromCurrency} →{' '}
                    {transaction.toCurrency}
                  </Text>

                  <Text
                    style={styles.transactionAmount}
                  >
                    {formatCurrency(
                      transaction.fromCurrency,
                      transaction.amount,
                    )}{' '}
                    →{' '}
                    {formatCurrency(
                      transaction.toCurrency,
                      transaction.receiveAmount,
                    )}
                  </Text>

                  <Text
                    style={styles.transactionDate}
                  >
                    {new Date(
                      transaction.createdAt,
                    ).toLocaleString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </Text>
                </View>

                <View
                  style={styles.transactionRight}
                >
                  <Text style={styles.statusText}>
                    {transaction.status}
                  </Text>

                  <Text style={styles.chevron}>
                    ›
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
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
    paddingHorizontal: 20,
    paddingTop: 55,
    paddingBottom: 40,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 28,
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  backIcon: {
    fontSize: 32,
    lineHeight: 34,
    color: '#111827',
    fontWeight: '300',
    marginTop: -3,
  },

  headerTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: '#111827',
  },

  headerSpacer: {
    width: 42,
  },

  transactionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },

  transactionIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  transactionIconText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },

  transactionInfo: {
    flex: 1,
  },

  transactionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 5,
  },

  transactionAmount: {
    fontSize: 12,
    color: '#374151',
    marginBottom: 4,
  },

  transactionDate: {
    fontSize: 11,
    color: '#9CA3AF',
  },

  transactionRight: {
    alignItems: 'flex-end',
    marginLeft: 8,
  },

  statusText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#16A34A',
    marginBottom: 6,
  },

  chevron: {
    fontSize: 24,
    color: '#9CA3AF',
    fontWeight: '300',
  },

  emptyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    marginTop: 20,
  },

  emptyIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },

  emptyIconText: {
    fontSize: 26,
    fontWeight: '700',
    color: '#111827',
  },

  emptyTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 6,
  },

  emptyText: {
    fontSize: 13,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 19,
  },
});