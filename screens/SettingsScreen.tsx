import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';

import type { RootStackParamList } from '../navigation/types';
import {
  CustomerProfile,
  loadCustomerProfile,
} from '../data/customerProfileStore';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'Settings'
>;

export default function SettingsScreen({
  navigation,
}: Props) {
  const [profile, setProfile] = useState<CustomerProfile>({
    firstName: 'Nuel',
    lastName: 'Okoloigwe',
    email: 'nuel@example.com',
    phone: '',
    dateOfBirth: '',
    nationality: '',
    countryOfResidence: '',
    address: '',
  });

  useFocusEffect(
    useCallback(() => {
      let mounted = true;

      const loadProfile = async () => {
        const savedProfile = await loadCustomerProfile();

        if (mounted) {
          setProfile(savedProfile);
        }
      };

      loadProfile();

      return () => {
        mounted = false;
      };
    }, []),
  );

  const fullName =
    `${profile.firstName} ${profile.lastName}`.trim();

  const initials =
    `${profile.firstName.charAt(0)}${profile.lastName.charAt(0)}`
      .toUpperCase();

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
            Settings
          </Text>

          <View style={styles.headerSpacer} />
        </View>

        {/* Profile Header */}

        <View style={styles.profileCard}>
          <View style={styles.profileCircle}>
            <Text style={styles.profileInitial}>
              {initials}
            </Text>
          </View>

          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>
              {fullName}
            </Text>

            <Text style={styles.profileEmail}>
              {profile.email}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate('CustomerProfile')
            }
          >
            <Text style={styles.editText}>
              Edit
            </Text>
          </TouchableOpacity>
        </View>

        {/* Account */}

        <Text style={styles.sectionTitle}>
          Account
        </Text>

        <View style={styles.sectionCard}>
          <SettingsRow
            title="Personal details"
            subtitle="Name, date of birth and nationality"
            onPress={() =>
              navigation.navigate('CustomerProfile')
            }
          />

          <SettingsRow
            title="Contact details"
            subtitle="Email address and phone number"
            onPress={() =>
              navigation.navigate('CustomerProfile')
            }
          />

          <SettingsRow
            title="Address"
            subtitle="Your residential address"
            onPress={() =>
              navigation.navigate('CustomerProfile')
            }
          />
        </View>

        {/* Security */}

        <Text style={styles.sectionTitle}>
          Security
        </Text>

        <View style={styles.sectionCard}>
          <SettingsRow
            title="Password"
            subtitle="Change your password"
          />

          <SettingsRow
            title="Biometric login"
            subtitle="Use Face ID or fingerprint"
            showToggle
          />

          <SettingsRow
            title="Two-factor authentication"
            subtitle="Protect your account"
          />
        </View>

        {/* Verification */}

        <Text style={styles.sectionTitle}>
          Verification
        </Text>

        <View style={styles.sectionCard}>
          <SettingsRow
            title="Identity verification"
            subtitle="Verification status"
            rightText="Not verified"
          />
        </View>

        {/* Preferences */}

        <Text style={styles.sectionTitle}>
          Preferences
        </Text>

        <View style={styles.sectionCard}>
          <SettingsRow
            title="Notifications"
            subtitle="Manage notifications"
          />

          <SettingsRow
            title="Currency preferences"
            subtitle="Manage supported currencies"
          />
        </View>

        {/* Support */}

        <Text style={styles.sectionTitle}>
          Support
        </Text>

        <View style={styles.sectionCard}>
          <SettingsRow
            title="Help & support"
            subtitle="Get help with Veyra"
          />

          <SettingsRow
            title="Terms & privacy"
            subtitle="Legal and privacy information"
          />
        </View>

        {/* Account ID */}

        <View style={styles.accountIdCard}>
          <Text style={styles.accountIdLabel}>
            Veyra customer ID
          </Text>

          <Text style={styles.accountId}>
            VYR-CUSTOMER-000001
          </Text>
        </View>

        <Text style={styles.version}>
          Veyra Sandbox • Version 1.0.0
        </Text>
      </ScrollView>
    </View>
  );
}

function SettingsRow({
  title,
  subtitle,
  onPress,
  rightText,
  showToggle = false,
}: {
  title: string;
  subtitle: string;
  onPress?: () => void;
  rightText?: string;
  showToggle?: boolean;
}) {
  return (
    <TouchableOpacity
      style={styles.row}
      activeOpacity={onPress ? 0.7 : 1}
      onPress={onPress}
    >
      <View style={styles.rowInfo}>
        <Text style={styles.rowTitle}>
          {title}
        </Text>

        <Text style={styles.rowSubtitle}>
          {subtitle}
        </Text>
      </View>

      {rightText && (
        <Text style={styles.rightText}>
          {rightText}
        </Text>
      )}

      {showToggle && (
        <View style={styles.toggle}>
          <View style={styles.toggleCircle} />
        </View>
      )}

      {!rightText && !showToggle && (
        <Text style={styles.chevron}>›</Text>
      )}
    </TouchableOpacity>
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
    marginBottom: 25,
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
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },

  headerSpacer: {
    width: 42,
  },

  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 28,
  },

  profileCircle: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#111827',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },

  profileInitial: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
  },

  profileInfo: {
    flex: 1,
  },

  profileName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },

  profileEmail: {
    fontSize: 12,
    color: '#6B7280',
  },

  editText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#111827',
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 10,
    marginTop: 4,
  },

  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingHorizontal: 16,
    marginBottom: 24,
  },

  row: {
    minHeight: 70,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },

  rowInfo: {
    flex: 1,
    paddingVertical: 12,
  },

  rowTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },

  rowSubtitle: {
    fontSize: 11,
    color: '#9CA3AF',
  },

  chevron: {
    fontSize: 25,
    color: '#9CA3AF',
    fontWeight: '300',
    marginLeft: 10,
  },

  rightText: {
    fontSize: 12,
    color: '#9CA3AF',
    marginLeft: 8,
  },

  toggle: {
    width: 42,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#D1D5DB',
    padding: 3,
  },

  toggleCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#FFFFFF',
  },

  accountIdCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    marginTop: 4,
  },

  accountIdLabel: {
    fontSize: 11,
    color: '#9CA3AF',
    marginBottom: 5,
  },

  accountId: {
    fontSize: 13,
    fontWeight: '600',
    color: '#374151',
  },

  version: {
    textAlign: 'center',
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 20,
  },
});