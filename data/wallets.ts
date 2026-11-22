export type Currency =
  | 'GBP'
  | 'NGN'
  | 'USD'
  | 'EUR'
  | 'CAD';

export type Wallet = {
  currency: Currency;
  balance: number;
};

export const initialWallets: Wallet[] = [
  {
    currency: 'GBP',
    balance: 5000,
  },
  {
    currency: 'NGN',
    balance: 0,
  },
];