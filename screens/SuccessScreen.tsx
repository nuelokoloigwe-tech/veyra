import {
  StyleSheet,
  Text,
  View,
  Pressable,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'Success'
>;

export default function SuccessScreen({
  navigation,
  route,
}: Props) {
  const {
    amount,
    fromCurrency,
    toCurrency,
    receiveAmount,
    reference,
  } = route.params;

  const formatAmount = (
    value: number,
    currency: string,
  ) => {
    const symbols: Record<string, string> = {
      GBP: '£',
      USD: '$',
      NGN: '₦',
    };

    const symbol = symbols[currency] ?? '';

    return `${symbol}${value.toLocaleString('en-GB', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.successCircle}>
        <Text style={styles.checkmark}>
          ✓
        </Text>
      </View>

      <Text style={styles.title}>
        Exchange successful
      </Text>

      <Text style={styles.subtitle}>
        Your currency exchange has been completed.
      </Text>

      <View style={styles.card}>
        <Text style={styles.label}>
          You exchanged
        </Text>

        <Text style={styles.amount}>
          {formatAmount(amount, fromCurrency)}
        </Text>

        <Text style={styles.currency}>
          {fromCurrency}
        </Text>

        <Text style={styles.arrow}>
          ↓
        </Text>

        <Text style={styles.label}>
          You received
        </Text>

        <Text style={styles.receiveAmount}>
          {formatAmount(receiveAmount, toCurrency)}
        </Text>

        <Text style={styles.currency}>
          {toCurrency}
        </Text>
      </View>

      <View style={styles.referenceCard}>
        <Text style={styles.referenceLabel}>
          Transaction reference
        </Text>

        <Text style={styles.reference}>
          {reference}
        </Text>
      </View>

      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.buttonText}>
          Back to home
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC',
    paddingHorizontal: 24,
    paddingTop: 80,
    alignItems: 'center',
  },

  successCircle: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: '#DCFCE7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },

  checkmark: {
    fontSize: 42,
    color: '#16A34A',
    fontWeight: '700',
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 30,
  },

  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 24,
    alignItems: 'center',
    marginBottom: 18,
  },

  label: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },

  amount: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
  },

  receiveAmount: {
    fontSize: 28,
    fontWeight: '700',
    color: '#16A34A',
  },

  currency: {
    fontSize: 15,
    color: '#6B7280',
    marginTop: 4,
  },

  arrow: {
    fontSize: 28,
    color: '#6B7280',
    marginVertical: 14,
  },

  referenceCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 24,
  },

  referenceLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },

  reference: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    letterSpacing: 1,
  },

  button: {
    width: '100%',
    backgroundColor: '#111827',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },
});