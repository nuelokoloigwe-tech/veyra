import React, { useCallback, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import type { RootStackParamList } from '../navigation/types';
import {
  getWallets,
  getWalletBalance,
  loadWallets,
} from '../data/walletStore';
import {
  getTransactions,
  loadTransactions,
  Transaction,
} from '../data/transactionStore';
import {
  getCustomerProfile,
  loadCustomerProfile,
} from '../data/customerProfileStore';

type HomeNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

export default function HomeScreen() {
  const navigation =
    useNavigation<HomeNavigationProp>();

  const [transactions, setTransactions] =
    useState<Transaction[]>([]);

  const [firstName, setFirstName] =
  useState('Nuel');

const [lastName, setLastName] =
  useState('Okoloigwe');

  const [refreshKey, setRefreshKey] =
    useState(0);

  useFocusEffect(
    useCallback(() => {
      let mounted = true;

      const refreshHome = async () => {
  await loadWallets();
  await loadTransactions();

  const profile =
    await loadCustomerProfile();
    
        if (mounted) {
          setTransactions([
            ...getTransactions(),
          ]);

          setFirstName(
            profile.firstName || 'Nuel',
          );
          
          setLastName(
  profile.lastName || 'Okoloigwe',
);

          setRefreshKey(
            (value) => value + 1,
          );
        }
      };

      refreshHome();

      return () => {
        mounted = false;
      };
    }, []),
  );

  const wallets = getWallets();

  const gbpBalance =
    getWalletBalance('GBP');

  const ngnBalance =
    getWalletBalance('NGN');

  const recentTransactions =
    transactions.slice(0, 5);

  const formatCurrency = (
    currency: string,
    amount: number,
  ) => {
    if (currency === 'GBP') {
      return `£${amount.toLocaleString(
        'en-GB',
        {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        },
      )}`;
    }

    if (currency === 'NGN') {
      return `₦${amount.toLocaleString(
        'en-NG',
        {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        },
      )}`;
    }

    if (currency === 'USD') {
      return `$${amount.toLocaleString(
        'en-US',
        {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        },
      )}`;
    }

    if (currency === 'EUR') {
      return `€${amount.toLocaleString(
        'en-US',
        {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        },
      )}`;
    }

    if (currency === 'CAD') {
      return `C$${amount.toLocaleString(
        'en-CA',
        {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        },
      )}`;
    }

    return `${amount.toFixed(2)} ${currency}`;
  };

  const formatDate = (
    dateString: string,
  ) => {
    return new Date(
      dateString,
    ).toLocaleDateString(
      'en-GB',
      {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      },
    );
  };

  const handleTransactionPress = (
    transaction: Transaction,
  ) => {
    navigation.navigate(
      'TransactionDetails',
      {
        transaction,
      },
    );
  };

  return (
    <View
      style={styles.container}
      key={refreshKey}
    >
      <ScrollView
        contentContainerStyle={
          styles.content
        }
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>
              Good morning
            </Text>

            <Text style={styles.name}>
              {firstName}
            </Text>
          </View>

          <Pressable
            style={styles.profileButton}
            onPress={() =>
              navigation.navigate(
                'Settings',
              )
            }
          >
            <Text style={styles.profileText}>
              {`${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()}
            </Text>
          </Pressable>
        </View>

        {/* Main Balance */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>
            GBP balance
          </Text>

          <Text style={styles.balanceAmount}>
            £
            {gbpBalance.toLocaleString(
              'en-GB',
              {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              },
            )}
          </Text>

          <Text style={styles.balanceSubtext}>
            Available balance
          </Text>
        </View>

        {/* Funding */}
        <View style={styles.fundingCard}>
          <View>
            <Text style={styles.fundingLabel}>
              NGN funding
            </Text>

            <Text style={styles.fundingAmount}>
              ₦
              {ngnBalance.toLocaleString(
                'en-NG',
                {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                },
              )}
            </Text>
          </View>

          <View style={styles.fundingBadge}>
            <Text style={styles.fundingBadgeText}>
              Funding
            </Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Quick actions
          </Text>
        </View>

        <View style={styles.actionsRow}>
          <Pressable
            style={styles.actionCard}
            onPress={() =>
              navigation.navigate(
                'Exchange',
              )
            }
          >
            <View style={styles.actionIcon}>
              <Text style={styles.actionIconText}>
                ⇄
              </Text>
            </View>

            <Text style={styles.actionTitle}>
              Exchange
            </Text>

            <Text style={styles.actionSubtitle}>
              Convert currencies
            </Text>
          </Pressable>

          <Pressable
            style={styles.actionCard}
            onPress={() => {}}
          >
            <View style={styles.actionIcon}>
              <Text style={styles.actionIconText}>
                ↑
              </Text>
            </View>

            <Text style={styles.actionTitle}>
              Send
            </Text>

            <Text style={styles.actionSubtitle}>
              Send money
            </Text>
          </Pressable>
        </View>

        <View style={styles.actionsRow}>
          <Pressable
            style={styles.actionCard}
            onPress={() => {}}
          >
            <View style={styles.actionIcon}>
              <Text style={styles.actionIconText}>
                ↓
              </Text>
            </View>

            <Text style={styles.actionTitle}>
              Receive
            </Text>

            <Text style={styles.actionSubtitle}>
              Receive money
            </Text>
          </Pressable>

          <Pressable
            style={styles.actionCard}
            onPress={() => {}}
          >
            <View style={styles.actionIcon}>
              <Text style={styles.actionIconText}>
                +
              </Text>
            </View>

            <Text style={styles.actionTitle}>
              Add money
            </Text>

            <Text style={styles.actionSubtitle}>
              Fund your account
            </Text>
          </Pressable>
        </View>

        {/* Wallets */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Wallets
          </Text>
        </View>

        <View style={styles.walletCard}>
          {wallets.map((wallet) => (
            <View
              key={wallet.currency}
              style={styles.walletRow}
            >
              <View>
                <Text style={styles.walletCurrency}>
                  {wallet.currency}
                </Text>

                <Text style={styles.walletDescription}>
                  {wallet.currency ===
                  'GBP'
                    ? 'Primary balance'
                    : wallet.currency ===
                      'NGN'
                    ? 'Funding balance'
                    : 'Currency balance'}
                </Text>
              </View>

              <Text style={styles.walletAmount}>
                {formatCurrency(
                  wallet.currency,
                  wallet.balance,
                )}
              </Text>
            </View>
          ))}

          <Pressable
            style={styles.addCurrencyButton}
            onPress={() => {}}
          >
            <Text
              style={
                styles.addCurrencyText
              }
            >
              + Add currency
            </Text>
          </Pressable>
        </View>

        {/* Recent Activity */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Recent activity
          </Text>

          {transactions.length > 0 && (
            <Pressable
              onPress={() =>
                navigation.navigate(
                  'TransactionHistory',
                )
              }
            >
              <Text style={styles.viewAll}>
                View all
              </Text>
            </Pressable>
          )}
        </View>

        {recentTransactions.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>
              No transactions yet
            </Text>

            <Text style={styles.emptyText}>
              Your recent Veyra activity
              will appear here.
            </Text>
          </View>
        ) : (
          <View style={styles.activityCard}>
            {recentTransactions.map(
              (transaction, index) => (
                <Pressable
                  key={
                    transaction.reference
                  }
                  onPress={() =>
                    handleTransactionPress(
                      transaction,
                    )
                  }
                  style={[
                    styles.activityRow,
                    index <
                    recentTransactions.length -
                      1
                      ? styles.activityBorder
                      : undefined,
                  ]}
                >
                  <View
                    style={
                      styles.activityIcon
                    }
                  >
                    <Text
                      style={
                        styles.activityIconText
                      }
                    >
                      ⇄
                    </Text>
                  </View>

                  <View
                    style={
                      styles.activityMiddle
                    }
                  >
                    <Text
                      style={
                        styles.activityTitle
                      }
                    >
                      {transaction.type}
                    </Text>

                    <Text
                      style={
                        styles.activityDate
                      }
                    >
                      {formatDate(
                        transaction.createdAt,
                      )}
                    </Text>
                  </View>

                  <View
                    style={
                      styles.activityRight
                    }
                  >
                    <Text
                      style={
                        styles.activityAmount
                      }
                    >
                      -
                      {formatCurrency(
                        transaction.fromCurrency,
                        transaction.amount,
                      )}
                    </Text>

                    <Text
                      style={
                        styles.activityStatus
                      }
                    >
                      {transaction.status}
                    </Text>
                  </View>
                </Pressable>
              ),
            )}
          </View>
        )}

        <View style={styles.sandboxNotice}>
          <Text
            style={styles.sandboxTitle}
          >
            Veyra Sandbox
          </Text>

          <Text
            style={styles.sandboxText}
          >
            This app currently uses test
            funds. No real money is
            transferred.
          </Text>
        </View>

        <View style={styles.bottomSpace} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },

  content: {
    padding: 20,
    paddingTop: 58,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },

  greeting: {
    fontSize: 14,
    color: '#777777',
    marginBottom: 3,
  },

  name: {
    fontSize: 28,
    fontWeight: '800',
    color: '#111111',
  },

  profileButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#111111',
    alignItems: 'center',
    justifyContent: 'center',
  },

  profileText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },

  balanceCard: {
    backgroundColor: '#111111',
    borderRadius: 20,
    padding: 24,
    marginBottom: 14,
  },

  balanceLabel: {
    color: '#BDBDBD',
    fontSize: 14,
    marginBottom: 8,
  },

  balanceAmount: {
    color: '#FFFFFF',
    fontSize: 34,
    fontWeight: '800',
  },

  balanceSubtext: {
    color: '#A5A5A5',
    fontSize: 13,
    marginTop: 8,
  },

  fundingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    marginBottom: 26,
    borderWidth: 1,
    borderColor: '#ECEEF2',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  fundingLabel: {
    color: '#777777',
    fontSize: 13,
    marginBottom: 5,
  },

  fundingAmount: {
    color: '#111111',
    fontSize: 21,
    fontWeight: '700',
  },

  fundingBadge: {
    backgroundColor: '#F1F1F1',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
  },

  fundingBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#555555',
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111111',
  },

  viewAll: {
    fontSize: 13,
    fontWeight: '600',
    color: '#111111',
  },

  actionsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },

  actionCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    minHeight: 120,
    borderWidth: 1,
    borderColor: '#ECEEF2',
  },

  actionIcon: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F1F1F1',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },

  actionIconText: {
    fontSize: 20,
    color: '#111111',
    fontWeight: '600',
  },

  actionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111111',
  },

  actionSubtitle: {
    fontSize: 12,
    color: '#777777',
    marginTop: 4,
  },

  walletCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#ECEEF2',
    marginBottom: 26,
    overflow: 'hidden',
  },

  walletRow: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F1F3',
  },

  walletCurrency: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111111',
  },

  walletDescription: {
    fontSize: 12,
    color: '#777777',
    marginTop: 4,
  },

  walletAmount: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111111',
  },

  addCurrencyButton: {
    padding: 16,
    alignItems: 'center',
  },

  addCurrencyText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111111',
  },

  emptyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 22,
    borderWidth: 1,
    borderColor: '#ECEEF2',
    marginBottom: 26,
  },

  emptyTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111111',
    marginBottom: 5,
  },

  emptyText: {
    fontSize: 13,
    color: '#777777',
    lineHeight: 19,
  },

  activityCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#ECEEF2',
    marginBottom: 26,
    overflow: 'hidden',
  },

  activityRow: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },

  activityBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F0F1F3',
  },

  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F1F1F1',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  activityIconText: {
    fontSize: 18,
    color: '#111111',
  },

  activityMiddle: {
    flex: 1,
  },

  activityTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111111',
  },

  activityDate: {
    fontSize: 12,
    color: '#777777',
    marginTop: 4,
  },

  activityRight: {
    alignItems: 'flex-end',
  },

  activityAmount: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111111',
  },

  activityStatus: {
    fontSize: 11,
    color: '#2E7D32',
    marginTop: 4,
  },

  sandboxNotice: {
    backgroundColor: '#F0F4FF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 20,
  },

  sandboxTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#243B7A',
    marginBottom: 5,
  },

  sandboxText: {
    fontSize: 13,
    lineHeight: 19,
    color: '#53617A',
  },

  bottomSpace: {
    height: 30,
  },
});