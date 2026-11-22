import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Currency,
  Wallet,
  initialWallets,
} from './wallets';

const WALLETS_KEY = '@veyra_wallets';

let wallets: Wallet[] = [...initialWallets];

export function getWallets(): Wallet[] {
  return wallets;
}

export function getWalletBalance(
  currency: Currency,
): number {
  const wallet = wallets.find(
    (item) => item.currency === currency,
  );

  return wallet?.balance ?? 0;
}

export async function loadWallets(): Promise<Wallet[]> {
  try {
    const storedWallets =
      await AsyncStorage.getItem(WALLETS_KEY);

    if (!storedWallets) {
      wallets = [...initialWallets];

      return wallets;
    }

    wallets = JSON.parse(storedWallets) as Wallet[];

    return wallets;
  } catch (error) {
    console.error(
      'Failed to load wallets:',
      error,
    );

    wallets = [...initialWallets];

    return wallets;
  }
}

async function saveWallets(): Promise<void> {
  try {
    await AsyncStorage.setItem(
      WALLETS_KEY,
      JSON.stringify(wallets),
    );
  } catch (error) {
    console.error(
      'Failed to save wallets:',
      error,
    );

    throw error;
  }
}

export async function exchangeFromGbp(
  amount: number,
  toCurrency: Currency,
  receiveAmount: number,
) {
  const gbpWallet = wallets.find(
    (wallet) => wallet.currency === 'GBP',
  );

  if (!gbpWallet) {
    throw new Error('GBP wallet not found');
  }

  if (amount <= 0) {
    throw new Error(
      'Exchange amount must be greater than zero',
    );
  }

  if (gbpWallet.balance < amount) {
    throw new Error(
      'Insufficient GBP balance',
    );
  }

  // Debit the customer's GBP balance.
  gbpWallet.balance -= amount;

  // Persist the updated wallet balance.
  await saveWallets();

  // The destination currency is treated as a
  // payout currency, not automatically as a wallet.
  return {
    fromCurrency: 'GBP' as Currency,
    toCurrency,
    amount,
    receiveAmount,
  };
}