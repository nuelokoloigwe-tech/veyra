import AsyncStorage from '@react-native-async-storage/async-storage';
import { Currency } from './wallets';

export type TransactionStatus =
  | 'Completed'
  | 'Pending'
  | 'Failed';

export type TransactionType =
  | 'FX Exchange'
  | 'Payout';

export type Transaction = {
  reference: string;
  type: TransactionType;
  status: TransactionStatus;
  fromCurrency: Currency;
  toCurrency: Currency;
  amount: number;
  receiveAmount: number;
  rate: number;
  fee: number;
  createdAt: string;
};

const TRANSACTIONS_KEY = '@veyra_transactions';

let transactions: Transaction[] = [];

export function getTransactions(): Transaction[] {
  return transactions;
}

export async function loadTransactions(): Promise<Transaction[]> {
  try {
    const storedTransactions =
      await AsyncStorage.getItem(
        TRANSACTIONS_KEY,
      );

    if (!storedTransactions) {
      transactions = [];
      return [];
    }

    transactions = JSON.parse(
      storedTransactions,
    ) as Transaction[];

    return transactions;
  } catch (error) {
    console.error(
      'Failed to load transactions:',
      error,
    );

    transactions = [];

    return [];
  }
}

export async function addTransaction(
  transaction: Transaction,
): Promise<Transaction> {
  transactions = [
    transaction,
    ...transactions,
  ];

  try {
    await AsyncStorage.setItem(
      TRANSACTIONS_KEY,
      JSON.stringify(transactions),
    );
  } catch (error) {
    console.error(
      'Failed to save transaction:',
      error,
    );
  }

  return transaction;
}