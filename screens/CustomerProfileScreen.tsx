import React, {
  useCallback,
  useState,
} from 'react';

import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import {
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';

import type {
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import type { RootStackParamList } from '../navigation/types';

import {
  getCustomerProfile,
  loadCustomerProfile,
  saveCustomerProfile,
} from '../data/customerProfileStore';
import type { CustomerProfile } from '../data/customerProfileStore';

type ProfileNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

export default function CustomerProfileScreen() {
  const navigation =
    useNavigation<ProfileNavigationProp>();

  const [profile, setProfile] =
    useState<CustomerProfile>(
      getCustomerProfile(),
    );

  const [saving, setSaving] =
    useState(false);

  useFocusEffect(
    useCallback(() => {
      let mounted = true;

      const loadProfile = async () => {
        try {
          const storedProfile =
            await loadCustomerProfile();

          if (mounted) {
            setProfile(storedProfile);
          }
        } catch (error) {
          console.error(
            'Failed to load profile:',
            error,
          );
        }
      };

      loadProfile();

      return () => {
        mounted = false;
      };
    }, []),
  );

  const updateField = (
    field: keyof CustomerProfile,
    value: string,
  ) => {
    setProfile(
      (current: CustomerProfile) => ({
        ...current,
        [field]: value,
      }),
    );
  };

  const handleSave = async () => {
    if (
      !profile.firstName.trim() ||
      !profile.lastName.trim()
    ) {
      Alert.alert(
        'Missing information',
        'Please enter your first and last name.',
      );

      return;
    }

    try {
      setSaving(true);

      await saveCustomerProfile(
        profile,
      );

      Alert.alert(
        'Profile saved',
        'Your personal details have been updated.',
        [
          {
            text: 'OK',
            onPress: () =>
              navigation.goBack(),
          },
        ],
      );
    } catch (error) {
      console.error(
        'Failed to save profile:',
        error,
      );

      Alert.alert(
        'Unable to save',
        'Your profile could not be saved. Please try again.',
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={
        Platform.OS === 'ios'
          ? 'padding'
          : undefined
      }
    >
      <View style={styles.header}>
        <Pressable
          onPress={() =>
            navigation.goBack()
          }
          style={styles.backButton}
        >
          <Text style={styles.backText}>
            ‹
          </Text>
        </Pressable>

        <Text style={styles.headerTitle}>
          Personal details
        </Text>

        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        contentContainerStyle={
          styles.content
        }
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {profile.firstName
                .charAt(0)
                .toUpperCase()}
              {profile.lastName
                .charAt(0)
                .toUpperCase()}
            </Text>
          </View>

          <View>
            <Text style={styles.profileName}>
              {profile.firstName}{' '}
              {profile.lastName}
            </Text>

            <Text
              style={
                styles.profileSubtitle
              }
            >
              Customer profile
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>
          Basic information
        </Text>

        <View style={styles.card}>
          <InputField
            label="First name"
            value={profile.firstName}
            onChangeText={(value) =>
              updateField(
                'firstName',
                value,
              )
            }
            placeholder="Enter first name"
          />

          <InputField
            label="Last name"
            value={profile.lastName}
            onChangeText={(value) =>
              updateField(
                'lastName',
                value,
              )
            }
            placeholder="Enter last name"
          />

          <InputField
            label="Email address"
            value={profile.email}
            onChangeText={(value) =>
              updateField(
                'email',
                value,
              )
            }
            placeholder="Enter email address"
            keyboardType="email-address"
          />

          <InputField
            label="Phone number"
            value={profile.phone}
            onChangeText={(value) =>
              updateField(
                'phone',
                value,
              )
            }
            placeholder="Enter phone number"
            keyboardType="phone-pad"
          />
        </View>

        <Text style={styles.sectionTitle}>
          Personal information
        </Text>

        <View style={styles.card}>
          <InputField
            label="Date of birth"
            value={profile.dateOfBirth}
            onChangeText={(value) =>
              updateField(
                'dateOfBirth',
                value,
              )
            }
            placeholder="DD/MM/YYYY"
          />

          <InputField
            label="Nationality"
            value={profile.nationality}
            onChangeText={(value) =>
              updateField(
                'nationality',
                value,
              )
            }
            placeholder="Enter nationality"
          />

          <InputField
            label="Country of residence"
            value={
              profile.countryOfResidence
            }
            onChangeText={(value) =>
              updateField(
                'countryOfResidence',
                value,
              )
            }
            placeholder="Enter country"
          />
        </View>

        <Text style={styles.sectionTitle}>
          Address
        </Text>

        <View style={styles.card}>
          <InputField
            label="Residential address"
            value={profile.address}
            onChangeText={(value) =>
              updateField(
                'address',
                value,
              )
            }
            placeholder="Enter your residential address"
            multiline
          />
        </View>

        <View style={styles.notice}>
          <Text
            style={styles.noticeTitle}
          >
            Verification
          </Text>

          <Text
            style={styles.noticeText}
          >
            Some personal information may
            need to be verified before you
            can use certain Veyra services.
          </Text>
        </View>

        <Pressable
          style={[
            styles.saveButton,
            saving &&
              styles.saveButtonDisabled,
          ]}
          onPress={handleSave}
          disabled={saving}
        >
          <Text
            style={
              styles.saveButtonText
            }
          >
            {saving
              ? 'Saving...'
              : 'Save changes'}
          </Text>
        </Pressable>

        <View
          style={styles.bottomSpace}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

type InputFieldProps = {
  label: string;
  value: string;
  onChangeText: (
    value: string,
  ) => void;
  placeholder: string;
  keyboardType?:
    | 'default'
    | 'email-address'
    | 'phone-pad';
  multiline?: boolean;
};

function InputField({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = 'default',
  multiline = false,
}: InputFieldProps) {
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>
        {label}
      </Text>

      <TextInput
        style={[
          styles.input,
          multiline &&
            styles.multilineInput,
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#999"
        keyboardType={keyboardType}
        multiline={multiline}
        textAlignVertical={
          multiline
            ? 'top'
            : 'center'
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },

  header: {
    height: 110,
    paddingTop: 55,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:
      'space-between',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor:
      '#ECEEF2',
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor:
      '#F2F3F5',
    alignItems: 'center',
    justifyContent:
      'center',
  },

  backText: {
    fontSize: 34,
    lineHeight: 36,
    color: '#111111',
    marginTop: -4,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111111',
  },

  headerSpacer: {
    width: 42,
  },

  content: {
    padding: 20,
  },

  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 28,
  },

  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#111111',
    alignItems: 'center',
    justifyContent:
      'center',
    marginRight: 14,
  },

  avatarText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
  },

  profileName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111111',
  },

  profileSubtitle: {
    marginTop: 4,
    fontSize: 14,
    color: '#777777',
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#333333',
    marginBottom: 10,
    marginTop: 8,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 22,
    borderWidth: 1,
    borderColor: '#ECEEF2',
  },

  inputGroup: {
    marginBottom: 18,
  },

  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#555555',
    marginBottom: 7,
  },

  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#DADDE3',
    borderRadius: 10,
    paddingHorizontal: 14,
    fontSize: 15,
    color: '#111111',
    backgroundColor: '#FFFFFF',
  },

  multilineInput: {
    height: 90,
    paddingTop: 12,
  },

  notice: {
    backgroundColor: '#F0F4FF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 20,
  },

  noticeTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#243B7A',
    marginBottom: 5,
  },

  noticeText: {
    fontSize: 13,
    lineHeight: 19,
    color: '#53617A',
  },

  saveButton: {
    height: 52,
    borderRadius: 14,
    backgroundColor: '#111111',
    alignItems: 'center',
    justifyContent: 'center',
  },

  saveButtonDisabled: {
    opacity: 0.6,
  },

  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },

  bottomSpace: {
    height: 40,
  },
});
