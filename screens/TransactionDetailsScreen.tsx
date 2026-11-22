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

type Props = NativeStackScreenProps<
  RootStackParamList,
  'TransactionDetails'
>;

export default function TransactionDetailsScreen({
  navigation,
  route,
}: Props) {
  const { transaction } = route.params;

  const formatCurrency = (
    currency: string,
    value: number,
  ) => {
    const symbols: Record<string, string> = {
      GBP: '£',
      NGN: '₦',
      USD: '$',
      EUR: '€',
      CAD: 'C$',
    };

    return `${symbols[currency] ?? ''}${value.toLocaleString(
      'en-GB',
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      },
    )}`;
  };

  const formattedDate = new Date(
    transaction.createdAt,
  ).toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

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
            Transaction details
          </Text>

          <View style={styles.headerSpacer} />
        </View>

        {/* Status */}

        <View style={styles.statusSection}>
          <View style={styles.successCircle}>
            <Text style={styles.checkmark}>✓</Text>
          </View>

          <Text style={styles.successTitle}>
            {transaction.status}
          </Text>

          <Text style={styles.reference}>
            {transaction.reference}
          </Text>
        </View>

        {/* Main Transaction Card */}

        <View style={styles.mainCard}>
          <Text style={styles.sectionLabel}>
            You exchanged
          </Text>

          <Text style={styles.sendAmount}>
            {formatCurrency(
              transaction.fromCurrency,
              transaction.amount,
            )}
          </Text>

          <Text style={styles.currencyLabel}>
            {transaction.fromCurrency}
          </Text>

          <View style={styles.exchangeDivider}>
            <View style={styles.dividerLine} />

            <View style={styles.exchangeIcon}>
              <Text style={styles.exchangeIconText}>
                ⇄
              </Text>
            </View>

            <View style={styles.dividerLine} />
          </View>

          <Text style={styles.sectionLabel}>
            You received
          </Text>

          <Text style={styles.receiveAmount}>
            {formatCurrency(
              transaction.toCurrency,
              transaction.receiveAmount,
            )}
          </Text>

          <Text style={styles.currencyLabel}>
            {transaction.toCurrency}
          </Text>
        </View>

        {/* Transaction Information */}

        <Text style={styles.sectionTitle}>
          Transaction information
        </Text>

        <View style={styles.detailsCard}>
          <DetailRow
            label="Exchange rate"
            value={`1 ${transaction.fromCurrency} = ${transaction.rate} ${transaction.toCurrency}`}
          />

          <DetailRow
            label="Fee"
            value={formatCurrency(
              transaction.fromCurrency,
              transaction.fee,
            )}
          />

          <DetailRow
            label="Transaction type"
            value={transaction.type}
          />

          <DetailRow
            label="Date & time"
            value={formattedDate}
          />

          <DetailRow
            label="Reference"
            value={transaction.reference}
            last
          />
        </View>

        {/* Sandbox Notice */}

        <View style={styles.noticeCard}>
          <Text style={styles.noticeTitle}>
            Sandbox transaction
          </Text>

          <Text style={styles.noticeText}>
            This transaction uses test funds. No real
            money has been transferred.
          </Text>
        </View>

        {/* Done Button */}

        <TouchableOpacity
          style={styles.doneButton}
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.doneButtonText}>
            Done
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

function DetailRow({
  label,
  value,
  last = false,
}: {
  label: string;
  value: string;
  last?: boolean;
}) {
  return (
    <View
      style={[
        styles.detailRow,
        last && styles.lastDetailRow,
      ]}
    >
      <Text style={styles.detailLabel}>
        {label}
      </Text>

      <Text style={styles.detailValue}>
        {value}
      </Text>
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
    marginBottom: 30,
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

  statusSection: {
    alignItems: 'center',
    marginBottom: 25,
  },

  successCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#DCFCE7',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },

  checkmark: {
    fontSize: 32,
    fontWeight: '700',
    color: '#16A34A',
  },

  successTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#16A34A',
    marginBottom: 5,
  },

  reference: {
    fontSize: 13,
    color: '#6B7280',
  },

  mainCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 24,
    alignItems: 'center',
    marginBottom: 28,
  },

  sectionLabel: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 7,
  },

  sendAmount: {
    fontSize: 30,
    fontWeight: '700',
    color: '#111827',
  },

  receiveAmount: {
    fontSize: 30,
    fontWeight: '700',
    color: '#111827',
  },

  currencyLabel: {
    fontSize: 13,
    color: '#9CA3AF',
    marginTop: 3,
  },

  exchangeDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: 22,
  },

  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
  },

  exchangeIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 12,
  },

  exchangeIconText: {
    fontSize: 19,
    fontWeight: '700',
    color: '#111827',
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 14,
  },

  detailsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingHorizontal: 18,
    marginBottom: 20,
  },

  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },

  lastDetailRow: {
    borderBottomWidth: 0,
  },

  detailLabel: {
    fontSize: 13,
    color: '#6B7280',
    flex: 1,
  },

  detailValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#111827',
    textAlign: 'right',
    flex: 1.6,
  },

  noticeCard: {
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },

  noticeTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#374151',
    marginBottom: 5,
  },

  noticeText: {
    fontSize: 12,
    lineHeight: 18,
    color: '#6B7280',
  },

  doneButton: {
    backgroundColor: '#111827',
    borderRadius: 16,
    paddingVertical: 17,
    alignItems: 'center',
  },

  doneButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});