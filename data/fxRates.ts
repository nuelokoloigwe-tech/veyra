import { Currency } from './wallets';

export const fxRates: Record<
  Currency,
  Partial<Record<Currency, number>>
> = {
  GBP: {
    NGN: 2050,
    USD: 1.27,
    EUR: 1.17,
    CAD: 1.73,
  },

  NGN: {
    GBP: 0.000488,
  },

  USD: {
    GBP: 0.79,
  },

  EUR: {
    GBP: 0.85,
  },

  CAD: {
    GBP: 0.58,
  },
};

export function getFxRate(
  from: Currency,
  to: Currency,
): number {
  if (from === to) {
    return 1;
  }

  const rate = fxRates[from][to];

  if (!rate) {
    throw new Error(
      `FX rate unavailable for ${from} to ${to}`,
    );
  }

  return rate;
}