import type { Currency } from '../data/wallets';
import type { Transaction } from '../data/transactionStore';

export type RootStackParamList = {
  Welcome: undefined;
  SignUp: undefined;
  Login: undefined;
  Verification: undefined;
  Home: undefined;
  Exchange: undefined;
  Quote: {
    amount: number;
    fromCurrency: Currency;
    toCurrency: Currency;
    rate: number;
    receiveAmount: number;
  };
  Confirmation: {
    amount: number;
    fromCurrency: Currency;
    toCurrency: Currency;
    rate: number;
    receiveAmount: number;
  };
  Success: {
    amount: number;
    fromCurrency: Currency;
    toCurrency: Currency;
    rate: number;
    receiveAmount: number;
    reference: string;
  };
  TransactionDetails: {
    transaction: Transaction;
  };
  TransactionHistory: undefined;
  Settings: undefined;
  CustomerProfile: undefined;
};
